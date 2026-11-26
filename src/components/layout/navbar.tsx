import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { Clapperboard, Search, X, Sun, Moon, Globe2 } from "lucide-react";
import { normalizeSearch } from "@/features/movies/utils";

/**
 * Navbar component
 *
 * @param param0
 * @param param0.watchCount
 * @constructor
 */
export default function Navbar({ watchCount }: { watchCount: number }) {

    const location = useLocation();

    const navigate = useNavigate();

    const [params] = useSearchParams();

    const [query, setQuery] = useState(params.get("q") || "");

    const [locale, setLocale] = useState(
        params.get("language") ||
        localStorage.getItem("movievault-locale") ||
        "en-US",
    );

    const [dark, setDark] = useState(
        localStorage.getItem("movievault-theme") === "dark",
    );

    const searchInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        document.documentElement.style.colorScheme = dark ? "dark" : "light";
        localStorage.setItem("movievault-theme", dark ? "dark" : "light");
    }, [dark]);

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                searchInput.current?.focus();
            }
        };
        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, []);

    useEffect(() => {
        localStorage.setItem("movievault-locale", locale);
    }, [locale]);

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        const normalized = normalizeSearch(query);
        if (normalized)
            navigate(
                `/search?q=${encodeURIComponent(normalized)}&language=${locale}`,
            );
    };

    return (
        <header className="topbar">
            <Link className="brand" to="/" aria-label="MovieVault home">
        <span className="brand-icon">
          <Clapperboard />
        </span>
                <span className="brand-movie">
          Movie<span className="brand-light">Vault</span>
        </span>
            </Link>
            <nav className="nav-links" aria-label="Main navigation">
                <Link className={location.pathname === "/" ? "active" : ""} to="/">
                    Discover
                </Link>
                <Link
                    className={location.pathname === "/watchlist" ? "active" : ""}
                    to="/watchlist"
                >
                    Watchlist <span className="count">{watchCount}</span>
                </Link>
            </nav>
            <form className="search-box" onSubmit={submit}>
                <Search size={17} aria-hidden="true" />
                <input
                    ref={searchInput}
                    aria-label="Search movies"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        className="clear-search"
                        type="button"
                        aria-label="Clear search"
                        onClick={() => setQuery("")}
                    >
                        <X size={14} />
                    </button>
                )}
                <kbd>⌘ K</kbd>
            </form>
            <div className="nav-tools">
                <label className="locale-control">
                    <Globe2 size={14} />
                    <select
                        aria-label="Language"
                        value={locale}
                        onChange={(e) => {
                            const nextLocale = e.target.value;
                            setLocale(nextLocale);
                            const next = new URLSearchParams(location.search);
                            next.set("language", nextLocale);
                            navigate(`${location.pathname}?${next.toString()}`);
                        }}
                    >
                        <option value="en-US">EN</option>
                        <option value="sv-SE">SV</option>
                    </select>
                </label>
                <button
                    className="theme-toggle"
                    onClick={() => setDark(!dark)}
                    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>
        </header>
    );
}
