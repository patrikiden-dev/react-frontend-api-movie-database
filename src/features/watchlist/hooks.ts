// src/features/watchlist/hooks.ts
import { useContext } from "react";
import { WatchlistContext } from "./context";

export function useWatchlist() {
    const ctx = useContext(WatchlistContext);
    if (!ctx) {
        throw new Error("useWatchlist must be used inside <WatchlistProvider>");
    }
    return ctx;
}