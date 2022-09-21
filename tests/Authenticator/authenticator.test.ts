import {
  ConfigurationCreator,
  Credentials,
  Token,
} from "../../src";
import { MoselClient } from "../../src/client/MoselClient";
import { MoselError } from "../../src/error/MoselError";
import { Validator } from "../../src/validation/Validator";
import { Authenticator } from "../../src/authentication/Authenticator";
jest.mock("../../src/client/MoselClient");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  MoselClient.mockClear();
});

test("default-authentication", async () => {
  const authenticator = new Authenticator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const configuration = new ConfigurationCreator().createApConfig();
  const client = new MoselClient();
  const validator = new Validator();

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
  // jest.spyOn(mockMoselClientInstance, 'requestBtOpenApi').mockImplementation(() => tokenResponse);

  // fetch with mock
  const token: Token = await authenticator.authenticate(
    credentials,
    configuration,
    client,
    validator
  );

  // check response
  expect(token.access_token).toBe('a fake token');
  expect(token.expires_in).toBe(3600);
  expect(token.refresh_credit).toBe(0);
  expect(token.token_type).toBe("Bearer");
  expect(token.scope).toBe("EXT_PostalAddressConsult EXT_SalesPartnerContext EXT_ShoppingCartManage openid EXT_IbanConsult roles profile DocumentConsult EXT_CustomerAccountManage EXT_EmailAddressConsult EXT_PortabilityConsult EXT_OrderManage");
  expect(token.new).toBe(true);
});

test("invalid-token-response-authentication", async () => {
  const authenticator = new Authenticator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const configuration = new ConfigurationCreator().createApConfig();
  const client = new MoselClient();
  const validator = new Validator();

  expect(MoselClient).toHaveBeenCalledTimes(1);

  // create a mock instance of Mosel Client
  const mockMoselClientInstance = MoselClient.mock.instances[0];

  // mock the response for http call with an error format response
  const btTokenResponse = {
    "error": "invalid_client",
    "error_id": "et-480b0b38-e31d-4489-b731-2bf4880a6364",
    "error_status": 401
};

  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => btTokenResponse);
  const authenticateFunction = async() => {
    await authenticator.authenticate(
      credentials,
      configuration,
      client,
      validator
    )
  };

  // check error type
  await expect(authenticateFunction)
  .rejects
  .toThrow(MoselError)

  // check error message
  await expect(authenticateFunction)
  .rejects
  .toThrow("[Mosel Error]: an error occurs when fetching token for authentication")

});
