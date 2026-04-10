import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tracking')({
  component: TrackingPage,
});

function TrackingPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Order Tracking</h1>
        <p className="text-muted-foreground">Please visit our <a href="/track-order" className="text-crimson hover:underline font-semibold">Track Order page</a> for order tracking.</p>
      </div>
    </div>
  );
}
