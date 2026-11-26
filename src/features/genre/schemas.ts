// src/features/genres/schemas.ts
import { z } from "zod";

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

export const GenresResponseSchema = z.object({
    genres: z.array(GenreSchema),
});
