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

  // need to replace requestBtOpenApi function
  console.log(MoselClient);

  // const response = "a token example";
  // MoselClient.requestBtOpenApi.mockResolvedValue(response);

  // const token: Token = await authenticator.authenticate(
  //   credentials,
  //   configuration,
  //   client,
  //   validator
  // );
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
