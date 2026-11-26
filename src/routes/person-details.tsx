import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import MovieGrid from "@/features/movies/components/movie-grid.tsx";
import type {Movie} from "@/features/movies/types.ts";
import {movieImages} from "@/lib/tmdb-images";
import Notice from "@/features/movies/components/movie-notis.tsx";
import {getPerson} from "@/features/persons/api.ts";


export default function PersonDetailPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const language = localStorage.getItem("movievault-locale") || "en-US";

    const query = useQuery({
        queryKey: ["actor", id, language],
        queryFn: () => getPerson(Number(id), language),
        enabled: !!id,
    });

    if (query.isError)
        return (
            <main className="section-wrap inner-page">
                <Notice
                    message={(query.error as Error).message}
                    retry={() => query.refetch()}
                />
            </main>
        );

    if (query.isPending)
        return (
            <main className="section-wrap inner-page">
                <div className="detail-loading" />
            </main>
        );

    const actor = query.data;

    return (
        <main className="inner-page section-wrap">
            <button className="back-button light-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
            </button>
            <section className="actor-profile">
                <div className="actor-photo">
                    {actor.profile_path ? (
                        <img
                            src={movieImages.profile(actor.profile_path) || ""}
                            alt={actor.name}
                        />
                    ) : (
                        <div className="cast-placeholder">{actor.name.slice(0, 1)}</div>
                    )}
                </div>
                <div>
                    <div className="section-kicker">
                        {actor.known_for_department || "CAST"}
                    </div>
                    <h1 className="page-title">{actor.name}</h1>
                    {actor.birthday && (
                        <p className="actor-facts">
                            {actor.birthday}
                            {actor.place_of_birth ? ` · ${actor.place_of_birth}` : ""}
                        </p>
                    )}
                    <p className="actor-bio">
                        {(actor.biography || "No biography available.").replace(
                            /\*([^*]+)\*/g,
                            "$1",
                        )}
                    </p>
                </div>
            </section>
            <div className="section-heading filmography-heading">
                <div>
                    <div className="section-kicker">ON SCREEN</div>
                    <h2>Known for</h2>
                </div>
            </div>
            <MovieGrid
                movies={actor.movies as Movie[]}
                saved={[]}
                toggle={() => {}}
                empty="No filmography available."
            />

        </main>
    );
}
