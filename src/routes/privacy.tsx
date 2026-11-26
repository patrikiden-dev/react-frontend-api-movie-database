import { useState } from "react";

/**
 * Privacy Page
 */
export default function PrivacyPage() {
    const [choice, setChoice] = useState(
        localStorage.getItem("movievault-cookies"),
    );
    return (
        <main className="inner-page section-wrap privacy-page">
            <div className="section-kicker">MOVIEVAULT</div>
            <h1 className="page-title">
                Privacy <em>policy.</em>
            </h1>
            <p className="page-subtitle">
                A clear, simple overview of how this demo handles your preferences.
            </p>
            <section>
                <h2>Local preferences</h2>
                <p>
                    Your watchlist and display preferences are stored in your browser so
                    they remain available on your next visit. No account is required.
                </p>
                <h2>Movie data</h2>
                <p>
                    Movie titles, images, credits, ratings, and related information are
                    provided by The Movie Database (TMDB) through its public API.
                </p>
                <h2>Cookies and choices</h2>
                <p>
                    This demo uses local browser storage for essential preferences. You
                    can change your cookie choice below at any time.
                </p>
                <div className="privacy-choice">
                    Current choice: <strong>{choice || "Not set"}</strong>
                    <button
                        className="text-button"
                        onClick={() => {
                            localStorage.removeItem("movievault-cookies");
                            setChoice(null);
                        }}
                    >
                        Reset choice
                    </button>
                </div>
            </section>
        </main>
    );
}
