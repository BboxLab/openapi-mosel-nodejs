const Joi = require('joi');

export const configurationValidationSchema = Joi.object({
  name: Joi.string().required(),
  oauthCredentialsUrl: Joi.string().uri(),
  emailAddressUrl: Joi.string().uri(),
  ibanUrl: Joi.string().uri(),
  portabilityUrl: Joi.string().uri()
});

export class Configuration {
  name: string;
  oauthCredentialsUrl: string;
  emailAddressUrl: string;
  ibanUrl: string;
  portabilityUrl: string;
}
