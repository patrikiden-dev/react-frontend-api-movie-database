import { z } from "zod";
import { paginated } from "@/lib/zod";
// import from the file, not the barrel, to avoid circular imports
import { MovieSchema } from "@/features/movies/schemas";

// ---------- Person (list item) ----------
export const PersonSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    known_for: z.array(z.unknown()).optional(),
});

export const PaginatedPeopleSchema = paginated(PersonSchema);

// ---------- Person details ----------
export const PersonDetailsSchema = z.object({
    adult: z.boolean(),
    also_known_as: z.array(z.string()),
    biography: z.string(),
    birthday: z.string().nullable(),
    deathday: z.string().nullable(),
    gender: z.number(),
    homepage: z.string().nullable(),
    id: z.number(),
    imdb_id: z.string().nullable(),
    known_for_department: z.string(),
    name: z.string(),
    place_of_birth: z.string().nullable(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
});

// ---------- Person movie credits ----------
const PersonMovieBaseSchema = MovieSchema.extend({
    release_date: z.string().optional(),
    credit_id: z.string(),
});

export const PersonMovieCastSchema = PersonMovieBaseSchema.extend({
    character: z.string(),
    order: z.number().optional(),
});

export const PersonMovieCrewSchema = PersonMovieBaseSchema.extend({
    department: z.string(),
    job: z.string(),
});

export const PersonMovieCreditsSchema = z.object({
    id: z.number(),
    cast: z.array(PersonMovieCastSchema),
    crew: z.array(PersonMovieCrewSchema),
});

// ---------- Types ----------
export type Person = z.infer<typeof PersonSchema>;
export type PaginatedPeople = z.infer<typeof PaginatedPeopleSchema>;
export type PersonDetails = z.infer<typeof PersonDetailsSchema>;
export type PersonMovieCast = z.infer<typeof PersonMovieCastSchema>;
export type PersonMovieCrew = z.infer<typeof PersonMovieCrewSchema>;
export type PersonMovieCredits = z.infer<typeof PersonMovieCreditsSchema>;