/*
    2021.04.05 try using headless chrome to parse m3u8 url (videojs)
 */
const puppeteer = require('puppeteer-core');

const ParserService = {
    // parse(url) {
    //     // 2021.04.05 temporary solution for video parsing
    //     return Promise.resolve('http://placeholderurlforvideo.io');
    // }
    async parse(url) {
        console.log('start parsing:', url);
        const browser = await puppeteer.launch({
            executablePath: '/app/.apt/usr/bin/google-chrome'
        });

        try {
            const page = await browser.newPage();
            await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4454.192 Safari/537.36");
            await page.setCookie({name: "language", value: "cn_CN", domain: "www.91porn.com"});

            console.log('headless chrome init success');

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

module.exports = ParserService;
