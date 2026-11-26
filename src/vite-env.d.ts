/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_BASE_URL?: string;
    readonly VITE_TMDB_IMAGE_URL?: string;
    readonly VITE_TMDB_READ_TOKEN: string;
}
/*
interface ImportMetaEnv {
    readonly VITE_TMDB_READ_TOKEN: string;
    readonly VITE_TMDB_ACCESS_TOKEN: string;
    readonly VITE_TMDB_BASE_URL: string;
    readonly VITE_TMDB_IMAGE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

 */