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

## Tutorial: integrating the mosel-sdk package in a common js app.

Requirements:

- node
- npm

### Create a cjs simple project

First, create a folder with a js file.

```
mdkir common-js-app
cd common-js-app
touch app.js
```

Add a minimal code in app.js.

```js
console.log("hello world");
```

Run it with the following command to get the "hello world" message in console.

```
node app.js
```

We will add npm configuration (and validate all default responses).

```
npm init
```

In package json, we add a script for start : "start": "node app.js"

```
{
  "name": "common-js-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "author": "",
  "license": "ISC"
}
```

### Install the project

```
npm i @bboxlab/mosel-sdk
```

Replace code in app.js by

```js
const Mosel = require("@bboxlab/mosel-sdk");

const checkEmailResponse = new Mosel.Sdk(
  new Mosel.Credentials(
    "partner.tocomplete.bouyguestelecom.fr",
    "somePassword"
  ), // replace with the correct credentials
  new Mosel.ConfigurationCreator().createApConfig() // generate the by defaut config
).checkEmail(new Mosel.EmailCheckerInput("gaetan@shinsen.fr")); // input is {"emailAddress": "myemail@example.com"}

// a way to display the response returned by the sdk
checkEmailResponse.then((data) => console.log(data));
```

Start the app with "npm run start", to get a response like the following in your console:

```
Response {
  token: Token {
    access_token: 'at-58734b17-386b-47e9-b942-43b1227fc361',
    expires_in: 3600,
    token_type: 'Bearer',
    refresh_credit: 0,
    scope: 'EXT_SalesPartnerContext EXT_ShoppingCartManage openid roles profile EXT_CustomerAccountManage EXT_OrderManage EXT_PostalAddressConsult EXT_IbanConsult DocumentConsult EXT_EmailAddressConsult EXT_PortabilityConsult email',
    created_at: 2022-10-20T09:28:44.665Z,
    new: true
  },
  content: { contactEmailAddress: false, validEmailAddress: true }
}

```

### About require

If you use cjs and "require" to import module, you need to add the reference to Mosel before all imported objects. For exemple "new Mosel.Sdk()" and "new Sdk()".
