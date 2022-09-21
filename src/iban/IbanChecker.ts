import { Credentials } from "../authentication/Credentials";
import { Token } from "../authentication/Token";
import { Checker} from "../checker/Checker";
import { MoselClient } from "../client/MoselClient";
import { Configuration } from "../configuration/Configuration";
import { Validator } from "../validation/Validator";

const Joi = require("joi");

export const ibanInputValidationSchema = Joi.object({
  iban: Joi.string().required(),
});

export class IbanCheckerInput {
    iban: string;
  
    constructor(iban: string) {
      this.iban = iban;
    }
  }

export class IbanChecker {
    check = async(
        input: IbanCheckerInput,
        configuration: Configuration,
        credentials: Credentials,
        validator: Validator,
        client: MoselClient,
        token: Token | null
    ) => {
        return new Checker(validator, credentials, client, configuration).check(
            input,
            ibanInputValidationSchema,
            'ibanUrl',
            null, // no output for check iban
            token,
            'iban'
        );
    }
}