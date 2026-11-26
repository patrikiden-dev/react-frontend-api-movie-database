import {Film} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getGenres} from "@/features/movies/api.ts";
import type {Movie} from "@/features/movies";
import MovieCard from "./movie-card";

/**
 *
 * @param param0
 * @param param0.movies
 * @param param0.saved
 * @param param0.toggle
 * @param param0.empty
 * @constructor
 */
export default function MovieGrid({
                              movies,
                              saved,
                              toggle,
                              empty = "No movies found.",
                          }: {
    movies: Movie[];
    saved: number[];
    toggle: (id: number) => void;
    empty?: string;
}) {
    const language = localStorage.getItem("movievault-locale") || "en-US";
    const genreQuery = useQuery({
        queryKey: ["genres", language],
        queryFn: () => getGenres(language),
    });
    const names = new Map(
        (genreQuery.data || []).map((genre) => [genre.id, genre.name]),
    );
    if (!movies.length)
        return (
            <div className="empty-state">
        <span className="empty-icon">
          <Film />
        </span>
                <h3>{empty}</h3>
                <p>Try a different filter or search term.</p>
            </div>
        );
    return (
        <div className="movie-grid">
            {movies.slice(0, 16).map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    saved={saved.includes(movie.id)}
                    onToggle={() => toggle(movie.id)}
                    genreNames={(movie.genre_ids || [])
                        .map((id) => names.get(id))
                        .filter((name): name is string => Boolean(name))}
                />
            ))}
        </div>
    );
}