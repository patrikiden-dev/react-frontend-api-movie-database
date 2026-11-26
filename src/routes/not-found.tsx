import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center space-y-6">

                {/* Subtle Icon Badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground">
                    <Compass className="h-6 w-6 stroke-[1.5]" />
                </div>

                {/* Typography */}
                <div className="space-y-2">
                    <p className="font-mono text-sm font-medium tracking-wider text-muted-foreground uppercase">
                        404 Error
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Page not found
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or deleted.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go back
                    </Button>

                    <Button className="gap-2">
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Back to home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}