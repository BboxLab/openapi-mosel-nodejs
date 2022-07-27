import { ValidationErrorItem, ValidationResult } from "joi";
import { Configuration, configurationValidationSchema } from "../configuration/Configuration";
import { MoselValidationError } from "../error/MoselError";
import { httpStatusCodes } from "../http/Status";


export class Validator {
  /** validate input and configuration */
  validateInput = async (input:any, validationSchemeInput:any, configuration: Configuration) => {
    await this.validate(input, validationSchemeInput);
    await this.validate(configuration, configurationValidationSchema);
  }

  composeValidationErrorMessage = (validationResponse: ValidationResult) => {
    let errorsMessages: string = "";

    validationResponse.error.details.map(
      (error: ValidationErrorItem, index: number) => {
        errorsMessages += `Error ${index + 1}: ${error.message}. `;
      }
    );

    return errorsMessages;
  };

  validate = async (input: any, scheme: any) => {
    // do the validation
    let validationResponse: ValidationResult = scheme.validate(input);

    if (validationResponse.error) {
      // generate the custom error
      // throw new MoselValidationError('A description', 400, 'Some parameters');

      throw new MoselValidationError(
        `${validationResponse.error.name}: ${this.composeValidationErrorMessage(
          validationResponse
        )}`,
        httpStatusCodes.BAD_REQUEST,
        JSON.stringify(input)
      );
    }
  };
}
