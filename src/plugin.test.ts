import { signadotPlugin } from "./plugin";

describe("signadot-environments", () => {
  it("should export plugin", () => {
    expect(signadotPlugin).toBeDefined();
  });
});
