/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME_LONG: string;
  readonly VITE_NAME_SHORT: string;
  readonly VITE_ROLE: string;
  readonly VITE_LOCATION: string;
  readonly VITE_EMAIL: string;
  readonly VITE_LINKEDIN: string;
  readonly VITE_GITHUB: string;
  readonly VITE_TWITTER: string;
  readonly VITE_INSTAGRAM: string;
  readonly VITE_FACEBOOK: string;
  readonly VITE_YOUTUBE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
