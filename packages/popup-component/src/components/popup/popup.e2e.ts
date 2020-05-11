import { newE2EPage } from "@stencil/core/testing";

describe("dc-popup", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-popup hero="hero-test"></dc-popup>');
    const element = await page.find("dc-popup");
    expect(element).not.toBeNull();
  });
});
