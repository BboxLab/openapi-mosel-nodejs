import { Credentials } from "../authentication/Credentials";
import { Token } from "../authentication/Token";
import { MoselClient } from "../client/MoselClient";
import { Configuration } from "../configuration/Configuration";
import { EmailChecker, EmailCheckerInput } from "../email/EmailChecker";
import { IbanChecker, IbanCheckerInput } from "../iban/IbanChecker";
import { Validator } from "../validation/Validator";

export const testSdkFunction = () => {
  return 'hello';
}

export class Sdk {
  configuration: Configuration;
  credentials: Credentials;

  constructor(credentials: Credentials, configuration: Configuration) {
    (this.credentials = credentials), (this.configuration = configuration);
  }

  async checkEmail(input: EmailCheckerInput, token: Token | null = null) {
    try {
      return await new EmailChecker().check(
        input,
        this.configuration,
        this.credentials,
        new Validator(),
        new MoselClient(),
        token
      );
    } catch (error) {
      throw error;
    }
  }

  async checkIban(input: IbanCheckerInput, token: Token | null = null) {
    try {
      return await new IbanChecker().check(
        input,
        this.configuration,
        this.credentials,
        new Validator(),
        new MoselClient(),
        token
      );
    } catch (error) {
      throw error;
    }
  }
}
