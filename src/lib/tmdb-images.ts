import { env } from "./env";

type ImagePath = string | null | undefined;

const url = (path: ImagePath, size: string) =>
    path ? `${env.VITE_TMDB_IMAGE_URL}/${size}${path}` : null;

export const movieImages = {
    poster: (path: ImagePath, size = "w500") => url(path, size),
    backdrop: (path: ImagePath, size = "w1280") => url(path, size),
    profile: (path: ImagePath, size = "w185") => url(path, size),
};