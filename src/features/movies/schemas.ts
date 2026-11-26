// src/features/movies/schemas.ts
import { z } from "zod";
import { paginated } from "@/lib/zod";
import {GenreSchema} from "@/features/genre";


// ---------- Movie (list item) ----------
export const MovieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const MoviesSchema = z.object({
    results: z.array(MovieSchema),
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
});


export const PaginatedMoviesSchema = paginated(MovieSchema);

// ---------- Movie details ----------
export const ProductionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string(),
});

export const ProductionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});

export const SpokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
});

export const MovieDetailsSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    belongs_to_collection: z
        .object({
            id: z.number(),
            name: z.string(),
            poster_path: z.string().nullable(),
            backdrop_path: z.string().nullable(),
        })
        .nullable(),
    budget: z.number(),
    genres: z.array(GenreSchema),
    homepage: z.string().nullable(),
    id: z.number(),
    imdb_id: z.string().nullable(),
    origin_country: z.array(z.string()).optional(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string().nullable(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(ProductionCompanySchema),
    production_countries: z.array(ProductionCountrySchema),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(SpokenLanguageSchema),
    status: z.string(),
    tagline: z.string().nullable(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

// ---------- Credits ----------
export const CastSchema = z.object({
    adult: z.boolean(),
    gender: z.number().nullable(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    cast_id: z.number().optional(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
});

export const CrewSchema = z.object({
    adult: z.boolean(),
    gender: z.number().nullable(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    credit_id: z.string(),
    department: z.string(),
    job: z.string(),
});

export const CreditsSchema = z.object({
    id: z.number(),
    cast: z.array(CastSchema),
    crew: z.array(CrewSchema),
});

// ---------- Videos ----------
export const VideoSchema = z.object({
    iso_639_1: z.string(),
    iso_3166_1: z.string(),
    name: z.string(),
    key: z.string(),
    site: z.string(),
    size: z.number(),
    type: z.string(),
    official: z.boolean(),
    published_at: z.string(),
    id: z.string(),
});

export const VideosSchema = z.object({
    id: z.number(),
    results: z.array(VideoSchema),
});

// ---------- Images ----------
export const ImageSchema = z.object({
    aspect_ratio: z.number(),
    height: z.number(),
    iso_639_1: z.string().nullable(),
    file_path: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    width: z.number(),
});

export const ImagesSchema = z.object({
    id: z.number(),
    backdrops: z.array(ImageSchema),
    logos: z.array(ImageSchema).optional(),
    posters: z.array(ImageSchema),
});

// ---------- Full details (append_to_response) ----------
export const MovieDetailsFullSchema = MovieDetailsSchema.extend({
    credits: CreditsSchema.optional(),
    videos: VideosSchema.optional(),
    images: ImagesSchema.optional(),
});

// ---------- Types ----------
export type Movie = z.infer<typeof MovieSchema>;
export type PaginatedMovies = z.infer<typeof PaginatedMoviesSchema>;
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;
export type MovieDetailsFull = z.infer<typeof MovieDetailsFullSchema>;
export type Cast = z.infer<typeof CastSchema>;
export type Crew = z.infer<typeof CrewSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Videos = z.infer<typeof VideosSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Images = z.infer<typeof ImagesSchema>;