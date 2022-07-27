# Mosel Node SDK for BT Open Apis

This package is currently a work in progress version.

## How to install

```
npm i @bboxlab/mosel-sdk
```

## Add a check email route inside a Node Project

After installing the package, you need to create a SDK object.

Skd needs

- credentials
- configuration

You can import all this object from mosel-sdk.

```js
const credentials = new Credentials("clientId", "secret");

// configuration contains all the endpoints urls, etc.
// you can add the value of confguration manually
const configuration = new Configuration();
// here you need to add manually all the urls

// or you can add a preexisting configuration, for exemple, a staging conf
const configuration = new ConfigurationCreator().createApConfig();

const sdk = new Sdk(credentials, configuration);
```

After creating the sdk, you just need to add the service you need. In this example, it is checkEmail()

Check email needs an email input. EmailInput is a JS object containing an emailAddress property.

```js
const input = new EmailCheckerInput("myemail@to.check");
sdk.checkEmail(input);
```

With some refacto:

```js
const checkEmailResponse = new Sdk(
  new Credentials("clientId", "secret"), // create the credentials
  new ConfigurationCreator().createApConfig() // generate the by defaut config
).checkEmail(new EmailCheckerInput("myemail@to.check")); // input is {"emailAddress": "myemail@example.com"}
```

Or an example of integration in a Standard Nest Controller

```js
import {
  [...],
  EmailCheckerInput,
  Sdk,
  ConfigurationCreator,
  Credentials,
  CheckEmailInput
} from '@bboxlab/mosel-sdk';

  [...]

  @Post('/emails/check')
  async checkEmail(@Body() checkEmailInput: CheckEmailInput): Promise<string> {
    // check the email by creating an sdk with credentials and defaut config
    return await new Sdk(
        // new Credentials(process.env.BT_API_LOGIN, process.env.BT_API_PWD),
        new Credentials('clientId', 'secret'),
        new ConfigurationCreator().createApConfig(), // generate the by defaut config
      ).checkEmail(new EmailCheckerInput(checkEmailInput.emailAddress)); // input is {"emailAddress": "myemail@example.com"}
    }
```

## How to build the project

The project will be build with rollup.

```
npm run build
```
