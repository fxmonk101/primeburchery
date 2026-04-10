import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold mb-4">Articles</h1>
        <p className="text-muted-foreground">Articles coming soon.</p>
      </div>
    </div>
  );
}
