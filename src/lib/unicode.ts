/**
 * Function to normalize strings, arrays and objects to NFC (Normalization Form Canonical Composition)
 *
 */
export const nfc = <T>(value: T): T => {
    if (typeof value === "string") return value.normalize("NFC") as T;
    if (Array.isArray(value)) return value.map((item) => nfc(item)) as T;
    if (value && typeof value === "object")
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, nfc(item)]),
        ) as T;
    return value;
};

/**
 * Normalize Strings: for individual user-entered strings
 * @param value
 */
export function normalizeNFC(value: string): string {
    return value.normalize("NFC");
}

/**
 * Normalize Objects: only at external-data boundaries (LocalStorage, imported JSON, third-party user content)
 * @param value
 */
export function deepNormalize<T>(value: T): T {
    if (typeof value === "string") {
        return value.normalize("NFC") as T;
    }

    if (Array.isArray(value)) {
        return value.map(deepNormalize) as T;
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [
                key,
                deepNormalize(val),
            ]),
        ) as T;
    }

    return value;
}