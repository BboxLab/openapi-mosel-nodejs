import { plainToInstance } from "class-transformer";
import { MoselClient } from "../client/MoselClient";
import { Configuration } from "../configuration/Configuration";
import { Validator } from "../validation/Validator";
import { Credentials, credentialsValidationSchema } from "./Credentials";
import { Token } from "./Token";
import * as Joi from "joi";

export const oauthResponseValidationSchema = Joi.object({
  access_token: Joi.string().required(),
  expires_in: Joi.number(),
  token_type: Joi.string(),
  refresh_credit: Joi.number(),
  scope: Joi.string(),
});

export const composeTokenFromResponse = async (
  validator: Validator,
  response: any,
): Promise<Token> => {
  // validate the token output from bt
  await validator.validate(response, oauthResponseValidationSchema);

  // transform automatically the plain json object into an es6 object
  let token = plainToInstance(Token, response);

  // we remember it's a token that it has been created here
  token.created_at = new Date();
  token.new = true;

  return token;
};

export class Authenticator {
  authenticate = async (
    credentials: Credentials,
    configuration: Configuration,
    client: MoselClient,
    validator: Validator,
    token: Token | null = null
  ): Promise<Token | any> => {
    // validate credentials
    await validator.validate(credentials, credentialsValidationSchema);

    const auth = {
      username: credentials.username,
      password: credentials.password,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // check token date expiration
    if (!token) {
      const oauthResponse = await client.requestBtOpenApi(
        client.postMethod,
        configuration.oauthCredentialsUrl,
        null,
        headers,
        auth
      );

      // validate the token output from bt
      token = await composeTokenFromResponse(validator, oauthResponse);
    }

    return token;
  };
}
