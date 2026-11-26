// src/features/watchlist/context.ts   (rename from context.tsx, it has no JSX)
import { createContext } from "react";

export interface WatchlistContextValue {
    saved: number[];
    toggle: (id: number) => void;
}

export const WatchlistContext = createContext<WatchlistContextValue | null>(null);