import { createFileRoute } from "@tanstack/react-router";
import { Brand } from "../components/Brand";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [
    { title: "Impressum | MITTRAGEN" },
    { name: "description", content: "Impressum von MITTRAGEN – Studio kokoa, Claudia Kreft, Erfurt." },
  ] }),
  component: Impressum,
});

function Impressum() {
  return <div className="min-h-screen bg-[#faf7f0] text-[#162639]">
    <header className="border-b border-[#e7dfd4]"><div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6"><Brand href="/" /><a href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#c94e28]"><ArrowLeft size={16}/> Zur Startseite</a></div></header>
    <main className="mx-auto max-w-3xl space-y-9 px-6 py-16 text-sm leading-7 md:text-base">
      <h1 className="text-4xl font-medium">Impressum</h1>
      <section><h2 className="mb-3 text-xl font-medium">Angaben gemäß § 5 DDG</h2><p>Studio kokoa<br/>Claudia Kreft<br/>Cyriakstraße 39<br/>99094 Erfurt</p></section>
      <section><h2 className="mb-3 text-xl font-medium">Kontaktdaten</h2><dl className="space-y-3"><div><dt className="font-medium">E-Mail</dt><dd><a href="mailto:kontakt@flottiki.de" className="underline underline-offset-4">kontakt@flottiki.de</a></dd></div><div><dt className="font-medium">Telefon</dt><dd><a href="tel:+4917681081338" className="underline underline-offset-4">0176 81081338</a></dd></div><div><dt className="font-medium">Adresse</dt><dd>Studio kokoa · Claudia Kreft<br/>Cyriakstraße 39<br/>99094 Erfurt</dd></div></dl></section>
      <section><h2 className="mb-3 text-xl font-medium">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>Claudia Kreft<br/>Cyriakstraße 39<br/>99094 Erfurt</p></section>
      <section><h2 className="mb-3 text-xl font-medium">Verbraucherstreitbeilegung</h2><p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>
      <section><h2 className="mb-3 text-xl font-medium">Haftung für Inhalte und Links</h2><p>Die Inhalte dieser Seite wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine Gewähr übernehmen. Diese Seite enthält Links zu externen Webseiten Dritter (z. B. flottiki.de, mhezo.de). Auf deren Inhalte habe ich keinen Einfluss; dafür ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entferne ich solche Links umgehend.</p></section>
      <section><h2 className="mb-3 text-xl font-medium">Urheberrecht</h2><p>Texte, Fotos und Illustrationen auf dieser Seite – insbesondere aus dem Buch „T-Rex Tintenklecks“ – unterliegen dem deutschen Urheberrecht. Jede Verwendung außerhalb der Grenzen des Urheberrechts bedarf meiner schriftlichen Zustimmung.</p></section>
    </main>
    <footer className="border-t border-[#e7dfd4] px-6 py-8 text-center text-xs text-[#596371]">MITTRAGEN · © {new Date().getFullYear()}</footer>
  </div>;
}