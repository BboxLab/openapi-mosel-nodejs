import { Authenticator } from "../authentication/Authenticator";
import { Token } from "../authentication/Token";
import { MoselClient } from "../client/MoselClient";
import { Configuration } from "../configuration/Configuration";
import { Validator } from "../validation/Validator";
import { Response } from "../response/Response";
import { Credentials } from "../authentication/Credentials";

export class Checker {
    validator: Validator;
    credentials: Credentials;
    client: MoselClient;
    configuration: Configuration;

    constructor(
        validator:Validator, 
        credentials: Credentials, 
        client: MoselClient, 
        configuration: Configuration
    ) {
        this.validator = validator;
        this.credentials = credentials;
        this.client = client;
        this.configuration = configuration;
    }

    writeCustomResponse = (response) => {
        if (!response) {
            return {
                'responseLabel':  true
            };
            // checkResponse[responseLabel] = true;
        }
    }

    check = async(
        input:any,
        inputValidationSchema: any,
        configurationType:string,
        ouputValidationSchema: any,
        token:Token | null = null,
        responseLabel = 'response'
    ) => {
        // 1) validate input and configuration
        await this.validator.validateInput(input, inputValidationSchema, this.configuration);

        // 2) authenticate and renew token if necessary
        const checkedToken = await new Authenticator().authenticate(
            this.credentials,
            this.configuration,
            this.client,
            this.validator,
            token
        );

        // 3) fetch the check email address api with token and input
        let checkResponse = await this.client.requestBtOpenApi(
            this.client.postMethod,
            this.configuration[configurationType],
            input,
            {
                Authorization: `Bearer ${checkedToken.access_token}`,
            }
        );

        // 4) validate the response
        if (ouputValidationSchema && checkResponse) {
            await this.validator.validate(checkResponse, ouputValidationSchema);
        }

        // create a custom response if there is no response
        if (!checkResponse) {
            checkResponse = {
                'responseLabel':  true
            };
            // checkResponse[responseLabel] = true;
        }

        // 5) return response with a validated token and check email response
        return new Response(checkedToken, checkResponse);
    }
}