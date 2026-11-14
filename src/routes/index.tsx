import { createFileRoute } from "@tanstack/react-router";
import { Brand } from "../components/Brand";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Heart, Menu, X, MessageCircle, ClipboardList, Compass, Brain, HandHeart, House, Baby, Sun } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MITTRAGEN – Der Männerkurs für werdende Väter" },
      { name: "description", content: "Sie trägt euer Kind. Du trägst den Rest. Für werdende und frischgebackene Väter, die Verantwortung übernehmen wollen. Nicht irgendwann. Von Anfang an." },
      { property: "og:title", content: "MITTRAGEN – Sie trägt euer Kind. Du trägst den Rest." },
      { property: "og:description", content: "Weniger fragen. Mehr sehen. Gemeinsam tragen." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const moduleCards = [
  ["01","Schwangerschaft verstehen","Was sich verändert. Und was das für euch bedeutet."],
  ["02","Mental Load übernehmen","Nicht nur erledigen. Auch daran denken."],
  ["03","Geburt: dein Platz","Präsent sein, auch wenn du nicht alles kontrollieren kannst."],
  ["04","Das Wochenbett","Einen geschützten Anfang möglich machen."],
  ["05","Baby-Alltag in der Praxis","Vertrauen entsteht, wenn du selbst ins Tun kommst."],
  ["06","Raum für sie","Sie ist Mutter. Und immer noch sie selbst."],
];

const contrasts = [
  ["Fragt: „Was soll ich machen?“","Sieht, was ansteht. Und übernimmt."],
  ["Erledigt einzelne Aufgaben.","Trägt ganze Verantwortungsbereiche."],
  ["Wartet auf eine Anleitung.","Informiert sich und denkt voraus."],
  ["„Ich passe heute auf das Baby auf.“","„Ich bin Vater. Das ist auch mein Alltag.“"],
  ["Gibt ihr eine Pause, wenn sie fragt.","Schafft Raum, ohne dass sie darum bitten muss."],
];

const faqs = [
  ["Für wen ist MITTRAGEN gedacht?","Für werdende und frischgebackene Väter, die ihre Rolle als Partner und Vater bewusst gestalten und im Alltag Verantwortung übernehmen möchten."],
  ["Kann ich den Kurs schon buchen?","Noch nicht. Die Kursvarianten sind in Vorbereitung. Die vorhandene Beta-Fassung kannst du bereits kostenlos und ohne Anmeldung testen."],
  ["Wie lange dauert der Kurs und wie findet er statt?","Dauer, Format und konkrete Umsetzung sind noch in Vorbereitung und werden vor dem Kursstart veröffentlicht."],
  ["Ist der Kurs auch sinnvoll, wenn unser Baby schon da ist?","Ja. MITTRAGEN richtet sich auch an frischgebackene Väter. Besonders Wochenbett, Baby-Alltag und gemeinsame Verantwortung sind dann relevant."],
  ["Kann ich MITTRAGEN verschenken?","Eine persönliche Karte als Geschenkidee ist möglich; Gutscheinkauf und einlösbare Gutscheine sind noch nicht verfügbar."],
  ["Ersetzt MITTRAGEN einen Geburtsvorbereitungskurs?","Nein. MITTRAGEN ergänzt die Vorbereitung mit dem Fokus auf Verantwortung im gemeinsamen Alltag. Es ersetzt weder medizinische Beratung noch einen Geburtsvorbereitungskurs."],
  ["Was unterscheidet die drei Kursvarianten?","Selbstlerner ist für eigenständiges Lernen geplant, Begleitet soll Raum für Austausch bieten und Premium 1:1 individuelle Begleitung ermöglichen. Die Angebote sind noch nicht verbindlich festgelegt."],
];

function Highlight({children}:{children:React.ReactNode}) { return <span className="text-[#c94e28]">{children}</span>; }
function Overline({children}:{children:React.ReactNode}) { return <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.20em] text-[#c94e28]">{children}</p>; }
function Cta({children,href="/kurs",quiet=false}:{children:React.ReactNode;href?:string;quiet?:boolean}) { return <a href={href} className={`inline-flex min-h-11 items-center justify-between gap-5 px-5 py-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c94e28] ${quiet?"bg-[#eee8df] text-[#162639] hover:bg-[#e0d9cd]":"bg-[#c94e28] text-white hover:bg-[#a83f21]"}`}>{children}<ArrowRight size={15}/></a>; }

function HomePage() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [openFaq,setOpenFaq] = useState<number|null>(null);
  const links = [["#problem","Der Gedanke"],["#kurs","Der Kurs"],["/kurs#inhaltsverzeichnis","Inhaltsverzeichnis"],["#ablauf","Ablauf"],["#verschenken","Verschenken"],["#faq","FAQ"]];
  return <div className="mittragen-home screenshot-match min-h-screen bg-[#faf7f0] font-sans text-[#162639]">

    <header className="relative z-20 border-b border-[#e7dfd4] bg-[#faf7f0]">
      <div className="mx-auto flex h-[62px] max-w-6xl items-center justify-between px-5 sm:px-6 lg:h-16 lg:px-8">
        <Brand href="/" />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 md:flex">{links.map(([href,text])=><a key={href} href={href} className="text-xs font-semibold hover:text-[#c94e28]">{text}</a>)}</nav>
        <a href="/kurs#inhaltsverzeichnis" className="hidden items-center gap-4 bg-[#162639] px-5 py-3 text-[11px] font-medium text-white md:inline-flex">Inhaltsverzeichnis <ArrowRight size={14}/></a>
        <button type="button" className="p-2 md:hidden" aria-label={menuOpen?"Menü schließen":"Menü öffnen"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
      {menuOpen&&<nav aria-label="Mobile Navigation" className="flex flex-col border-t border-[#e7dfd4] bg-[#faf7f0] px-6 py-3 md:hidden">{[...links,["/kurs","Zum Kurs"]].map(([href,text])=><a key={href} href={href} onClick={()=>setMenuOpen(false)} className="px-2 py-3 text-sm font-semibold">{text}</a>)}</nav>}
    </header>
    <main>
      <section className="relative isolate overflow-hidden bg-[#faf7f0] lg:min-h-[735px] lg:bg-[#eee6d9]">
        {/* Auf kleinen Bildschirmen bekommt das Foto eine eigene Fläche, damit kein Text darüberliegt. */}
        <div className="relative h-[235px] w-full overflow-hidden sm:h-[320px] lg:hidden">
          <img src="/Header_Paar_Sofa.png" alt="Werdende Eltern gemeinsam auf dem Sofa" className="h-full w-full object-cover object-[67%_45%]" fetchPriority="high" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#faf7f0] to-transparent" />
        </div>
        {/* Auf großen Bildschirmen bleibt der großzügige Foto-Hero aus der Vorlage erhalten. */}
        <div className="absolute inset-0 z-10 hidden bg-[linear-gradient(90deg,#faf7f0_0%,rgba(250,247,240,.96)_25%,rgba(250,247,240,.52)_52%,rgba(250,247,240,.04)_80%)] lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-[75%] bg-cover bg-center lg:block" style={{backgroundImage:"url(/Header_Paar_Sofa.png)"}} role="img" aria-label="Werdende Eltern gemeinsam auf dem Sofa"/>
        <div className="relative z-10 mx-auto flex max-w-6xl items-center px-6 pb-13 pt-3 sm:px-9 sm:pb-16 sm:pt-5 lg:min-h-[735px] lg:px-8 lg:py-18">
          <div className="w-full max-w-[540px]">
            <p className="mb-4 inline-flex items-center gap-2 border border-[#dfd3c3] px-3 py-2 text-[10px] font-medium uppercase tracking-[.1em] text-[#162639] lg:mb-6"><span className="h-1.5 w-1.5 rounded-full bg-[#c94e28]"/> In Vorbereitung</p>
            <p className="mb-4 text-[11px] font-medium tracking-wide sm:mb-5">MITTRAGEN — DER MÄNNERKURS</p>
            <h1 className="max-w-[630px] text-[clamp(2.65rem,10.5vw,4.5rem)] font-semibold leading-[1.07] tracking-[-.045em] sm:tracking-[-.055em] lg:text-[clamp(3.3rem,5.1vw,5.2rem)] lg:leading-[1.02]">Sie trägt<br/>euer Kind.<br/><Highlight>Du trägst den<br/>Rest.</Highlight></h1>
            <p className="mt-5 max-w-[420px] text-[15px] leading-[1.7] text-[#344052] sm:mt-6 sm:leading-[1.85]">Für werdende und frischgebackene Väter,<br className="hidden sm:block"/> die Verantwortung übernehmen wollen.<br/>Nicht irgendwann. Von Anfang an.</p>
            <div className="mt-7"><Cta href="/kurs">Entdecke den Kurs</Cta></div>
          </div>
        </div>
        <a href="#problem" aria-label="Weiter zum nächsten Abschnitt" className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 rounded-full bg-white/90 p-2 shadow lg:block"><ChevronDown size={18}/></a>
      </section>
      <div className="bg-[#162639] px-6 py-4 text-center text-[11px] font-medium leading-5 text-white sm:text-xs">Kein perfekter Vater. <span className="mx-6 text-[#c94e28]">•</span><strong>Ein verlässlicher Partner.</strong><span className="mx-6 text-[#c94e28]">•</span> Ein gemeinsamer Anfang.</div>

      <section id="problem" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-23 lg:py-28">
        <Overline>Du meinst es gut.</Overline>
        <h2 className="text-3xl font-medium leading-[1.25] tracking-[-.04em] md:text-4xl">Du willst für sie da sein.<br/><span className="font-normal">Du weißt nur nicht genau, wie.</span></h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#58606a]">Du willst unterstützen. Aber zwischen guten Absichten und echter Entlastung liegt oft etwas, das niemand erklärt hat.</p>
        <div className="mt-15 grid gap-9 md:grid-cols-3">{[
          ["„Sag einfach, was ich tun soll.“","Klingt hilfsbereit. Doch das Sehen, Planen und Delegieren bleibt bei ihr."],
          ["„Ich mache doch schon so viel.“","Du erledigst Aufgaben. Sie behält trotzdem alles im Kopf – auch das, was noch fehlt."],
          ["„Ich will nichts falsch machen.“","Du wartest lieber ab. Dabei braucht sie keinen perfekten Plan, sondern einen Partner, der mitdenkt."]
        ].map(([title,body],i)=><article key={title}><span className="text-2xl font-light text-[#c94e28]">{[<MessageCircle size={25}/>,<ClipboardList size={25}/>,<Compass size={25}/>][i]}</span><h3 className="mt-4 text-sm font-medium">{title}</h3><p className="mt-3 text-xs leading-6 text-[#58606a]">{body}</p></article>)}</div>
        <p className="mt-10 text-sm">Du musst nicht alles wissen. <strong>Aber du kannst lernen, deinen Teil zu tragen.</strong></p>
      </section>

      <section className="bg-[#efe8dc] py-22"><div className="mx-auto grid max-w-5xl items-center gap-14 px-6 md:grid-cols-2">
        <div><img src="/Vater_mit_Baby.png" alt="Ein Vater hält sein schlafendes Neugeborenes liebevoll an seiner Brust." loading="lazy" className="aspect-[4/4.3] w-full object-cover" /></div>
        <div><Overline>Dabei sein ist der Anfang. Mittragen ist der Unterschied.</Overline><Overline>Stell dir vor …</Overline><h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Sie kann loslassen.<br/>Weil du <Highlight>mitträgst.</Highlight></h2>
        <p className="mt-6 text-sm leading-7 text-[#58606a]">Das Essen ist organisiert. Der nächste Termin steht im Kalender. Euer Baby ist bei dir. Und sie kann sich ausruhen – ohne vorher eine Liste zu schreiben.</p>
        <p className="mt-4 text-sm leading-7 text-[#58606a]">Nicht, weil sie dir alles erklärt hat. Sondern weil du siehst, was gebraucht wird. Und dich verantwortlich fühlst.</p>
        <p className="mt-5 border-l-2 border-[#c94e28] pl-4 text-sm leading-7">Mehr Raum für sie.<br/>Mehr Sicherheit für dich.<br/><strong>Mehr Wir für euch.</strong></p>
        <a href="#kurs" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#a84223] underline underline-offset-4">Genau hier setzt MITTRAGEN an <ArrowRight size={14}/></a></div>
      </div></section>

      <section id="haltung" className="scroll-mt-20 px-6 py-24"><div className="mx-auto max-w-3xl text-center"><Overline>Ein anderes Verständnis von Vaterschaft</Overline><h2 className="text-3xl font-medium tracking-[-.04em] md:text-4xl">Nicht helfen. <Highlight>Mittragen.</Highlight></h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#58606a]">Es geht nicht darum, mehr Aufgaben abzuhaken.<br/>Es geht darum, Verantwortung nicht bei ihr zu lassen.</p></div>
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden border border-[#e0d7cc] text-xs md:text-sm"><div className="grid grid-cols-2"><div className="bg-[#eeeae2] px-5 py-4 font-medium uppercase">Der Helfer</div><div className="bg-[#162639] px-5 py-4 font-medium uppercase text-white">Der Mitträger</div></div>{contrasts.map(([a,b])=><div key={a} className="grid grid-cols-2 border-t border-[#ddd6cd]"><div className="px-5 py-4 text-[#606873]">{a}</div><div className="bg-[#efe8dc] px-5 py-4"><Check className="mr-2 inline text-[#c94e28]" size={14}/>{b}</div></div>)}</div>
        <p className="mt-5 text-center text-xs text-[#757a80]">Keine Schubladen. Sondern eine Richtung, in die du wachsen kannst.</p>
      </section>

      <section id="kurs" className="scroll-mt-20 bg-[#162639] px-6 py-24 text-white"><div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Overline>Der Kurs · Sechs Themen, die zählen</Overline><h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Vom guten Vorsatz<br/>zum <Highlight>echten Mittragen.</Highlight></h2></div><p className="max-w-xs text-sm leading-7 text-white/75">Wissen, das Orientierung gibt.<br/>Impulse, die im Alltag ankommen.<br/>Für deine Rolle als Partner und Vater.</p></div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{moduleCards.map(([num,title,desc])=><a key={num} href="/kurs" className="min-h-[232px] border border-[#3c4b5d] bg-[#1b2b3f] p-6 transition-colors hover:border-[#c94e28]"><div className="flex items-center justify-between"><span className="text-[#c94e28]">{[<Heart size={25}/>,<Brain size={25}/>,<HandHeart size={25}/>,<House size={25}/>,<Baby size={25}/>,<Sun size={25}/>][Number(num)-1]}</span><span className="text-[10px] font-medium text-[#d9dce1]">MODUL {num}</span></div><h3 className="mt-7 text-base font-medium">{title}</h3><p className="mt-3 text-xs leading-6 text-white/75">{desc}</p></a>)}</div>
        <p className="mt-7 text-center text-xs leading-6 text-[#d8dce3]">Die inhaltliche Ausrichtung steht. Dauer, Format und konkrete Umsetzung sind noch in Vorbereitung.</p>
        <div className="mt-7 text-center"><Cta>Alle sechs Module jetzt in der Beta-Version testen</Cta></div>
      </div></section>

      <section id="ablauf" className="scroll-mt-20 px-6 py-24"><div className="mx-auto max-w-5xl"><div className="text-center"><Overline>Dein Weg ins Mittragen</Overline><h2 className="text-3xl font-medium tracking-[-.04em] md:text-4xl">Verstehen. Hinsehen. <Highlight>Übernehmen.</Highlight></h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#58606a]">Kein Anspruch, alles sofort richtig zu machen.<br/>Sondern ein bewusster Schritt nach dem anderen.</p></div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">{[
          ["01","Verstehen","Du lernst, was Schwangerschaft, Geburt und der neue Alltag verändern – für sie, für dich und für euch."],
          ["02","Hinsehen","Du erkennst Bedürfnisse und unsichtbare Arbeit. Ihr sprecht darüber, was euch wirklich entlastet."],
          ["03","Übernehmen","Du bringst das Gelernte in euren Alltag. Nicht als Zusatzhilfe, sondern als selbstverantwortlicher Partner."]
        ].map(([num,title,desc])=><div key={num}><p className="text-3xl font-light text-[#c94e28]">{num}</p><h3 className="mt-4 text-sm font-medium">{title}</h3><p className="mt-3 text-xs leading-7 text-[#626a75]">{desc}</p></div>)}</div>
      </div></section>

      <section className="bg-[#efe8dc] px-6 py-23"><div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2"><div><Overline>Worauf wir hinarbeiten</Overline><h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Nicht perfekt.<br/><Highlight>Aber präsenter.</Highlight></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#616974]">MITTRAGEN verspricht keine Bilderbuchfamilie. Sondern setzt bei dem an, was du selbst verändern kannst.</p></div><div>{[
          ["Mehr Klarheit","Du verstehst deine Rolle und kannst Bedürfnisse besser einordnen."],
          ["Echte Verantwortung","Du denkst Aufgaben von Anfang bis Ende – statt auf Zuruf zu handeln."],
          ["Entlastung im Alltag","Ihr schafft Freiräume, die nicht erst von ihr organisiert werden müssen."],
          ["Verbindung als Paar","Ihr könnt Erwartungen und Grenzen bewusster miteinander besprechen."]
        ].map(([title,desc])=><div key={title} className="flex gap-3 border-b border-[#d9d0c5] py-4"><Check size={16} className="mt-1 shrink-0 text-[#c94e28]"/><div><h3 className="text-sm font-medium">{title}</h3><p className="mt-1 text-xs leading-6 text-[#66707a]">{desc}</p></div></div>)}<p className="pt-5 text-xs leading-6 text-[#71777a]">Das sind Entwicklungsziele, keine garantierten Ergebnisse. Veränderung entsteht durch deine Umsetzung und eure gemeinsame Situation.</p></div></div></section>

      <section id="verschenken" className="scroll-mt-20 bg-[#f2e3d1] px-6 py-24"><div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2"><div><Overline>Eine Geschenkidee mit Bedeutung</Overline><h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Schenk ihm den Kurs.<br/><Highlight>Schenk dir die Zeit.</Highlight></h2><p className="mt-5 max-w-sm text-sm leading-7 text-[#626b73]">Kein weiterer Strampler. Sondern ein Impuls für einen Partner, der mitdenkt – und einen Alltag, den ihr gemeinsam tragt.</p><div className="mt-6"><Cta href="#geschenk-hinweis">Geschenkidee gestalten</Cta></div><p id="geschenk-hinweis" className="mt-4 text-xs leading-6 text-[#706e69]">Gutscheinkauf noch nicht verfügbar. Deine persönliche Karte ist eine Geschenkidee, kein einlösbarer Gutschein.</p></div><div className="relative mx-auto w-full max-w-[350px] py-7"><div className="absolute inset-x-4 inset-y-6 rotate-6 bg-[#c95b36]"/><div className="relative -rotate-5 border border-[#e6ded4] bg-[#fffdfa] p-10 shadow-lg"><p className="text-xs font-semibold tracking-wider">MITTRAGEN.</p><p className="mt-6 text-2xl font-medium leading-tight">Ein guter Anfang.<br/><Highlight>Gemeinsam.</Highlight></p><div className="mt-8 h-px bg-[#e4d6c8]"/><p className="mt-4 text-xs text-[#7c817e]">Für euch. Für euer Kind. Für das, was kommt.</p><Heart size={20} className="ml-auto mt-5 text-[#c94e28]"/></div></div></div></section>

      <section id="varianten" className="scroll-mt-20 px-6 py-24"><div className="mx-auto max-w-5xl"><div className="text-center"><Overline>So viel Begleitung, wie du brauchst</Overline><h2 className="text-3xl font-medium tracking-[-.04em] md:text-4xl">Dein Weg. <Highlight>Deine Variante.</Highlight></h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#626b73]">Drei geplante Wege zum selben Ziel: Verantwortung übernehmen.<br/>Das genaue Angebot entsteht gerade.</p></div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">{[
        {label:"EIGENSTÄNDIG",title:"Selbstlerner",subtitle:"Dein Weg. Dein Tempo.",description:"Für dich, wenn du dich eigenständig mit deiner neuen Rolle auseinandersetzen möchtest.",features:["Die sechs Themenbereiche des Kurses","Impulse für euren gemeinsamen Alltag","Eigenständige Reflexion und Umsetzung"]},
        {label:"IM AUSTAUSCH",title:"Begleitet",subtitle:"Nicht alles allein sortieren.",description:"Für dich, wenn du neben den Inhalten auch Austausch und Orientierung suchst.",features:["Geplante Inhalte des Selbstlerner-Kurses","Zusätzlicher Raum für deine Fragen","Begleitung bei der Umsetzung"]},
        {label:"PERSÖNLICH",title:"Premium 1:1",subtitle:"Raum für deine Situation.",description:"Für dich, wenn du deine persönlichen Themen individuell vertiefen möchtest.",features:["Geplante Inhalte des Kurses","Individuelle Auseinandersetzung mit deiner Rolle","Persönliche Begleitung im 1:1"]}
      ].map((tier,i)=><article key={tier.title} className={`flex flex-col border bg-[#fffdf9] p-7 ${i===1?"border-t-4 border-[#c94e28] border-x-[#e6dfd5] border-b-[#e6dfd5]":"border-[#e6dfd5]"}`}><p className="text-[10px] font-semibold uppercase tracking-widest text-[#c94e28]">{tier.label}</p><h3 className="mt-3 text-lg font-medium">{tier.title}</h3><p className="mt-1 text-xs text-[#707984]">{tier.subtitle}</p><p className="mt-8 text-2xl font-medium">Preis folgt</p><p className="mt-1 text-xs text-[#747b82]">In Vorbereitung</p><div className="my-6 h-px bg-[#e6dfd5]"/><p className="mb-6 min-h-18 text-xs leading-6 text-[#626b73]">{tier.description}</p><ul className="mb-7 flex-1 space-y-3">{tier.features.map(f=><li key={f} className="flex gap-2 text-xs leading-6"><Check size={14} className="mt-1 shrink-0 text-[#c94e28]"/>{f}</li>)}</ul><a href="#geschenk-hinweis" className="inline-flex min-h-11 items-center justify-between gap-2 bg-[#eee8df] px-5 py-3 text-xs font-medium hover:bg-[#e1d7c9]">Variante ansehen <ArrowRight size={14}/></a></article>)}</div>
      <p className="mt-6 text-center text-xs leading-6 text-[#767d80]">Geplante Ausrichtung, kein verbindliches Angebot. Preise, Dauer, Format und Umfang werden vor dem Kursstart veröffentlicht.</p>
      </div></section>

      <section id="faq" className="scroll-mt-20 px-6 pb-24"><div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[.8fr_1.2fr]"><div><Overline>Noch ein paar Fragen?</Overline><h2 className="text-3xl font-medium leading-tight tracking-[-.04em] md:text-4xl">Gut, dass<br/>du <Highlight>fragst.</Highlight></h2><p className="mt-5 text-sm leading-7 text-[#616974]">Die wichtigsten Antworten.<br/>Offen und ohne Kleingedrucktes.</p></div><div className="divide-y divide-[#ded8cf] border-t border-[#ded8cf]">{faqs.map(([q,a],i)=><div key={q}><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)} className="flex w-full items-center justify-between gap-4 py-4 text-left text-xs font-semibold hover:text-[#c94e28]">{q}<ChevronDown size={16} className={openFaq===i?"shrink-0 rotate-180":"shrink-0"}/></button>{openFaq===i&&<p className="pb-5 pr-4 text-xs leading-7 text-[#626b73]">{a}</p>}</div>)}</div></div></section>

      <section id="kontakt" className="scroll-mt-20 bg-[#f0e8dd] px-6 py-16"><div className="mx-auto max-w-5xl"><Overline>Kontakt</Overline><h2 className="text-3xl font-medium tracking-tight">Du hast noch Fragen?</h2><p className="mt-3 text-sm text-[#626b73]">Melde dich gerne direkt bei uns.</p><div className="mt-8 grid gap-5 text-sm md:grid-cols-3"><div><p className="mb-2 text-xs uppercase tracking-widest text-[#a84929]">E-Mail</p><a className="underline underline-offset-4" href="mailto:kontakt@flottiki.de">kontakt@flottiki.de</a></div><div><p className="mb-2 text-xs uppercase tracking-widest text-[#a84929]">Telefon</p><a className="underline underline-offset-4" href="tel:+4917681081338">0176 81081338</a></div><div><p className="mb-2 text-xs uppercase tracking-widest text-[#a84929]">Adresse</p><address className="not-italic">Studio kokoa · Claudia Kreft<br/>Cyriakstraße 39<br/>99094 Erfurt</address></div></div></div></section>
      <section className="bg-[#162639] px-6 py-28 text-center text-white"><div className="mx-auto max-w-2xl"><Overline>MITTRAGEN – DER MÄNNERKURS</Overline><h2 className="text-4xl font-medium leading-tight tracking-[-.04em] md:text-5xl">Sie trägt euer Kind.<br/><Highlight>Was trägst du?</Highlight></h2><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#cbd4de]">Für werdende und frischgebackene Väter, die Verantwortung übernehmen wollen. Nicht irgendwann. Von Anfang an.</p><div className="mt-7"><Cta>Offene Beta-Version testen</Cta></div><p className="mt-4 text-xs text-white/70">Ohne Zugang, ohne Anmeldung · KI-unterstützte Testfassung</p></div></section>
    </main>
    <footer className="bg-[#162639] px-6 py-9 text-white/65"><div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 border-t border-white/15 pt-8 md:flex-row"><div><Brand inverse compact /><p className="mt-3 text-xs">© {new Date().getFullYear()} MITTRAGEN · In Vorbereitung / Beta</p></div><div className="max-w-lg text-xs leading-6"><p><strong className="text-white">KI-Hinweis:</strong> Diese Website und die offenen Kursinhalte wurden mit Unterstützung künstlicher Intelligenz erstellt und befinden sich in der Beta-Phase.</p><p className="mt-2"><a href="/impressum" className="text-white underline underline-offset-4">Impressum</a> · <a href="#kontakt" className="text-white underline underline-offset-4">Kontakt</a> · Datenschutz wird vor dem offiziellen Launch ergänzt.</p></div></div></footer>
  </div>;
}
