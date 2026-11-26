import { Outlet } from "react-router";
import Navbar from "@/components/layout/navbar.tsx";
import Footer from "@/components/layout/footer.tsx";
import CookieBanner from "@/components/layout/cookie-banner.tsx";
import {useWatchlist} from "@/features/watchlist/hooks.ts";


/**
 * Layout route with <Outlet /> is the key pattern
 * The layout route has no path, so it only wraps its children. The child pages render where <Outlet /> sits
 */
export default function RootLayout() {

    const { saved } = useWatchlist();

    return (
        <>
            <Navbar watchCount={saved.length} />
            <Outlet />
            <Footer />
            <CookieBanner />
        </>
    );
}
