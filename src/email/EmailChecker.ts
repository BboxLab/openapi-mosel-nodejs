import { Credentials } from "../authentication/Credentials";
import { Token } from "../authentication/Token";
import { Checker } from "../checker/Checker";
import { MoselClient } from "../client/MoselClient";
import { Configuration } from "../configuration/Configuration";
import { Validator } from "../validation/Validator";
import * as Joi from "joi";

export const emailInputValidationSchema = Joi.object({
  emailAddress: Joi.string().email().required(),
});

export const emailOuputValidationSchema = Joi.object({
  validEmailAddress: Joi.boolean(),
  contactEmailAddress: Joi.boolean(),
});

export class EmailCheckerInput {
  emailAddress: string;

  constructor(emailAddress: string) {
    this.emailAddress = emailAddress;
  }
}

export class EmailCheckerOutput {
  contactEmailAddress: boolean | undefined;
  validEmailAddress: boolean | undefined;
}

export function handleError(error:any, input:any) {
  if (error) {
    return {
      error: "Validation Error",
      description: error.message,
      parameter: JSON.stringify(input),
    };
  }
}

export class EmailChecker {
  check = async (
    input: EmailCheckerInput,
    configuration: Configuration,
    credentials: Credentials,
    validator: Validator,
    client: MoselClient,
    token: Token | null
  ) => {
    return new Checker(validator, credentials, client, configuration).check(
      input,
      emailInputValidationSchema,
      'emailAddressUrl',
      emailOuputValidationSchema,
      token,
    );
  };
}
