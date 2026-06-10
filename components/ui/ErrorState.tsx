import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
        <span className="text-sand-600 text-xl">!</span>
      </div>
      <h3 className="font-display text-xl text-charcoal-800">{title}</h3>
      <p className="text-charcoal-500 font-body text-sm max-w-sm">{message}</p>
      {retry && (
        <Button variant="outline" size="sm" onClick={retry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
