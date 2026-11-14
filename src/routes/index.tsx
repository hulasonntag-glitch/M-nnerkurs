import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Männerkurs" },
      { name: "description", content: "Männerkurs" },
      { property: "og:title", content: "Männerkurs" },
      { property: "og:description", content: "Männerkurs" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold text-foreground">Männerkurs</h1>
    </main>
  );
}
