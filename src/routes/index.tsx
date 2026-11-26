import { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { categories } from "@/features/movies/constants";
import {pageUrl, pageWindow} from "@/features/movies/utils.ts";
import MovieGrid from "@/features/movies/components/movie-grid.tsx";
import Notice from "@/features/movies/components/movie-notis.tsx";
import {getGenres, getMovies} from "@/features/movies/api.ts";
import {useWatchlist} from "@/features/watchlist/hooks.ts";


export default function HomePage() {

    const { saved, toggle } = useWatchlist();

    const [params, setParams] = useSearchParams();

    const [genre, setGenre] = useState(params.get("genre") || "All");

    const [page, setPage] = useState(Number(params.get("page")) || 1);

    const category =
        categories.find((item) => item.id === params.get("category")) ||
        categories[0];

    const language =
        params.get("language") ||
        localStorage.getItem("movievault-locale") ||
        "en-US";

    const genreQuery = useQuery({
        queryKey: ["genres", language],
        queryFn: () => getGenres(language),
    });

    const genreId = genreQuery.data?.find((item) => item.name === genre)?.id;

    const query = useQuery({
        queryKey: ["movies", category.id, genre, genreId, page, language],
        queryFn: () =>
            getMovies(genre === "All" ? category.endpoint : "/discover/movie", page, {
                ...(genreId === undefined ? {} : { with_genres: genreId }),
                language,
            }),
        enabled: genre === "All" || !!genreQuery.data,
    });

    const selectCategory = (id: string) => {
        const next = new URLSearchParams(params);
        next.set("category", id);
        next.set("page", "1");
        setParams(next);
        setPage(1);
    };

    const selectGenre = (value: string) => {
        setGenre(value);
        const next = new URLSearchParams(params);
        value === "All" ? next.delete("genre") : next.set("genre", value);
        next.set("page", "1");
        setParams(next);
        setPage(1);
    };

    const changePage = (nextPage: number) => {
        setPage(nextPage);
        const next = new URLSearchParams(params);
        next.set("page", String(nextPage));
        setParams(next);
        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    };

    const title = category.id === "now_playing" ? "Now playing" : category.label;

    return (
        <main>
            <section className="hero">
                <div className="hero-image" />
                <div className="hero-content">
                    <div className="eyebrow">
                        <span className="eyebrow-line" /> YOUR NEXT FAVORITE FILM
                    </div>
                    <h1>
                        Stories worth
                        <br />
                        <em>staying in for.</em>
                    </h1>
                    <p>
                        Discover the films everyone&apos;s talking about — and find the ones
                        you&apos;ll never forget.
                    </p>
                    <a className="hero-cta" href="#catalog">
                        Explore movies <ChevronRight size={16} />
                    </a>
                    <div className="hero-bottom">
            <span>
              <i className="live-dot" /> Curated for movie lovers
            </span>
                        <span>
              01 <span className="hero-divider">/</span> 04
            </span>
                    </div>
                </div>
            </section>
            <section className="catalog section-wrap" id="catalog">
                <div className="section-heading">
                    <div>
                        <div className="section-kicker">THE COLLECTION</div>
                        <h2>{title}</h2>
                    </div>
                    <div className="catalog-note">
                        <span className="live-dot" /> Updated daily
                    </div>
                </div>
                <div
                    className="category-tabs"
                    role="tablist"
                    aria-label="Movie category"
                >
                    {categories.map((item) => (
                        <button
                            key={item.id}
                            role="tab"
                            aria-selected={category.id === item.id}
                            className={`category-tab ${category.id === item.id ? "selected" : ""}`}
                            onClick={() => selectCategory(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <div className="genre-row" role="group" aria-label="Filter by genre">
                    <button
                        className={`genre-chip ${genre === "All" ? "selected" : ""}`}
                        onClick={() => selectGenre("All")}
                    >
                        All genres
                    </button>
                    {(genreQuery.data || []).map((item) => (
                        <button
                            key={item.id}
                            className={`genre-chip ${genre === item.name ? "selected" : ""}`}
                            onClick={() => selectGenre(item.name)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                {query.isError && (
                    <Notice
                        message={(query.error as Error).message}
                        retry={() => query.refetch()}
                    />
                )}
                {query.isPending ? (
                    <div className="loading-grid" aria-label="Loading movies">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div className="skeleton" key={i}>
                                <div />
                                <span />
                                <span />
                            </div>
                        ))}
                    </div>
                ) : (
                    <MovieGrid
                        movies={query.data?.results || []}
                        saved={saved}
                        toggle={toggle}
                    />
                )}
                {!query.isError && (
                    <div className="pagination">
            <span>
              Page <b>{page}</b> of {query.data?.total_pages || 1}
            </span>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={pageUrl(params, Math.max(1, page - 1))}
                                        aria-disabled={page <= 1}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            if (page > 1) changePage(page - 1);
                                        }}
                                    />
                                </PaginationItem>
                                {pageWindow(page, query.data?.total_pages || 1).map(
                                    (number) => (
                                        <PaginationItem key={number}>
                                            <PaginationLink
                                                href={pageUrl(params, number)}
                                                isActive={page === number}
                                                aria-label={`Page ${number}`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    changePage(number);
                                                }}
                                            >
                                                {number}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ),
                                )}
                                {(query.data?.total_pages || 1) > 6 &&
                                    page < (query.data?.total_pages || 1) - 3 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                <PaginationItem>
                                    <PaginationNext
                                        href={pageUrl(params, page + 1)}
                                        aria-disabled={page >= (query.data?.total_pages || 1)}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            if (page < (query.data?.total_pages || 1))
                                                changePage(page + 1);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </section>
        </main>
    );
}
