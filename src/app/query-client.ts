import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

/**
 * TanStack Query automatically handles loading, errors and caching.
 *
 * Here, we create our QueryClient and inject the toast notifications into the cache layers.
 * We also use `defaultOptions` to disable local error callbacks in v5, as TanStack Query v5
 * has removed `onError` directly from `useQuery` (to enforce this specific pattern).
 *
 * refetchOnWindowFocus:     false,          - Disable automatic refetching on window focus
 * staleTime:               1000 * 15,      - 15 seconds, stale time
 * gcTime:                  1000 * 30,      - 30 seconds, garbage collection time
 * retry:                   2               - How many times it should retry before it gives an error
  */

/*
// Helper for extracting a readable error message
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return 'Ett oväntat fel inträffade. Försök igen senare.';
};
*/

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {

            /*
            // Valfritt: Ignorera toasts för specifika queries genom att använda meta-data
            if (query.meta?.errorMessage === false) return;

            const message = query.meta?.errorMessage as string || getErrorMessage(error);
            toast.error(`Kunde inte hämta data: ${message}`, {
                id: query.queryKey.join('-'), // Förhindrar duplicerade toasts för samma query
            });
            */

            // Only show toast on the first load failure (not on background refetches)
            if (query.state.data === undefined) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while fetching data";

                toast.add({
                    type: "error",
                    title: "Request failed",
                    description: message,
                });
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong while saving data";

            toast.add({
                type: "error",
                title: "Action failed",
                description: message,
            });
        },
    }),
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,       // 15 seconds, stale time
            gcTime: 1000 * 30,              // 30 seconds, garbage collection time
            refetchOnWindowFocus: false,    // Disable automatic refetching on window focus
        },
    },
});
