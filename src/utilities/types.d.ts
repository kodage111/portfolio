export interface Experience {
  id: number;
  dates: string;
  title: string;
  company: string;
  location: string;
  responsibilities: string[];
  techStack: string[];
}

export interface Education {
  id: number;
  dates: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
}

export interface Stack {
  id: number;
  name: string;
  description: string;
  icon: string;
  skillLevel: number;
  category:
    | "Languages"
    | "Frameworks & Libraries"
    | "Databases"
    | "Tools & Platform";
}

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  pageCount: number;
  previewImage: string;
  images: ProjectImage[];
  logo?: string;
  backgroundGradient: string;
  deviceType: "desktop" | "tablet" | "mobile";
  osTypes: ("ios" | "android" | "web" | "windows")[];
  functionality: string;
  repoLink: string;
  liveLink?: string;
  techStack: string[];
}

export interface ProjectImage {
  id: number;
  image: string;
  description: string;
}
