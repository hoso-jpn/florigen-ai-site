import { timingSafeEqual } from "node:crypto";

function equalText(actual, expected) {
  const left = Buffer.from(actual, "utf8");
  const right = Buffer.from(expected, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isAuthorized(header, username, password) {
  // Missing configuration must never turn the private preview into a public site.
  if (!username || !password || typeof header !== "string") return false;
  const match = /^Basic +([A-Za-z0-9+/]+={0,2})$/i.exec(header);
  if (!match) return false;

  const bytes = Buffer.from(match[1], "base64");
  // Buffer's decoder is permissive; require a canonical, optionally unpadded token.
  if (bytes.toString("base64").replace(/=+$/, "") !== match[1].replace(/=+$/, "")) {
    return false;
  }

  let credentials;
  try {
    credentials = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return false;
  }
  const separator = credentials.indexOf(":");
  if (separator < 0) return false;
  const userMatches = equalText(credentials.slice(0, separator), username);
  const passwordMatches = equalText(credentials.slice(separator + 1), password);
  return userMatches && passwordMatches;
}
