import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QueryErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function QueryError({
                               title = "Something went wrong",
                               message = "Failed to load data. Please try again.",
                               onRetry,
                           }: QueryErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-6 text-destructive" />
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>

            {onRetry && (
                <Button variant="outline" onClick={onRetry} className="mt-6">
                    Try again
                </Button>
            )}
        </div>
    );
}