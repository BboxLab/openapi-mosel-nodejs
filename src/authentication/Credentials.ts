import Joi from 'joi';

export const credentialsValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


export class Credentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
