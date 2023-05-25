const { launch, getStream } = require("puppeteer-stream");
const fs = require("fs");

const file = fs.createWriteStream(__dirname + "/test.webm");

async function test() {
	const browser = await launch({
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
		headless: true,
		executablePath: '/home/tiagonogueirax/.cache/puppeteer/chrome/linux-113.0.5672.63/chrome-linux64/chrome'
	});

	const page = await browser.newPage();
	await page.goto("https://www.youtube.com/embed/V4TVfMjMy_k?autoplay=true", {timeout: 0});
	const stream = await getStream(page, { audio: true, video: true });
	console.log("recording");

	stream.pipe(file);

	setTimeout(async () => {
		await stream.destroy();
		file.close();
		console.log("finished");
	}, 1000 * 10);
}

test(); 