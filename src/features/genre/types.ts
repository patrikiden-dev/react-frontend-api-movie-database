import type { infer as Infer } from "zod";

import type { GenreSchema } from "./schemas";
export type Genre = Infer<typeof GenreSchema>;