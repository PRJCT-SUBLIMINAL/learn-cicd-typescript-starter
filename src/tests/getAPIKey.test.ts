import { describe, expect, test } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.ts";

describe("getApiKey", () => {
  test("No auth header", () => {
    const apiKey = getAPIKey({});
    expect(apiKey).toBe(null);
  });

  test("Wrong schema", () => {
    const apiKey = getAPIKey({ authorization: "Bearer sigma1234" });
    expect(apiKey).toBe(null);
  });

  test("No key", () => {
    const apiKey = getAPIKey({ authorization: "ApiKey" });
    expect(apiKey).toBe(null);
  });

  test("Valid auth", () => {
    const apiKey = getAPIKey({ authorization: "ApiKey sigma1234" });
    expect(apiKey).toBe("sigma1234");
  });

  test("Malformed header", () => {
    const apiKey = getAPIKey({ authorization: "APIKey sigma1234" });
    expect(apiKey).toBe(null);
  });
});
