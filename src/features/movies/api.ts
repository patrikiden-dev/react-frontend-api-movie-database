import { z } from "zod";
import { tmdbClient } from "@/api/tmdb-client";
import {nfc} from "@/lib/unicode.ts";
import {MovieSchema, MoviesSchema} from "@/features/movies/";
import {PersonSchema} from "@/features/persons";
import {type Genre, GenresResponseSchema} from "@/features/genre";

const pageSize = 16;
const tmdbPageSize = 20;

/**
 * Pagination: getSixteenResults
 * @param fetchPage
 * @param page
 */
async function getSixteenResults(
    fetchPage: (page: number) => Promise<z.infer<typeof MoviesSchema>>,
    page: number,
) {
    const safePage = Math.min(625, Math.max(1, page));
    const start = (safePage - 1) * pageSize;
    const sourcePage = Math.floor(start / tmdbPageSize) + 1;
    const offset = start % tmdbPageSize;
    const first = await fetchPage(sourcePage);
    const results = first.results.slice(offset, offset + pageSize);
    if (results.length < pageSize && sourcePage < first.total_pages) {
        const second = await fetchPage(sourcePage + 1);
        results.push(...second.results.slice(0, pageSize - results.length));
    }
    return {
        ...first,
        results,
        page: safePage,
        total_pages: Math.min(625, Math.ceil(first.total_results / pageSize)),
    };
}

/**
 * getMovies
 * @param path
 * @param page
 * @param params
 */
export async function getMovies(
    path: string,
    page = 1,
    params: Record<string, string | number> = {},
) {
    return getSixteenResults(async (sourcePage) => {
        const { data } = await tmdbClient.get(path, {
            params: { ...params, page: sourcePage },
        });
        return MoviesSchema.parse(nfc(data));
    }, page);
}


/**
 * searchMovies
 * @param query
 * @param page
 * @param language
 */
export async function searchMovies(
    query: string,
    page = 1,
    language = "en-US",
) {
    return getSixteenResults(async (sourcePage) => {
        const { data } = await tmdbClient.get("/search/movie", {
            params: {
                query: query.normalize("NFC"),
                page: sourcePage,
                include_adult: false,
                language,
            },
        });
        return MoviesSchema.parse(nfc(data));
    }, page);
}

/**
 * getMovie
 * @param id
 * @param language
 */
export async function getMovie(id: number, language = "en-US") {
    const { data } = await tmdbClient.get(`/movie/${id}`, {
        params: { append_to_response: "credits", language },
    });
    const movie = MovieSchema.parse(nfc(data));
    const cast = z.array(PersonSchema).parse(nfc(data.credits?.cast || []));
    return { ...movie, cast };
}



/**
 * getGenres
 * @param language
 */
export async function getGenres(language = "en-US"): Promise<Genre[]> {
    const { data } = await tmdbClient.get("/genre/movie/list", {
        params: { language },
    });
    return GenresResponseSchema.parse(nfc(data)).genres;
}
