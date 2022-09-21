import { ConfigurationCreator, Credentials, ibanInputValidationSchema, MoselClient } from "../../src";
import { Checker } from "../../src/checker/Checker";
import { Validator } from "../../src/validation/Validator";
jest.mock("../../src/client/MoselClient");

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MoselClient.mockClear();
});

test("iban-check-default", async () => {
  const validator = new Validator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const client = new MoselClient();
  const configuration = new ConfigurationCreator().createApConfig();

  const checker = new Checker(validator, credentials, client, configuration);
  const input = {
    iban: "FR7630001007941234567890185",
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
  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => null);
  
  const result = await checker.check(
    input,
    ibanInputValidationSchema,
    "ibanUrl",
    null,
    null,
    'iban'
  );

  expect(JSON.stringify(result.content)).toBe(JSON.stringify({"iban": true}))
  expect(result.token.access_token).toBe('a fake token');
  expect(result.token.new).toBe(true);
});


test("iban-check-default-label", async () => {
  const validator = new Validator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const client = new MoselClient();
  const configuration = new ConfigurationCreator().createApConfig();

  const checker = new Checker(validator, credentials, client, configuration);
  const input = {
    iban: "FR7630001007941234567890185",
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
  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => null);
  
  const result = await checker.check(
    input,
    ibanInputValidationSchema,
    "ibanUrl",
    null,
  );

  expect(JSON.stringify(result.content)).toBe(JSON.stringify({"response": true}))
  expect(result.token.access_token).toBe('a fake token');
  expect(result.token.new).toBe(true);
});
