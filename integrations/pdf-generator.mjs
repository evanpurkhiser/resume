import {chromium} from 'playwright';
import {join} from 'path';

export default function pdfGenerator() {
  return {
    name: 'pdf-generator',
    hooks: {
      'astro:build:done': async ({dir}) => {
        console.log('Generating PDF...');

        const htmlPath = join(dir.pathname, 'index.html');
        const outputPath = join(dir.pathname, 'resume.pdf');

        const browser = await chromium.launch();
        const page = await browser.newPage();

        const url = `file://${htmlPath}`;
        console.log(`Loading page from: ${url}`);
        await page.goto(url, {waitUntil: 'networkidle'});

        await page.pdf({
          path: outputPath,
          format: 'Letter',
          printBackground: true,
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          preferCSSPageSize: true,
          tagged: false,
          outline: false,
        });

        await browser.close();
        console.log(`PDF generated successfully: ${outputPath}`);
      },
    },
  };
}
