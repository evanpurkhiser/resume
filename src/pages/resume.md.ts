import {readFileSync} from 'fs';
import {load} from 'js-yaml';
import {join} from 'path';
import type {Resume} from '../types';
import {formatDateRange} from '../utils/dates';

export async function GET() {
  const resumePath = join(process.cwd(), 'content', 'resume.yaml');
  const resumeYaml = readFileSync(resumePath, 'utf8');
  const resume = load(resumeYaml) as Resume;

  const markdown = generateMarkdown(resume);

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}

function generateMarkdown(resume: Resume): string {
  const sections: string[] = [];

  // Header
  sections.push(`# ${resume.personal.name}`);
  sections.push(`**${resume.personal.title}**\n`);

  // Contact Info
  if (resume.personal.email) {
    sections.push(`Email: ${resume.personal.email}`);
  }
  if (resume.personal.website) {
    sections.push(`Website: ${resume.personal.website}`);
  }
  if (resume.personal.linkedin) {
    sections.push(`LinkedIn: ${resume.personal.linkedin}`);
  }
  if (resume.personal.phoneLastFour) {
    sections.push(`Phone: ***-***-${resume.personal.phoneLastFour}`);
  }
  sections.push('');

  // Skills
  sections.push('## Skills\n');
  for (const skillGroup of resume.skills) {
    sections.push(`**${skillGroup.category}**`);
    sections.push(skillGroup.items.join(', '));
    sections.push('');
  }

  // Education
  sections.push('## Education\n');
  sections.push(`**${resume.education.degree}**`);
  sections.push(resume.education.institution);
  sections.push(
    formatDateRange(resume.education.dates.start, resume.education.dates.end)
  );
  sections.push('');

  // Summary
  if (resume.summary) {
    sections.push(resume.summary);
    sections.push('');
  }

  // Experience
  sections.push('## Experience\n');
  for (const job of resume.experience) {
    sections.push(`### ${job.company}`);
    sections.push(`**${job.title}**`);
    sections.push(formatDateRange(job.dates.start, job.dates.end));
    sections.push('');

    if (job.description) {
      sections.push(job.description);
      sections.push('');
    }

    for (const section of job.sections) {
      if (section.heading) {
        sections.push(`#### ${section.heading}\n`);
      }

      for (const bullet of section.bullets) {
        sections.push(`- ${bullet}`);
      }
      sections.push('');
    }
  }

  // Projects
  sections.push('## Personal Highlights\n');
  for (const project of resume.projects) {
    sections.push(`### ${project.name}`);

    // Links
    if (project.links && project.links.length > 0) {
      const links = project.links.map(link => `[${link.name}](${link.url})`);
      sections.push(links.join(', '));
    }

    sections.push('');
    sections.push(project.description);
    sections.push('');
  }

  // Alternative versions
  sections.push('---\n');
  sections.push(
    '**Alternative Versions:** [HTML](https://resume.evanpurkhiser.com) | [PDF](https://resume.evanpurkhiser.com/resume.pdf)'
  );

  return sections.join('\n');
}
