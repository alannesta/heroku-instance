/*
    2021.04.05 try using headless chrome to parse m3u8 url (videojs)
 */
const puppeteer = require('puppeteer');

const ParserSerive = {
    async parse(url) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4454.192 Safari/537.36");
            await page.setCookie({name: "language", value: "cn_CN", domain: "www.91porn.com"});

            await page.goto(url, {
                waitUntil: 'networkidle2'
            });

            const video = await page.$('source');
            const src = await video.getProperty('src');
            const m3u8Url = await src.jsonValue();

            return m3u8Url;

        } catch (e) {
            console.error('headless chrome parsing failed');
            console.trace(e);
            return 'http://www.somerandomurl.io'
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }
};

module.exports = ParserSerive;
