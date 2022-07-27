import { Configuration, Credentials, MoselClient } from "../../src";
import { Checker } from "../../src/checker/Checker";
import { Validator } from "../../src/validation/Validator";

test('default check test', () => {
    expect(3).toBe(3);
});

test('First Checker test in wip', () => {
    const validator = new Validator();
    const credentials = new Credentials('test-fake-login', 'test-fake-password');
    const client = new MoselClient();
    const configuration = new Configuration();

    const checker = new Checker(validator, credentials, client, configuration);

    // stil in wip
    //todo: continue with a real test
    expect(5).toBe(5);
})
