import { useMemo } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import {getMovie} from "@/features/movies/api.ts";
import Notice from "@/features/movies/components/movie-notis.tsx";
import MovieGrid from "@/features/movies/components/movie-grid.tsx";
import type {Movie} from "@/features/movies/types.ts";
import {useWatchlist} from "@/features/watchlist/hooks.ts";


export default function WatchlistPage() {

    const { saved, toggle } = useWatchlist();

    const language = localStorage.getItem("movievault-locale") || "en-US";

    const ids = useMemo(() => [...saved].sort((a, b) => a - b), [saved]);

    const query = useQuery({
        queryKey: ["watchlist", ids, language],
        queryFn: async () => Promise.all(ids.map((id) => getMovie(id, language))),
        enabled: ids.length > 0,
    });

    return (
        <main className="inner-page section-wrap">
            <div className="section-kicker">YOUR PERSONAL COLLECTION</div>
            <h1 className="page-title">
                My <em>watchlist.</em>
            </h1>
            <p className="page-subtitle">
                {saved.length
                    ? `${saved.length} ${saved.length === 1 ? "film" : "films"} saved for later`
                    : "A little inspiration for your next movie night."}
            </p>
            {query.isError && (
                <Notice
                    message={(query.error as Error).message}
                    retry={() => query.refetch()}
                />
            )}{" "}
            {query.isPending && ids.length > 0 ? (
                <div className="loading-grid">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div className="skeleton" key={i}>
                            <div />
                            <span />
                            <span />
                        </div>
                    ))}
                </div>
            ) : (
                <MovieGrid
                    movies={(query.data || []) as Movie[]}
                    saved={saved}
                    toggle={toggle}
                    empty="Your watchlist is waiting."
                />
            )}
            <div className="back-row">
                <Link to="/">
                    <ArrowLeft size={15} /> Discover more films
                </Link>
            </div>

        </main>
    );
}
