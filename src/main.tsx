import "@fontsource/inter";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/jetbrains-mono";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "@/app/providers";
import AppRouter from "@/app/router";
import "./index.css";

/**
 * Init the React project
 */
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Providers>
            <AppRouter />
        </Providers>
    </StrictMode>,
);

/*
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

// import React from "react";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 60_000, retry: 1 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
*/

/*
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/providers/ThemeProvider.tsx";
import { routes } from '@/routes.tsx'
import "@/index.css";
import "@/lib/validation/env";
import {LanguageProvider} from "@/providers/LanguageProvider.tsx";
import { Toaster } from "@/components/ui/toast";

**
 * TanStack Query Client
 * efetchOnWindowFocus:     false,          - Disable automatic refetching on window focus
 * staleTime:               1000 * 15,      - 15 seconds, stale time
 * gcTime:                  1000 * 30,      - 30 seconds, garbage collection time

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,    // Disable automatic refetching on window focus
            staleTime: 1000 * 15,           // 15 seconds, stale time
            gcTime: 1000 * 30,              // 30 seconds, garbage collection time
        },
    },
});


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <ThemeProvider>
                    <RouterProvider router={routes} />
                    <Toaster />
                </ThemeProvider>
            </LanguageProvider>
        </QueryClientProvider>
    </StrictMode>,
);
*/