import { newE2EPage } from "@stencil/core/testing";

describe("dc-header", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<dc-header></dc-header>");
    const element = await page.find("dc-header");

    expect(element).not.toBeNull();
  });
});
