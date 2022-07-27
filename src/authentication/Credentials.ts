const Joi = require('joi');

export const credentialsValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


export class Credentials {
  username: string;
  password: string;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
