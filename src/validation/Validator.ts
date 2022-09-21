import { ValidationErrorItem, ValidationResult } from "joi";
import { Configuration, configurationValidationSchema } from "../configuration/Configuration";
import { MoselValidationError } from "../error/MoselError";
import { httpStatusCodes } from "../http/Status";


export class Validator {
  /** validate input and configuration */
  validateInput = async (input:any, validationSchemeInput:any, configuration: Configuration) => {
    // validate the configuration
    await this.validate(configuration, configurationValidationSchema);

    // validate the input
    await this.validate(input, validationSchemeInput);
  }

  composeValidationErrorMessage = (validationResponse: ValidationResult) => {
    let errorsMessages: string = "";

    if (validationResponse && validationResponse.error && validationResponse.error.details && validationResponse.error.details) {
      validationResponse.error.details.map(
        (error: ValidationErrorItem, index: number) => {
          errorsMessages += `Error ${index + 1}: ${error.message}. `;
        }
      );
    } else {
      errorsMessages = `Error unknown: unexpected error during data validation in Mosel Validator. `
    }

    return errorsMessages;
  };

  validate = async (input: any, scheme: any) => {
    // do the validation
    let validationResponse: ValidationResult = scheme.validate(input);

    if (validationResponse.error) {
      console.log('error', validationResponse.error);
      
      const errorName = validationResponse.error.name ?validationResponse.error.name : 'Unknown error';

      // display error in console
      console.log(`${errorName}: ${this.composeValidationErrorMessage(
        validationResponse
      )}`);

      // generate the custom error
      throw new MoselValidationError(
        `${errorName}: ${this.composeValidationErrorMessage(
          validationResponse
        )}`,
        httpStatusCodes.BAD_REQUEST,
        JSON.stringify(input)
      );
    }
  };
}
