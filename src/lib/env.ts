import { z } from "zod";

/**
 * Validate Environments Variables in .env
 *
 * IMPORTANT
 * Make sure you are exporting the parsed data object directly in the main.tsx file:
 * import "@/lib/env";
 *
 * And then where every you need to access the environment variables, you can import the env object:
 * import { env } from "@/lib/env";
 */
const schema = z.object({
    // ✅ Correct Zod v4 syntax: Use z.url() directly
    VITE_TMDB_BASE_URL: z.url({ protocol: /^https?$/ }).default("https://themoviedb.org"),
    VITE_TMDB_IMAGE_URL: z.url({ protocol: /^https?$/ }).default("https://tmdb.org"),
    VITE_TMDB_READ_TOKEN: z.string().min(1, "VITE_TMDB_READ_TOKEN is missing"),
});

// Parse the raw import.meta.env object
const parsed = schema.safeParse(import.meta.env);

if (!parsed.success) {
    // 💡 Zod v4 uses z.prettifyError to convert errors into human-readable strings
    console.error("❌ Environment validation failed:");
    throw new Error(z.prettifyError(parsed.error));
}

export const env = parsed.data;



/*

const schema = z.object({
    VITE_TMDB_BASE_URL: z.url().default("https://api.themoviedb.org/3"),
    VITE_TMDB_IMAGE_URL: z.url().default("https://image.tmdb.org/t/p"),
    VITE_TMDB_READ_TOKEN: z.string().min(1, "VITE_TMDB_READ_TOKEN is missing"),
});

const parsed = schema.safeParse(import.meta.env);

if (!parsed.success) {
    throw new Error(z.prettifyError(parsed.error));
}

export const env = parsed.data;

 */