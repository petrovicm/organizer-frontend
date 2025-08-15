/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // add other env vars with VITE_ prefix here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
