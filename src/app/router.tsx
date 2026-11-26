import {Route, Routes } from "react-router";
import PrivacyPage from "@/routes/privacy.tsx";
import SearchPage from "@/routes/search.tsx";
import WatchlistPage from "@/routes/watch-list.tsx";
import MovieDetailPage from "@/routes/movie-details.tsx";
import HomePage from "@/routes";
import RootLayout from "@/components/layout/root-layout.tsx";
import NotFoundPage from "@/routes/not-found.tsx";
import PersonDetailPage from "@/routes/person-details.tsx";

/**
 * Defining routes
 *
 */
export default function AppRouter() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="watchlist" element={<WatchlistPage />} />
                <Route path="movie/:id" element={<MovieDetailPage />} />
                <Route path="person/:id" element={<PersonDetailPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}