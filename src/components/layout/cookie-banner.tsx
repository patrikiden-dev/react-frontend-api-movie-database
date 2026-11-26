import { useState } from "react";
import {Link} from "react-router";

export default function CookieBanner() {
    const [visible, setVisible] = useState(
        () => !localStorage.getItem("movievault-cookies"),
    );
    const choose = (value: string) => {
        localStorage.setItem("movievault-cookies", value);
        setVisible(false);
    };
    if (!visible) return null;
    return (
        <aside className="cookie-banner" aria-label="Cookie preferences">
            <div>
                <strong>Your privacy matters</strong>
                <p>
                    We use local storage to remember your preferences.{" "}
                    <Link to="/privacy">Read our privacy policy</Link>.
                </p>
            </div>
            <div className="cookie-actions">
                <button onClick={() => choose("denied")}>Deny</button>
                <button className="cookie-accept" onClick={() => choose("accepted")}>
                    Accept
                </button>
            </div>
        </aside>
    );
}