
export type SortBy =
    | "popularity.desc"
    | "popularity.asc"
    | "vote_average.desc"
    | "vote_average.asc"
    | "vote_count.desc"
    | "vote_count.asc"
    | "primary_release_date.desc"
    | "primary_release_date.asc"
    | "revenue.desc"
    | "revenue.asc"
    | "title.asc"
    | "title.desc"
    | "original_title.asc"
    | "original_title.desc";

export interface DiscoverMoviesParams {
    page?: number;
    language?: string;
    region?: string;
    sort_by?: SortBy;
    with_genres?: string;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    primary_release_year?: number;
    "primary_release_date.gte"?: string;
    "primary_release_date.lte"?: string;
    "release_date.gte"?: string;
    "release_date.lte"?: string;
    with_release_type?: string;
    "vote_average.gte"?: number;
    "vote_average.lte"?: number;
    "vote_count.gte"?: number;
    include_adult?: boolean;
    include_video?: boolean;
    with_original_language?: string;
}