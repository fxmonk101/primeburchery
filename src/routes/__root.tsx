import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-heading text-crimson">404</h1>
        <h2 className="mt-4 text-xl font-semibold font-heading text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-crimson px-6 py-3 text-sm font-button font-medium text-crimson-foreground transition-colors hover:bg-crimson/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PrimeButchery — Premium Grain-Fed Meats" },
      { name: "description", content: "Shop chef-trusted, grain-fed gourmet meats. Farm-transparent sourcing, cold-chain delivery, and 100% satisfaction guarantee." },
      { property: "og:title", content: "PrimeButchery — Premium Grain-Fed Meats" },
      { property: "og:description", content: "Shop chef-trusted, grain-fed gourmet meats. Farm-transparent sourcing, cold-chain delivery, and 100% satisfaction guarantee." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "PrimeButchery — Premium Grain-Fed Meats" },
      { name: "twitter:description", content: "Shop chef-trusted, grain-fed gourmet meats. Farm-transparent sourcing, cold-chain delivery, and 100% satisfaction guarantee." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b01c7c5-a9ac-4976-a2dc-3b0594386375/id-preview-97bbaad1--c7f8bfa0-60fe-42fb-b446-532263ae21bf.lovable.app-1775768344122.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b01c7c5-a9ac-4976-a2dc-3b0594386375/id-preview-97bbaad1--c7f8bfa0-60fe-42fb-b446-532263ae21bf.lovable.app-1775768344122.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
