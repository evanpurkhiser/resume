import {chromium} from 'playwright';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  const rootDir = join(__dirname, '..');
  const htmlPath = join(rootDir, 'dist', 'index.html');
  const outputPath = join(rootDir, 'dist', 'resume.pdf');

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `file://${htmlPath}`;
  console.log(`Loading page from: ${url}`);
  await page.goto(url, {waitUntil: 'networkidle'});

  console.log('Generating PDF...');
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
  });

  await browser.close();
  console.log(`PDF generated successfully: ${outputPath}`);
}

generatePDF().catch(error => {
  console.error(error);
  process.exit(1);
});
