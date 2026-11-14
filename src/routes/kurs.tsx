import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, LockKeyhole, Play, Video } from "lucide-react";
import { Brand } from "../components/Brand";

export const Route = createFileRoute("/kurs")({
  head: () => ({
    meta: [
      { title: "MITTRAGEN – Dein Kurs" },
      { name: "description", content: "Schau ein Video, beantworte die dazugehörigen Kontrollfragen und gehe zum nächsten. MITTRAGEN – Der Männerkurs." },
    ],
  }),
  component: CoursePage,
});

type Question = { prompt: string; options: string[]; correct: number; explanation: string };
type Lesson = { title: string; src: string; questions: Question[]; hasPlan?: boolean };
type Progress = {
  watched: boolean[];
  answers: number[][];
  plan: string;
  taskDone: boolean;
};

const LESSONS: Lesson[] = [
  {
    title: "Willkommen",
    src: "/Modul1_Video1_Willkommen%20%282%29.mp4",
    hasPlan: true,
    questions: [{
      prompt: "Was ist der Unterschied zwischen Helfen und Mittragen?",
      options: [
        "Beim Mittragen übernimmt er auch das Mitdenken und die Verantwortung – nicht nur das Ausführen.",
        "Mittragen heißt, besonders viel zu erledigen, wenn sie darum bittet.",
        "Es gibt keinen Unterschied.",
      ],
      correct: 0,
      explanation: "Mittragen bedeutet, Verantwortung eigenständig zu erkennen, zu planen und zu übernehmen.",
    }],
  },
  {
    title: "Das erste Trimester",
    src: "/Modul1_Video2_Das_erste_Trimester.mp4",
    questions: [
      {
        prompt: "Warum ist sie im ersten Trimester oft so erschöpft, obwohl man noch nichts sieht?",
        options: [
          "Ihr Körper legt alle Organe des Babys an, baut die Plazenta und stellt sich hormonell um.",
          "Weil die Schwangerschaft erst nach dem ersten Trimester anstrengend wird.",
          "Weil vor allem das Gewicht des Babys schon stark belastet.",
        ],
        correct: 0,
        explanation: "Die Entwicklung der Organe, der Aufbau der Plazenta und hormonelle Veränderungen kosten viel Energie.",
      },
      {
        prompt: "Was ist im ersten Trimester deine wichtigste Rolle?",
        options: [
          "Ihre Ruhe schützen und ihr Last abnehmen.",
          "Abwarten, bis man die Schwangerschaft deutlich sieht.",
          "Ihr sagen, welche Aufgaben sie noch übernehmen kann.",
        ],
        correct: 0,
        explanation: "Du sorgst aktiv für Ruhe und echte Entlastung, statt auf Anweisungen zu warten.",
      },
    ],
  },
  {
    title: "Zweites und drittes Trimester",
    src: "/Modul1_Video3_Zweites_und_drittes_Trimester.mp4",
    questions: [
      {
        prompt: "Warum hat Toms Satz „Du siehst schon richtig schwanger aus“ Lena getroffen?",
        options: [
          "Ihr Körper verändert sich stark und viele Frauen fühlen sich darin fremd – sie brauchen Würdigung, keine Feststellung.",
          "Weil Tom die Schwangerschaft nicht früh genug erkannt hat.",
          "Weil man in der Schwangerschaft grundsätzlich nichts zum Körper sagen darf.",
        ],
        correct: 0,
        explanation: "Wertschätzung und Einfühlungsvermögen helfen mehr als eine bloße Feststellung.",
      },
      {
        prompt: "Was ist im dritten Trimester deine Rolle?",
        options: [
          "Das Schwere tragen, die Geburt vorbereiten und auch nachts da sein.",
          "Bis zur Geburt abwarten und danach Aufgaben übernehmen.",
          "Sich vor allem um die Dekoration des Kinderzimmers kümmern.",
        ],
        correct: 0,
        explanation: "Praktische Entlastung, Vorbereitung und Verlässlichkeit gehören jetzt zu deiner Verantwortung.",
      },
    ],
  },
];

const TITLES = [
  "Schwangerschaft verstehen",
  "Mental Load übernehmen",
  "Geburt: dein Platz",
  "Das Wochenbett",
  "Baby-Alltag in der Praxis",
  "Raum für sie",
];
const STORAGE_KEY = "mittragen-modul1-video-quiz-reihenfolge-v1";
const TASK = "Trag alle Vorsorgetermine bis zur Geburt in deinen Kalender ein. Geh zum nächsten Termin mit, wenn sie das möchte – und übernimm ab jetzt die Planung der Termine.";

const emptyProgress = (): Progress => ({
  watched: LESSONS.map(() => false),
  answers: LESSONS.map(l => l.questions.map(() => -1)),
  plan: "",
  taskDone: false,
});

function sanitizeProgress(input: unknown): Progress {
  const blank = emptyProgress();
  if (!input || typeof input !== "object") return blank;
  const data = input as Partial<Progress>;
  blank.watched = blank.watched.map((_, i) => data.watched?.[i] === true);
  blank.answers = LESSONS.map((lesson, i) =>
    lesson.questions.map((question, q) => {
      const value = data.answers?.[i]?.[q];
      return typeof value === "number" && Number.isInteger(value) && value >= 0 && value < question.options.length ? value : -1;
    }),
  );
  blank.plan = typeof data.plan === "string" ? data.plan.slice(0, 1500) : "";
  blank.taskDone = data.taskDone === true;
  return blank;
}

function quizComplete(p: Progress, index: number): boolean {
  const questions = LESSONS[index].questions;
  return p.watched[index] && questions.every((q, i) => p.answers[index]?.[i] === q.correct) &&
    (!LESSONS[index].hasPlan || p.plan.trim().length > 0);
}
function lessonUnlocked(p: Progress, index: number): boolean {
  return index === 0 || quizComplete(p, index-1);
}
function moduleDone(p: Progress): boolean {
  return LESSONS.every((_, i) => quizComplete(p, i)) && p.taskDone;
}
function completedStages(p: Progress): number {
  return LESSONS.filter((_, i) => quizComplete(p, i)).length + Number(moduleDone(p));
}

function CoursePage() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [active, setActive] = useState(0);
  const [planDraft, setPlanDraft] = useState("");
  const [videoErrors, setVideoErrors] = useState<boolean[]>(LESSONS.map(() => false));
  const [hydrated, setHydrated] = useState(false);
  const [openedModule, setOpenedModule] = useState(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const p = saved ? sanitizeProgress(JSON.parse(saved)) : emptyProgress();
      if (!saved) {
        // Preserve the user's previously written plan when changing course layouts.
        p.plan = window.localStorage.getItem("mittragen-beta-wenn-dann-plan") || "";
      }
      setProgress(p);
      setPlanDraft(p.plan);
    } catch { /* Der Kurs funktioniert auch ohne lokalen Speicher. */ }
    setHydrated(true);
  }, []);

  const update = (change: (current: Progress) => Progress) => {
    setProgress(current => {
      const next = change(current);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
      catch { /* Speicherung im Browser ist optional. */ }
      return next;
    });
  };

  const watch = (index: number) => {
    update(p => ({ ...p, watched: p.watched.map((v, i) => i === index ? true : v) }));
  };

  const answer = (lesson: number, question: number, choice: number) => {
    if (!progress.watched[lesson] || !lessonUnlocked(progress,lesson)) return;
    update(p => ({
      ...p,
      answers: p.answers.map((group, i) => i !== lesson ? group : group.map((v,j) => j === question ? choice : v)),
    }));
  };

  const savePlan = () => {
    if (!planDraft.trim()) return;
    const plan = planDraft.trim();
    update(p => ({ ...p, plan }));
    try { window.localStorage.setItem("mittragen-beta-wenn-dann-plan", plan); } catch { /* optional */ }
  };

  const chooseLesson = (index: number) => {
    if (lessonUnlocked(progress,index)) setActive(index);
  };

  const finished = moduleDone(progress);
  const steps = completedStages(progress);
  const currentLesson = LESSONS[active];
  const currentQuizDone = quizComplete(progress, active);

  return <div className="min-h-screen bg-[#F8F4EE] font-sans text-[#1B2B3C]">
    <header className="border-b border-[#DED6CB]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Brand />
        <a href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline"><ArrowLeft size={16}/> Zur Startseite</a>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 lg:pt-16">
      <div>
        <p className="text-xs font-medium uppercase tracking-[.2em] text-[#C4532B]">MITTRAGEN · DEIN KURS</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-.045em] md:text-5xl">Wissen. Mitdenken. Mittragen.</h1>
        <p className="mt-3 text-sm text-[#5D6871]">Video ansehen → dazugehörige Fragen beantworten → nächstes Video → Wochenaufgabe.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="self-start rounded-2xl border border-[#E2DAD0] bg-white p-5 lg:sticky lg:top-6" aria-label="Kursübersicht">
          <div className="flex items-center justify-between"><h2 className="text-lg font-medium">Deine Module</h2><span className="text-xs text-[#68727A]">{finished ? "1" : "0"} / 6</span></div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E9E3DB]"><div className="h-full bg-[#C4532B]" style={{width: finished ? "16.67%" : "0%"}}/></div>
          <nav className="mt-5 grid gap-2">{TITLES.map((title,index) => {
            const unlocked = index === 0 || (index === 1 && finished);
            return <button key={title} type="button" disabled={!unlocked} aria-current={openedModule===index?"step":undefined} onClick={()=>setOpenedModule(index)}
              className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left ${openedModule===index ? "bg-[#1B2B3C] text-white" : unlocked ? "hover:bg-[#F8F4EE]" : "cursor-not-allowed opacity-50"}`}>
              <span className="text-xs text-[#C4532B]">{String(index+1).padStart(2,"0")}</span>
              <span className="flex-1"><span className="block text-sm font-medium">{title}</span><span className="mt-1 flex items-center gap-1.5 text-xs opacity-70">{index===0 ? finished ? <><CheckCircle2 size={13}/> Geschafft</> : <><Circle size={13}/> In Bearbeitung</> : !unlocked ? <><LockKeyhole size={13}/> Gesperrt</> : <><Circle size={13}/> [folgt]</>}</span></span>
            </button>;
          })}</nav>
          <p className="mt-5 border-t border-[#EAE3D9] pt-4 text-xs leading-5 text-[#69737B]">Fortschritt nur in diesem Browser. Kein Login.</p>
        </aside>

        {openedModule > 0 ? <section className="self-start rounded-2xl border border-[#E2DAD0] bg-white p-8">
          <p className="text-xs tracking-[.16em] text-[#C4532B]">MODUL {String(openedModule+1).padStart(2,"0")}</p>
          <h2 className="mt-3 text-3xl font-medium">{TITLES[openedModule]}</h2>
          <p className="mt-5 text-sm text-[#667079]">[folgt]</p>
          <button onClick={()=>setOpenedModule(0)} className="mt-8 inline-flex items-center gap-2 text-sm underline"><ArrowLeft size={16}/> Zu Modul 1</button>
        </section> : <div className="min-w-0 space-y-5">
          <section className="rounded-2xl bg-[#1B2B3C] p-7 text-white md:p-9">
            <p className="text-xs uppercase tracking-[.17em] text-[#EAA17F]">MODUL 01 VON 06</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-.03em]">Schwangerschaft verstehen</h2>
            <div className="mt-7 flex items-center justify-between text-xs"><span>Dein Fortschritt</span><span>{steps} von 4 Etappen</span></div>
            <div role="progressbar" aria-label="Fortschritt in Modul 1" aria-valuenow={steps} aria-valuemax={4} aria-valuemin={0} className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#E58C66]" style={{width: `${steps*25}%`}}/>
            </div>
          </section>
          <div className="flex flex-wrap gap-2" aria-label="Videos in Modul 1">
            {LESSONS.map((lesson,i) => <button key={lesson.title} type="button" onClick={()=>chooseLesson(i)} disabled={!lessonUnlocked(progress,i)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${active===i?"border-[#1B2B3C] bg-[#1B2B3C] text-white":lessonUnlocked(progress,i)?"border-[#DDD4C9] bg-white hover:border-[#C4532B]":"cursor-not-allowed border-[#E6DED4] text-[#889098]"}`}>
              {quizComplete(progress,i) ? <CheckCircle2 size={14}/> : !lessonUnlocked(progress,i) ? <LockKeyhole size={13}/> : <Circle size={13}/>}
              Video {i+1}: {lesson.title}
            </button>)}
          </div>

          <section className="rounded-2xl border border-[#E2DAD0] bg-white p-6 md:p-8" aria-labelledby="video-title">
            <p className="text-xs uppercase tracking-[.15em] text-[#C4532B]">Video {active+1} von 3</p>
            <div className="mt-2 flex items-start justify-between gap-3">
              <h3 id="video-title" className="text-2xl font-medium tracking-tight">{currentLesson.title}</h3>
              {progress.watched[active]?<CheckCircle2 className="shrink-0 text-[#2E7A4A]"/>:<Video className="shrink-0 text-[#8D989D]"/>}
            </div>
            <video key={currentLesson.src} controls playsInline preload="metadata" className="mt-5 aspect-video w-full rounded-xl bg-[#1B2B3C]"
              src={currentLesson.src} onEnded={()=>watch(active)}
              onError={()=>setVideoErrors(prev=>prev.map((x,i)=>i===active?true:x))}>
              Dein Browser unterstützt das Videoformat nicht.
            </video>
            {videoErrors[active] && <p role="alert" className="mt-3 rounded-lg bg-[#FFF0EF] p-4 text-sm text-[#953B31]">Das Video konnte in dieser Vorschau nicht geladen werden. Prüfe, ob Lovable den aktuellen GitHub-Stand veröffentlicht hat. <a href={currentLesson.src} className="underline underline-offset-4">Videodatei direkt öffnen</a></p>}
            <p className="mt-4 text-xs text-[#657079]">{progress.watched[active]?"Gesehen. Die Kontrollfragen sind freigeschaltet.":"Nach dem vollständigen Abspielen erscheinen die Kontrollfragen direkt hier."}</p>

            {progress.watched[active] && <div className="mt-7 border-t border-[#E6DED4] pt-7" aria-labelledby="questions-title">
              <p className="text-xs uppercase tracking-[.15em] text-[#C4532B]">Kontrollfragen zu Video {active+1}</p>
              <h4 id="questions-title" className="mt-2 text-xl font-medium">Was hast du mitgenommen?</h4>
              <div className="mt-6 space-y-7">{currentLesson.questions.map((question, qi) => {
                const chosen = progress.answers[active]?.[qi] ?? -1;
                const correct = chosen === question.correct;
                return <fieldset key={question.prompt} className="min-w-0">
                  <legend className="text-sm font-medium leading-6">{qi+1}. {question.prompt}</legend>
                  <div className="mt-3 grid gap-2">{question.options.map((option,i)=><label key={option}
                    className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-sm ${chosen===i ? correct?"border-[#4D9563] bg-[#ECF7EE]":"border-[#BD5656] bg-[#FFF0EF]":"border-[#E7DED3]"} ${correct?"opacity-90":"cursor-pointer hover:border-[#C4532B]"}`}>
                    <input type="radio" name={`q-${active}-${qi}`} className="accent-[#C4532B]" checked={chosen===i} disabled={correct} onChange={()=>answer(active,qi,i)}/><span>{option}</span>
                  </label>)}</div>
                  {chosen>=0 && <p role="status" className={`mt-3 rounded-lg px-4 py-3 text-sm ${correct?"bg-[#ECF7EE] text-[#276541]":"bg-[#FFF0EF] text-[#A13636]"}`}>
                    <strong className="font-medium">{correct?"Richtig.":"Noch nicht. Versuch es nochmal."}</strong>{correct && <span className="ml-1">{question.explanation}</span>}
                  </p>}
                </fieldset>;
              })}</div>
              {currentLesson.hasPlan && <div className="mt-7">
                <label htmlFor="wenn-dann-plan" className="block text-sm font-medium">2. Wie lautet dein Wenn-Dann-Plan für diesen Kurs?</label>
                <textarea id="wenn-dann-plan" value={planDraft} onChange={e=>setPlanDraft(e.target.value)} rows={3}
                  placeholder="Wenn …, dann nehme ich mir … Zeit für MITTRAGEN." className="mt-3 w-full rounded-xl border border-[#D8D0C5] bg-[#F8F4EE] p-4 text-sm focus:outline-[#C4532B]"/>
                <button type="button" disabled={!planDraft.trim() || progress.plan===planDraft.trim()} onClick={savePlan}
                  className="mt-3 rounded-lg bg-[#1B2B3C] px-5 py-3 text-xs font-medium text-white disabled:opacity-50">{progress.plan.trim()?"Plan aktualisieren":"Plan speichern"}</button>
                {progress.plan.trim() && <p className="mt-3 text-xs text-[#276541]"><Check size={14} className="mr-1 inline"/> Plan gespeichert – nur in diesem Browser.</p>}
              </div>}
              {currentQuizDone ? <div className="mt-7 rounded-xl bg-[#ECF7EE] p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-[#276541]"><CheckCircle2 size={18}/> Video {active+1} und Kontrollfragen abgeschlossen.</p>
                {active<LESSONS.length-1 && <button type="button" onClick={()=>chooseLesson(active+1)} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#C4532B] px-5 py-3 text-sm font-medium text-white">Weiter zu Video {active+2} <ArrowRight size={17}/></button>}
              </div> : <p className="mt-5 text-xs text-[#657079]">Beantworte die Fragen richtig, um zum nächsten Video zu gelangen.</p>}
            </div>}
          </section>

          {LESSONS.every((_,i)=>quizComplete(progress,i)) && <section className="rounded-2xl border border-[#E2DAD0] bg-white p-6 md:p-8">
            <p className="text-xs uppercase tracking-[.15em] text-[#C4532B]">Aufgabe der Woche</p>
            <h3 className="mt-2 text-2xl font-medium">Jetzt bist du dran.</h3>
            <p className="mt-5 rounded-xl bg-[#F8F4EE] p-5 text-sm leading-7">{TASK}</p>
            <button type="button" disabled={progress.taskDone} onClick={()=>update(p=>({...p,taskDone:true}))}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#C4532B] px-5 py-3 text-sm text-white disabled:opacity-65"><Check size={17}/> {progress.taskDone?"Aufgabe erledigt ✓":"Aufgabe erledigt"}</button>
          </section>}

          {finished && <section className="rounded-2xl bg-[#1B2B3C] p-7 text-white md:p-8">
            <CheckCircle2 size={30} className="text-[#E58C66]"/>
            <h3 className="mt-3 text-3xl font-medium">Modul geschafft.</h3>
            <p className="mt-2 text-sm text-white/75">Modul 2 ist jetzt freigeschaltet.</p>
            <button type="button" onClick={()=>setOpenedModule(1)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#C4532B] px-5 py-3 text-sm text-white">Weiter zu Modul 2 <ArrowRight size={17}/></button>
          </section>}
        </div>}
      </div>
      {!hydrated && <span className="sr-only">Fortschritt wird geladen.</span>}
    </main>
    <footer className="border-t border-[#E0D8CE] px-6 py-7 text-center text-xs text-[#66717A]">MITTRAGEN · <a href="mailto:kontakt@flottiki.de" className="underline">Kontakt</a> · <a href="/impressum" className="underline">Impressum</a></footer>
  </div>;
}
