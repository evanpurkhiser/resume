import {chromium} from 'playwright';
import {join} from 'path';

export default function pdfGenerator() {
  return {
    name: 'pdf-generator',
    hooks: {
      'astro:build:done': async ({dir}) => {
        const htmlPath = join(dir.pathname, 'index.html');
        const outputPath = join(dir.pathname, 'resume.pdf');

        const browser = await chromium.launch();
        const page = await browser.newPage();

        const url = `file://${htmlPath}`;
        await page.goto(url, {waitUntil: 'networkidle'});

        // Get the full height of the page content
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

        await page.pdf({
          path: outputPath,
          width: '8.5in',
          height: `${bodyHeight}px`,
          printBackground: true,
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          tagged: false,
          outline: false,
        });

        await browser.close();
      },
    },
  };
}
