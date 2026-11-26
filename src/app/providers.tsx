import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "./query-client";
import {WatchlistProvider} from "@/features/watchlist/providers.tsx";


/**
 * Render <BrowserRouter> together with Providers around the Application
 *
 * Important: Package is react-router. react-router-dom was removed in v8
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <WatchlistProvider>{children}</WatchlistProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}