import { z } from "zod";

export const paginated = <T extends z.ZodType>(item: T) =>
    z.object({
        page: z.number(),
        results: z.array(item),
        total_pages: z.number(),
        total_results: z.number(),
    });