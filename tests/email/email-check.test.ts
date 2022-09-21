import { ConfigurationCreator, Credentials, MoselClient } from "../../src";
import { Checker } from "../../src/checker/Checker";
import { Validator } from "../../src/validation/Validator";
import {
  emailInputValidationSchema,
  emailOuputValidationSchema,
} from "../../src/email/EmailChecker";
jest.mock("../../src/client/MoselClient");

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MoselClient.mockClear();
});

test("email-check-default", async () => {
  const validator = new Validator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const client = new MoselClient();
  const configuration = new ConfigurationCreator().createApConfig();

  const checker = new Checker(validator, credentials, client, configuration);
  const input = {
    emailAddress: "okita@gmail.com",
  };

  expect(MoselClient).toHaveBeenCalledTimes(1);

  // create a mock instance of Mosel Client
  const mockMoselClientInstance = MoselClient.mock.instances[0];

  // mock the response for http call
  const btTokenResponse = {
    "access_token": "a fake token",
    "expires_in": 3600,
    "token_type": "Bearer",
    "refresh_credit": 0,
    "scope": "EXT_PostalAddressConsult EXT_SalesPartnerContext EXT_ShoppingCartManage openid EXT_IbanConsult roles profile DocumentConsult EXT_CustomerAccountManage EXT_EmailAddressConsult EXT_PortabilityConsult EXT_OrderManage"
  };

  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => btTokenResponse);

  const checkEmailResponse = {
    "contactEmailAddress": false,
    "validEmailAddress": true,
  };
  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => checkEmailResponse);
  
  const result = await checker.check(
    input,
    emailInputValidationSchema,
    "emailAddressUrl",
    emailOuputValidationSchema
  );

  expect(JSON.stringify(result.content)).toBe(JSON.stringify({"contactEmailAddress": false, "validEmailAddress": true }))
  expect(result.token.access_token).toBe('a fake token');
  expect(result.token.new).toBe(true);
});
