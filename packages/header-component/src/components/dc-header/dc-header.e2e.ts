import { newE2EPage } from "@stencil/core/testing";

describe("dc-header", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent('<dc-header links=\'[{"href":"http://tools.debtcollective.org/","text":"Dispute your debt"}, {"href":"https://powerreport.debtcollective.org/","text":"The Power Report"}, {"href":"https://membership.debtcollective.org/","text":"Donate"}]\'></dc-header>');
    const element = await page.find("dc-header");

    expect(element).not.toBeNull();
  });
});