interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_LOGO_URL?: string
  // add more env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}