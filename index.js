const puppeteer = require("puppeteer");
const votesToAdd = 500;
for (let index = 0; index < votesToAdd; index++) {
  (async () => {
    const email = require("email-generator");
    var fakeEmail = email.generateEmail().replaceAll('"', "");
    var fakeNumber = `07${Math.floor(Math.random() * 100000000)}`;
    const browser = await puppeteer.launch({
      args: ["--incognito"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://kitengefest.com/wp-admin/admin-ajax.php?action=totalpoll&totalpoll%5BpollId%5D=5183&totalpoll%5Baction%5D=view&totalpoll%5Bscreen%5D=vote",
      {
        waitUntil: "load",
      }
    );
    console.log(page.url());
    await page.waitForSelector(
      "#choice-1559516d-8b3e-4b53-a43d-1fcc6ae6408e-selector"
    );

    await page.evaluate(() => {
      document
        .querySelector("#choice-1559516d-8b3e-4b53-a43d-1fcc6ae6408e-selector")
        .parentElement.click();
    });
    await page.type("#totalpoll-fields-email", fakeEmail);
    await page.type("#totalpoll-fields-phone", fakeNumber);

    await Promise.all([
      page.click(".totalpoll-buttons-vote"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    browser.close();
  })();
}
