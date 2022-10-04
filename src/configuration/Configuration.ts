import Joi from 'joi';

export const configurationValidationSchema = Joi.object({
  name: Joi.string().required(),
  oauthCredentialsUrl: Joi.string().uri(),
  emailAddressUrl: Joi.string().uri(),
  ibanUrl: Joi.string().uri(),
  portabilityUrl: Joi.string().uri()
});


export class Configuration {
  name: string | undefined;
  oauthCredentialsUrl: string | undefined;
  emailAddressUrl: string | undefined;
  ibanUrl: string | undefined;
  portabilityUrl: string | undefined;
}
