export default function Notice({ message, retry }: { message: string; retry: () => void }) {
    return (
        <div className="notice" role="alert">
            <div>
                <strong>Catalog unavailable</strong>
                <p>{message}</p>
            </div>
            <button className="text-button" onClick={retry}>
                Try again
            </button>
        </div>
    );
}