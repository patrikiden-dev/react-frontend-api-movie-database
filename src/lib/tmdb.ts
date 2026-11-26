import axios from "axios";
import { env } from "./env";

export const tmdbClient = axios.create({
    baseURL: env.VITE_TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${env.VITE_TMDB_READ_TOKEN}`,
        Accept: "application/json",
    },
    params: { language: "en-US" },
});