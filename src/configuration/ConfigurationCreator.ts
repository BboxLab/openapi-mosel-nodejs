import { Configuration } from "./Configuration";

export class ConfigurationCreator {
  createProdConfig = (): Configuration => {
    const configuration = new Configuration();
    configuration.name = 'prod';
    configuration.oauthCredentialsUrl =
      "https://oauth2.bouyguestelecom.fr/token?grant_type=client_credentials";
    configuration.emailAddressUrl =
      "https://open.api.bouyguestelecom.fr/v1/customer-management/email-addresses/check";
    configuration.ibanUrl = `https://open.api.bouyguestelecom.fr/v1/customer-management/ibans/check`;


    return configuration;
  };

  createApConfig = (name: string = "ap4") => {
    const configuration = new Configuration();
    configuration.name = name;
    configuration.oauthCredentialsUrl = `https://oauth2.sandbox.bouyguestelecom.fr/${name}/token?grant_type=client_credentials`;
    configuration.emailAddressUrl = `https://open.api.sandbox.bouyguestelecom.fr/${name}/v1/customer-management/email-addresses/check`;
    configuration.ibanUrl = `https://open.api.sandbox.bouyguestelecom.fr/${name}/v1/customer-management/ibans/check`;

    return configuration;
  };
}
