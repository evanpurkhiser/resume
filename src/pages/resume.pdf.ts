import type {APIRoute} from 'astro';
import {chromium} from 'playwright';
import {experimental_AstroContainer} from 'astro/container';
import IndexPage from './index.astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  // Render the index page to HTML using Astro's Container API
  const container = await experimental_AstroContainer.create();
  const html = await container.renderToString(IndexPage);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(html, {waitUntil: 'networkidle'});

  const pdf = await page.pdf({
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

  return new Response(pdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
};
