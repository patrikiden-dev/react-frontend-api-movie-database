import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { normalizeSearch, pageUrl, pageWindow } from "@/features/movies/utils";
import {searchMovies} from "@/features/movies/api.ts";
import Notice from "@/features/movies/components/movie-notis.tsx";
import MovieGrid from "@/features/movies/components/movie-grid.tsx";
import {useWatchlist} from "@/features/watchlist/hooks.ts";


export default function SearchPage() {

    const { saved, toggle } = useWatchlist();

    const [params, setParams] = useSearchParams();
    const queryText = normalizeSearch(params.get("q") || "");
    const language = params.get("language") || "en-US";
    const page = Math.max(1, Number(params.get("page")) || 1);
    const query = useQuery({
        queryKey: ["search", queryText, page, language],
        queryFn: () => searchMovies(queryText, page, language),
        enabled: !!queryText,
    });
    const changePage = (nextPage: number) => {
        const next = new URLSearchParams(params);
        next.set("page", String(nextPage));
        setParams(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const totalPages = query.data?.total_pages || 1;
    return (
        <main className="inner-page section-wrap">
            <div className="section-kicker">SEARCH RESULTS</div>
            <h1 className="page-title">
                {queryText ? (
                    <>
                        Results for <em>&ldquo;{queryText}&rdquo;</em>
                    </>
                ) : (
                    "Search movies"
                )}
            </h1>
            <p className="page-subtitle">
                {query.data
                    ? `${query.data.total_results.toLocaleString()} films found`
                    : "Search the MovieVault collection."}
            </p>
            {query.isError && (
                <Notice
                    message={(query.error as Error).message}
                    retry={() => query.refetch()}
                />
            )}{" "}
            {query.isPending && queryText ? (
                <div className="loading-grid">
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
                    empty={queryText ? "No matching films." : "Enter a title to begin."}
                />
            )}
            <div className="pagination">
        <span>
          Page <b>{page}</b> of {totalPages}
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
                        {pageWindow(page, totalPages).map((number) => (
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
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href={pageUrl(params, page + 1)}
                                aria-disabled={page >= totalPages}
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (page < totalPages) changePage(page + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    );
}

/*
// src/routes/search.tsx — search state lives in the URL
import { useSearchParams } from "react-router";

export default function SearchPage() {
    const [params, setParams] = useSearchParams();
    const query = params.get("q") ?? "";
    const page = Number(params.get("page") ?? 1);

    function onSearch(value: string) {
        setParams({ q: value, page: "1" });
    }
    // pass query/page into useSearchMovies(query, page)
}

 */