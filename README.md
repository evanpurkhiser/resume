## Evan Purkhiser's Résumé

[![Build and Publish Resume](https://github.com/evanpurkhiser/resume/actions/workflows/publish.yml/badge.svg)](https://github.com/evanpurkhiser/resume/actions/workflows/publish.yml)

My résumé built from [resume.yaml](content/resume.yaml) using Astro and compiled into a PDF.

Available at [resume.evanpurkhiser.com](https://resume.evanpurkhiser.com), also available as [Markdown](https://resume.evanpurkhiser.com/resume.md) and a [PDF](https://resume.evanpurkhiser.com/resume.pdf).

## Build Pipeline

On every push to `main`, the build pipeline:

1. Builds the Astro site to static HTML
2. Uses Playwright with Chromium to generate a PDF from the HTML
3. Generates a Markdown version of the resume
4. Deploys the site (including PDF and Markdown) to Cloudflare Pages
5. Creates a GitHub release (`latest`) with the PDF and Markdown artifacts
