import assert from "node:assert/strict";
import test from "node:test";
import { isAuthorized } from "../src/lib/basic-auth.mjs";

const basic = (value) => `Basic ${Buffer.from(value).toString("base64")}`;

test("correct credentials and a case-insensitive Basic scheme are accepted", () => {
  assert.equal(isAuthorized(basic("reader:secret"), "reader", "secret"), true);
  assert.equal(isAuthorized(basic("reader:secret").replace("Basic", "basic"), "reader", "secret"), true);
});

test("the entire password, including colons, must match", () => {
  assert.equal(isAuthorized(basic("reader:secret:extra"), "reader", "secret"), false);
  assert.equal(isAuthorized(basic("reader:secret:extra"), "reader", "secret:extra"), true);
  assert.equal(isAuthorized(basic("reader:secret"), "reader", "secret:extra"), false);
});

test("wrong users and wrong passwords are rejected", () => {
  assert.equal(isAuthorized(basic("other:secret"), "reader", "secret"), false);
  assert.equal(isAuthorized(basic("reader:wrong"), "reader", "secret"), false);
});

test("malformed headers, other schemes and invalid UTF-8 fail closed", () => {
  for (const header of [null, "", "Basic", "Basic ", "Basic !!!", "Basic a", "Basic ab==", "Basic /w==", "Bearer " + basic("reader:secret").slice(6), basic("reader"), basic("reader:secret") + " extra"]) {
    assert.equal(isAuthorized(header, "reader", "secret"), false, String(header));
  }
});

test("unset or empty configuration never grants access", () => {
  for (const value of [undefined, ""]) {
    assert.equal(isAuthorized(basic("reader:secret"), value, "secret"), false);
    assert.equal(isAuthorized(basic("reader:secret"), "reader", value), false);
  }
});

test("UTF-8 credentials and omitted Base64 padding are supported", () => {
  assert.equal(isAuthorized(basic("読者:合言葉:🌱"), "読者", "合言葉:🌱"), true);
  assert.equal(isAuthorized(basic("reader:secret").replace(/=+$/, ""), "reader", "secret"), true);
});
