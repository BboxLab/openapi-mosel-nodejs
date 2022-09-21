import {
  Authenticator,
  ConfigurationCreator,
  Credentials,
  Token,
} from "../../src";
import { MoselClient } from "../../src/client/MoselClient";
import { Validator } from "../../src/validation/Validator";
jest.mock("../../src/client/MoselClient");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  MoselClient.mockClear();
});

test("default-check-authenticator", async () => {
  const authenticator = new Authenticator();
  const credentials = new Credentials("test-fake-login", "test-fake-password");
  const configuration = new ConfigurationCreator().createApConfig();
  const client = new MoselClient();
  const validator = new Validator();

  expect(MoselClient).toHaveBeenCalledTimes(1);

  // create a mock instance of Mosel Client
  const mockMoselClientInstance = MoselClient.mock.instances[0];

  // mock the response for http call
  const tokenResponse = {
    "access_token": "a fake token",
    "expires_in": 3600,
    "token_type": "Bearer",
    "refresh_credit": 0,
    "scope": "EXT_PostalAddressConsult EXT_SalesPartnerContext EXT_ShoppingCartManage openid EXT_IbanConsult roles profile DocumentConsult EXT_CustomerAccountManage EXT_EmailAddressConsult EXT_PortabilityConsult EXT_OrderManage"
  };

  mockMoselClientInstance.requestBtOpenApi.mockImplementationOnce(() => tokenResponse);
  // jest.spyOn(mockMoselClientInstance, 'requestBtOpenApi').mockImplementation(() => tokenResponse);

  // fetch with mock
  const token: Token = await authenticator.authenticate(
    credentials,
    configuration,
    client,
    validator
  );
});

// test("authenticate-check-token", () => {
//   const authenticator = new Authenticator();
//   console.log(authenticator);
//   const token: Token = authenticator.authenticate(
//     credentials,
//     configuration,
//     client,
//     validator
//   );

//   console.log(token);
// });
