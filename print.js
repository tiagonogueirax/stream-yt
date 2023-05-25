const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the viewport's width and height
  await page.setViewport({ width: 1920, height: 1080 });

  // Open ScrapingBee's home page
  await page.goto('https://scrapingbee.com');

  try {
    // Capture screenshot and save it in the current folder:
    await page.screenshot({ path: `./scrapingbee_homepage.jpg` });

  } catch (err) {
    console.log(`Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`Screenshot has been captured successfully`);
  }
})();