import { Link } from "react-router";
import { Clapperboard } from "lucide-react";
import tmdb from "@/assets/tmdb.svg";


export default function Footer() {
    return (
        <footer className="footer">
            <Link className="brand footer-brand" to="/">
        <span className="brand-icon">
          <Clapperboard />
        </span>
                <span className="brand-movie">
          Movie<span className="brand-light">Vault</span>
        </span>
            </Link>
            <p>© {new Date().getFullYear()} MovieVault</p>
            <a
                className="tmdb-credit"
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
            >
                <img src={tmdb} alt="TMDB logo" className="h-auto w-24" />
                <span>
          This application uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </span>
            </a>
        </footer>
    );
}
/*
export function Footer() {
    return (
        <footer className="w-full border-t">
            <div className="mx-auto grid w-full max-w-8xl grid-cols-2 items-center gap-x-8 gap-y-4 px-4 py-8 sm:px-6">
                <Link
                    to="/"
                    className="col-start-1 row-start-1 flex items-center gap-2 text-xl font-bold"
                >
                    <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-white shadow-sm">
                        <Clapperboard className="size-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold">Moviedex</span>
                </Link>

                <p className="col-start-1 row-start-2 justify-self-start text-left text-sm text-muted-foreground">
                    {`© ${new Date().getFullYear()} Moviedex`}
                </p>

                <div className="col-start-2 row-start-1 flex justify-end">
                    <img src={tmdb} alt="TMDB logo" className="h-auto w-24" />
                </div>

                <p className="col-start-2 row-start-2 text-right text-sm text-muted-foreground">
                    This application uses TMDB and the TMDB APIs but is not
                    endorsed, certified, or otherwise approved by TMDB.
                </p>
            </div>
        </footer>
    );
}

 */