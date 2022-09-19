import { Configuration, ConfigurationCreator, Credentials, MoselClient } from "../../src";
import { Checker } from "../../src/checker/Checker";
import { Validator } from "../../src/validation/Validator";
import { emailInputValidationSchema, emailOuputValidationSchema } from "../../src/email/EmailChecker"

test('default check test', () => {
    expect(3).toBe(3);
});

test('First Checker test in wip', async() => {
    console.log('From test');
    const validator = new Validator();
    const credentials = new Credentials('test-fake-login', 'test-fake-password');
    const client = new MoselClient();
    const configuration = new ConfigurationCreator().createApConfig();

    const checker = new Checker(validator, credentials, client, configuration);
    const input = {
        "emailAddress": "okita@gmail.com"
    };

    // todo: mock the token request

    // const token = {
    //     "access_token": "at-2566947a-63f0-4bf5-9e24-d72d82ab0916",
    //     "expires_in": 3600,
    //     "token_type": "Bearer",
    //     "refresh_credit": 0,
    //     "scope": "EXT_PostalAddressConsult EXT_SalesPartnerContext EXT_ShoppingCartManage openid EXT_IbanConsult roles profile DocumentConsult EXT_CustomerAccountManage EXT_EmailAddressConsult EXT_PortabilityConsult EXT_OrderManage",
    //     "created_at": new Date(),
    //     "new": true
    // };

    // console.log('token', token);
      
    const result = await checker.check(
        input,
        emailInputValidationSchema,
        'emailAddressUrl',
        emailOuputValidationSchema,
        // token

    );
    console.log('checker', result)

    // stil in wip
    //todo: continue with a real test

    // what to do? test the 

    expect(5).toBe(5);
})
