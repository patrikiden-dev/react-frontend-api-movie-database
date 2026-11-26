// src/features/watchlist/watchlist-provider.tsx   (components only)
import { useCallback, useEffect, useMemo, useState } from "react";
import { WatchlistContext } from "./context";

const STORAGE_KEY = "movievault-watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const [saved, setSaved] = useState<number[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }, [saved]);

    const toggle = useCallback((id: number) => {
        setSaved((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    }, []);

    const value = useMemo(() => ({ saved, toggle }), [saved, toggle]);

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
}