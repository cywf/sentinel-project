/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly PUBLIC_DEFAULT_THEME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
