import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/articles/$slug')({
  component: ArticlePage,
  head: ({ params }) => ({
    meta: [
      { title: `Article: ${params.slug} — PrimeButchery` },
    ],
  }),
});

function ArticlePage() {
  const { slug } = Route.useParams();
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold mb-4">Article: {slug}</h1>
        <p className="text-muted-foreground">Article content coming soon.</p>
      </div>
    </div>
  );
}
