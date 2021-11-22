import { expect, test } from "@jest/globals";
import testFn from "../src";

test("ASDF", () => {
  expect(testFn()).toBe("ASDF");
});
