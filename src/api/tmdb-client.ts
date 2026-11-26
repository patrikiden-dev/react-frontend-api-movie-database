import axios from "axios";
import { z } from "zod";

const environmentSchema = z.object({
    baseUrl: z.url().default("https://api.themoviedb.org/3"),
    accessToken: z.string().min(1, "TMDB access token is missing"),
});

const environment = environmentSchema.safeParse({
    baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
    accessToken: import.meta.env.VITE_TMDB_READ_TOKEN,
});

if (!environment.success) {
    throw new Error(z.prettifyError(environment.error));
}

const config = environment.data;


export const tmdbClient = axios.create({
    baseURL: config?.baseUrl || "https://api.themoviedb.org/3",
});

tmdbClient.interceptors.request.use((request) => {

    if (!config) {
        throw new Error(
            "TMDB configuration is incomplete. Set VITE_TMDB_ACCESS_TOKEN in your .env file.",
        );
    }

    request.headers.Authorization = `Bearer ${config.accessToken}`;
    request.headers.Accept = "application/json";
    request.params = { language: "en-US", ...request.params };

    return request;
});
/*
if (!environment.success) {
  throw new Error(z.prettifyError(environment.error));
}
const config = environment.data;
 */