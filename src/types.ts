export interface Personal {
  name: string;
  title: string;
  location?: string;
  email: string;
  website?: string;
  linkedin?: string;
  phoneLastFour?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface DateRange {
  start: string;
  end?: string;
}

export interface ExperienceSection {
  heading?: string;
  bullets: string[];
}

export interface Experience {
  company: string;
  title: string;
  dates: DateRange;
  description?: string;
  sections: ExperienceSection[];
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  name: string;
  links?: ProjectLink[];
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  dates: DateRange;
}

export interface Resume {
  personal: Personal;
  skills: SkillCategory[];
  education: Education;
  experience: Experience[];
  projects: Project[];
}
