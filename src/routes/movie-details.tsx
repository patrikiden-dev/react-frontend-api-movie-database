
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {getMovie} from "@/features/movies/api.ts";
import Notice from "@/features/movies/components/movie-notis.tsx";
import {movieImages} from "@/lib/tmdb-images";
import {useWatchlist} from "@/features/watchlist/hooks.ts";



export default function MovieDetailPage() {

    const { saved, toggle } = useWatchlist();

    const { id } = useParams();

    const navigate = useNavigate();

    const language = localStorage.getItem("movievault-locale") || "en-US";

    const query = useQuery({
        queryKey: ["movie", id, language],
        queryFn: () => getMovie(Number(id), language),
        enabled: !!id,
    });

    if (query.isError)
        return (
            <main className="section-wrap inner-page">
                <Notice
                    message={(query.error as Error).message}
                    retry={() => query.refetch()}
                />
                <button className="text-button" onClick={() => navigate(-1)}>
                    Go back
                </button>
            </main>
        );

    if (query.isPending)
        return (
            <main className="section-wrap inner-page">
                <div className="detail-loading" />
            </main>
        );

    const movie = query.data;

    const backdrop = movieImages.backdrop(movie.backdrop_path);

    return (
        <main className="detail-page">
            <div
                className="detail-backdrop"
                style={
                    backdrop
                        ? {
                            backgroundImage: `linear-gradient(90deg, oklch(17.16% 0.0097 255.7) 4%, rgba(13,16,20,.82) 48%, rgba(13,16,20,.3)), linear-gradient(0deg, oklch(17.16% 0.0097 255.7) 0%, transparent 50%), url(${backdrop})`,
                        }
                        : undefined
                }
            />
            <div className="detail-content section-wrap">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back to discovery
                </button>
                <div className="detail-layout">
                    {movie.poster_path && (
                        <img
                            className="detail-poster"
                            src={movieImages.poster(movie.poster_path) || ""}
                            alt={`${movie.title} poster`}
                        />
                    )}
                    <div className="detail-copy">
                        <div className="section-kicker">MOVIEVAULT PICK</div>
                        <h1>{movie.title}</h1>
                        <div className="detail-stats">
              <span>
                <Star size={15} fill="currentColor" />{" "}
                  {movie.vote_average.toFixed(1)} <small>/ 10</small>
              </span>
                            <span>{movie.release_date?.slice(0, 4)}</span>
                            {movie.runtime && (
                                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
                            )}
                        </div>
                        <div className="detail-genres">
                            {(movie.genres || []).map((genre) => (
                                <Badge variant="secondary" key={genre.id}>
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>
                        <p className="detail-overview">
                            {movie.overview || "No synopsis available yet."}
                        </p>
                        <button
                            className={`watchlist-cta ${saved.includes(movie.id) ? "saved" : ""}`}
                            onClick={() => toggle(movie.id)}
                        >
                            {saved.includes(movie.id) ? (
                                <BookmarkCheck size={17} />
                            ) : (
                                <Bookmark size={17} />
                            )}{" "}
                            {saved.includes(movie.id)
                                ? "In your watchlist"
                                : "Add to watchlist"}
                        </button>
                    </div>
                </div>
                {!!movie.cast?.length && (
                    <section className="cast-section">
                        <div className="section-kicker">THE PEOPLE BEHIND THE STORY</div>
                        <h2>Cast &amp; crew</h2>
                        <div className="cast-row">
                            {movie.cast.slice(0, 8).map((person) => (
                                <Link
                                    key={person.id}
                                    to={`/actor/${person.id}`}
                                    className="cast-card"
                                >
                                    {person.profile_path ? (
                                        <img
                                            src={movieImages.profile(person.profile_path) || ""}
                                            alt={person.name}
                                        />
                                    ) : (
                                        <div className="cast-placeholder">
                                            {person.name.slice(0, 1)}
                                        </div>
                                    )}
                                    <strong>{person.name}</strong>
                                    <span>
                    {person.character || person.known_for_department || "Cast"}
                  </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}


// src/routes/movie-details.tsx
/*
import { useParams } from "react-router";
import { MovieDetails, useMovie } from "@/features/movies";

export default function MovieDetailsPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const id = Number(movieId);
    const { data, isPending, isError } = useMovie(id);
    // ...
}
/*
// routes/movie-details.tsx

import { MovieDetails } from "@/features/movies";

export default function MovieDetailsPage() {
    return <MovieDetails />;
}

 */