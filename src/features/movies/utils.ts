import { z } from "zod";

export const searchSchema = z
    .string()
    .transform((text) => text.normalize("NFC").trim())
    .pipe(z.string().max(100));

export const normalizeSearch = (value: string) => {
    const parsed = searchSchema.safeParse(value);
    return parsed.success ? parsed.data : "";
};

export const pageUrl = (params: URLSearchParams, page: number) => {
    const next = new URLSearchParams(params);
    next.set("page", String(page));
    return `?${next.toString()}`;
};

export const pageWindow = (current: number, total: number) => {
    const count = Math.min(6, total);
    const start = Math.max(1, Math.min(current - 2, total - count + 1));
    return Array.from({ length: count }, (_, index) => start + index);
};
