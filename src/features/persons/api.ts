import {tmdbClient} from "@/api/tmdb-client.ts";
import {PersonSchema} from "@/features/persons/schemas";
import {nfc} from "@/lib/unicode.ts";
import {MoviesSchema} from "@/features/movies";

/**
 * getActor
 * @param id
 * @param language
 */
export async function getPerson(id: number, language = "en-US") {
    const { data } = await tmdbClient.get(`/person/${id}`, {
        params: { append_to_response: "movie_credits", language },
    });
    return {
        ...PersonSchema.parse(nfc(data)),
        movies: MoviesSchema
            .pick({ results: true })
            .shape.results.parse(nfc(data.movie_credits?.cast || [])),
    };
}