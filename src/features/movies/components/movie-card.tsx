import { Link } from "react-router";

import { Bookmark, BookmarkCheck, Film, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {Movie} from "@/features/movies";
import {movieImages} from "@/lib/tmdb-images.ts";

export default function MovieCard({
                              movie,
                              saved,
                              onToggle,
                              genreNames,
                          }: {
    movie: Movie;
    saved: boolean;
    onToggle: () => void;
    genreNames: string[];
}) {
    const image = movieImages.poster(movie.poster_path);
    return (
        <article className="movie-card">
            <Link
                to={`/movie/${movie.id}`}
                className="poster-link"
                aria-label={`View ${movie.title}`}
            >
                {image ? (
                    <img
                        className="poster"
                        src={image}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                    />
                ) : (
                    <div className="poster poster-empty">
                        <Film size={36} />
                    </div>
                )}
                <span className="rating">
          <Star size={12} fill="currentColor" />{" "}
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
        </span>
            </Link>
            <button
                className={`save-button ${saved ? "is-saved" : ""}`}
                aria-label={
                    saved
                        ? `Remove ${movie.title} from watchlist`
                        : `Add ${movie.title} to watchlist`
                }
                onClick={onToggle}
            >
                {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
            </button>
            <div className="movie-meta">
                <Link to={`/movie/${movie.id}`} className="movie-title">
                    {movie.title}
                </Link>
                <div className="movie-subtitle">
                    {movie.release_date?.slice(0, 4) || "Coming soon"} <span>·</span>{" "}
                    {movie.original_language?.toUpperCase() || "—"}
                </div>
                {genreNames.length > 0 && (
                    <div className="card-genres">
                        {genreNames.slice(0, 2).map((name) => (
                            <Badge key={name} variant="secondary">
                                {name}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}