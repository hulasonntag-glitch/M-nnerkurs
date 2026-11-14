import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Baby, BookOpen, Check, CheckCircle2, ChevronRight,
  Circle, ClipboardCheck, Film, Heart, LockOpen, MessageCircle, PlayCircle,
  RefreshCcw, Video, type LucideIcon,
} from "lucide-react";
import { Brand } from "../components/Brand";
import { COURSE } from "../data/professionalCourse";

export const Route = createFileRoute("/kurs")({
  head: () => ({
    meta: [
      { title: "MITTRAGEN – Dein offener Männerkurs" },
      { name: "description", content: "Alle sechs Module offen testen: Avatar-Szenen mit Tom und Lena, Kontrollfragen für ihn und praktische Alltagsaufgaben. Ohne Anmeldung." },
    ],
  }),
  component: CoursePage,
});

type Progress = {
  reviewed: boolean[][];
  answers: number[][];
  practices: boolean[];
  checkpoints: number[][];
  plans: string[];
};
const STORAGE_KEY = "mittragen-offener-kurs-beta-v3";
const PREVIOUS_V2 = "mittragen-offener-kurs-beta-v2";
const PREVIOUS_KEY = "mittragen-offener-kurs-beta-v1";

const blankProgress = (): Progress => ({
  reviewed: COURSE.map((module) => module.lessons.map(() => false)),
  answers: COURSE.map((module) => module.quiz.map(() => -1)),
  practices: COURSE.map(() => false),
  checkpoints: COURSE.map(m => m.lessons.map(() => -1)),
  plans: COURSE.map(() => ""),
});

function restoreProgress(raw: unknown): Progress {
  const blank = blankProgress();
  if (!raw || typeof raw !== "object") return blank;
  const stored = raw as Partial<Progress>;
  return {
    reviewed: blank.reviewed.map((lessons, m) =>
      lessons.map((_, v) => stored.reviewed?.[m]?.[v] === true)),
    answers: blank.answers.map((questions, m) =>
      questions.map((_, q) => {
        const answer = stored.answers?.[m]?.[q];
        return typeof answer === "number" && Number.isInteger(answer) &&
          answer >= 0 && answer < COURSE[m]!.quiz[q]!.options.length ? answer : -1;
      })),
    practices: blank.practices.map((_, m) => stored.practices?.[m] === true),
    checkpoints: blank.checkpoints.map((entries,m)=>entries.map((_,i)=>{
      const value = stored.checkpoints?.[m]?.[i];
      return typeof value === "number" && value >= 0 && value <= 2 ? value : -1;
    })),
    plans: blank.plans.map((_,m)=>typeof stored.plans?.[m] === "string" ? stored.plans[m]!.slice(0,2500) : ""),
  };
}
function correctCount(progress: Progress, index: number) {
  return COURSE[index]!.quiz.filter((question, q) =>
    progress.answers[index]?.[q] === question.correct).length;
}
const moduleIcons: LucideIcon[] = [Heart, BookOpen, MessageCircle, Heart, Baby, Heart];

function CoursePage() {
  const [progress, setProgress] = useState<Progress>(blankProgress);
  const [hydrated, setHydrated] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(PREVIOUS_V2) ?? window.localStorage.getItem(PREVIOUS_KEY);
      if (saved) setProgress(restoreProgress(JSON.parse(saved)));
    } catch { /* Browser-Speicher ist optional. */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { /* In privaten Browserfenstern kann Speichern gesperrt sein. */ }
  }, [progress, hydrated]);

  const module = COURSE[activeModule]!;
  const quizStep = module.lessons.length;
  const onQuiz = activeStep === quizStep;
  const lesson = onQuiz ? null : module.lessons[activeStep];
  const score = correctCount(progress, activeModule);
  const passed = score === module.quiz.length;
  const completedModules = COURSE.filter((_, m) =>
    correctCount(progress, m) === COURSE[m]!.quiz.length).length;

  const selectModule = (index: number) => {
    setActiveModule(index);
    setActiveStep(0);
    window.scrollTo?.({top: 0, behavior: "smooth"});
  };
  const markReviewed = (m: number, v: number) => {
    setProgress(old => ({
      ...old,
      reviewed: old.reviewed.map((entries, index) =>
        index === m ? entries.map((seen, i) => i === v ? true : seen) : entries),
    }));
  };
  const answer = (m: number, q: number, choice: number) => {
    setProgress(old => ({
      ...old,
      answers: old.answers.map((entries, index) =>
        index === m ? entries.map((value, i) => i === q ? choice : value) : entries),
    }));
  };
  const answerCheckpoint = (m:number,step:number,choice:number) => {
    setProgress(old=>({...old,checkpoints:old.checkpoints.map((entries,index)=>index===m?
      entries.map((answer,i)=>i===step?choice:answer):entries)}));
  };
  const savePlan = (m:number,text:string) => {
    setProgress(old=>({...old,plans:old.plans.map((entry,i)=>i===m?text.slice(0,2500):entry)}));
  };
  const resetQuiz = (m: number) => {
    setProgress(old => ({
      ...old,
      answers: old.answers.map((entries, index) =>
        index === m ? entries.map(() => -1) : entries),
    }));
  };
  const togglePractice = (m: number) => {
    setProgress(old => ({
      ...old, practices: old.practices.map((done, index) => index === m ? !done : done),
    }));
  };

  return <div className="min-h-screen bg-[#faf7f0] font-sans text-[#162639]">
    <header className="border-b border-[#ded6cb] bg-[#faf7f0]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <Brand />
        <a href="/" className="inline-flex items-center gap-2 text-xs font-medium hover:text-[#c94e28] sm:text-sm">
          <ArrowLeft size={16} aria-hidden="true"/> Zur Startseite
        </a>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-4 pb-24 pt-9 sm:px-7 sm:pt-14">
      <div className="mb-7 max-w-3xl sm:mb-10">
        <span className="inline-flex items-center gap-2 border border-[#dbbca7] bg-[#f9e9d9] px-3 py-2 text-[11px] font-semibold uppercase tracking-[.13em] text-[#944123]">
          <LockOpen size={14} aria-hidden="true"/> Offene Testphase
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[.17em] text-[#c4532b]">MITTRAGEN · DER MÄNNERKURS</p>
        <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-.045em]">Wissen. Mitdenken. <span className="text-[#c94e28]">Mittragen.</span></h1>
        <p className="mt-4 text-sm leading-7 text-[#5d6871] sm:text-base">
          Alle sechs Module sind für deine Freunde zum Ausprobieren frei. Ohne Anmeldung, ohne Bezahlung und ohne Freischaltung.
          Die Avatar-Videos entstehen noch. Du kannst trotzdem alle Lektionen lesen, Entscheidungen an Tom und Lenas Alltag üben, praktische Schritte lernen und die Tests ausprobieren.
        </p>
        <p className="mt-3 text-sm font-medium text-[#162639]">
          Hier lernst du als Mann, konkrete Verantwortung zu übernehmen. Deine Partnerin muss dich dabei nicht unterrichten oder kontrollieren.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[285px_minmax(0,1fr)] lg:gap-8">
        <aside className="rounded-2xl border border-[#e2dad0] bg-white p-4 sm:p-5 lg:sticky lg:top-5" aria-label="Kursübersicht">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Deine Module</h2>
            <span className="text-xs tabular-nums text-[#657079]">{completedModules} / {COURSE.length} Tests bestanden</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ebe4dc]" role="progressbar"
            aria-label="Bestandene Modultests" aria-valuemin={0} aria-valuemax={COURSE.length} aria-valuenow={completedModules}>
            <div className="h-full bg-[#c94e28] transition-[width]" style={{width: (completedModules/COURSE.length*100)+"%"}}/>
          </div>
          <nav className="mt-5 grid gap-1.5" aria-label="Alle sechs frei zugänglichen Module">
            {COURSE.map((entry,index) => {
              const Icon = moduleIcons[index] ?? Heart;
              const finished = correctCount(progress,index) === entry.quiz.length;
              return <button key={entry.title} type="button" onClick={()=>selectModule(index)}
                aria-current={activeModule===index?"step":undefined}
                className={"flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#c94e28] " +
                  (activeModule===index ? "bg-[#162639] text-white" : "hover:bg-[#f3eee7]")}>
                <span className={activeModule===index?"text-[#f0a27f]":"text-[#c94e28]"}><Icon size={19} aria-hidden="true"/></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold tracking-[.10em] opacity-75">MODUL {String(index+1).padStart(2,"0")}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5">{entry.title}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs opacity-75">
                    {finished ? <><CheckCircle2 size={13}/> Test bestanden</> : <><Circle size={12}/> Frei zugänglich</>}
                  </span>
                </span>
                <ChevronRight size={16} className="mt-1 shrink-0 opacity-65" aria-hidden="true"/>
              </button>;
            })}
          </nav>
          <p className="mt-5 border-t border-[#eae3d9] pt-4 text-xs leading-6 text-[#69737b]">
            <LockOpen size={13} className="mr-1 inline" aria-hidden="true"/>
            Kein Modul ist gesperrt. Dein Testfortschritt bleibt in diesem Browser.
          </p>
        </aside>

        <div className="min-w-0 space-y-5">
          <section className="rounded-2xl bg-[#162639] p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#efaa85]">MODUL {String(activeModule+1).padStart(2,"0")} VON 06</p>
              <span className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[11px] text-white/85">
                <LockOpen size={13}/> Für alle offen
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{module.title}</h2>
            <p className="mt-3 text-sm text-[#e6e9ed]">{module.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">{module.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80">
              <span className="inline-flex items-center gap-2"><Film size={15}/>{module.lessons.length} Lerneinheiten</span>
              <span className="inline-flex items-center gap-2"><ClipboardCheck size={15}/>{module.quiz.length} Fragen nur für dich</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15}/>{score} von {module.quiz.length} richtig</span>
            </div>
          </section>

          <section aria-label="Inhalte des aktuellen Moduls">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {module.lessons.map((entry, i) =>
                <button key={entry.title} type="button" onClick={()=>setActiveStep(i)}
                  aria-current={activeStep===i?"step":undefined}
                  className={"min-h-14 rounded-xl border px-3 py-3 text-left text-xs font-semibold leading-5 transition-colors " +
                    (activeStep===i?"border-[#162639] bg-[#162639] text-white":"border-[#e0d8ce] bg-white hover:border-[#c94e28]")}>
                  <span className="mr-2 inline-flex align-middle">{progress.reviewed[activeModule]?.[i] ? <CheckCircle2 size={15}/> : <PlayCircle size={15}/>}</span>
                  Einheit {i+1}
                </button>)}
              <button type="button" onClick={()=>setActiveStep(quizStep)}
                aria-current={onQuiz?"step":undefined}
                className={"min-h-14 rounded-xl border px-3 py-3 text-left text-xs font-semibold leading-5 transition-colors " +
                  (onQuiz?"border-[#c94e28] bg-[#c94e28] text-white":"border-[#e0d8ce] bg-white hover:border-[#c94e28]")}>
                <ClipboardCheck size={15} className="mr-2 inline align-middle"/> Modultest
              </button>
            </div>
          </section>

          {lesson && <section key={activeModule+"-"+activeStep} className="rounded-2xl border border-[#e2dad0] bg-white p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c4532b]">
              LERNEINHEIT {activeStep+1} VON {module.lessons.length}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{lesson.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#657079]">{lesson.objective}</p>
            {lesson.durationMinutes && <p className="mt-2 text-xs font-medium text-[#aa502d]">Geplante Avatar-Länge: ca. {lesson.durationMinutes} Minuten · Lesefassung jetzt testen</p>}

            {lesson.videoSrc && !videoErrors[lesson.videoSrc] ?
              <video key={lesson.videoSrc} controls playsInline preload="metadata"
                src={lesson.videoSrc} className="mt-6 aspect-video w-full rounded-xl bg-[#162639]"
                onEnded={()=>markReviewed(activeModule,activeStep)}
                onError={()=>setVideoErrors(old=>({...old,[lesson.videoSrc!]:true}))}>
                Dein Browser kann dieses Video nicht wiedergeben.
              </video>
              :
              <div className="mt-6 flex aspect-video flex-col items-center justify-center rounded-xl bg-[#1a2c40] px-5 text-center text-white">
                <Video size={38} strokeWidth={1.5} className="text-[#ef9c75]" aria-hidden="true"/>
                <p className="mt-4 text-lg font-semibold">Avatar-Video in Vorbereitung</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                  Hier wird dein Video mit Tom und Lena abgespielt. Für die Testphase ist die Szene darunter lesbar.
                </p>
              </div>}

            <div className="mt-7 rounded-xl border border-[#e1d8cd] bg-[#fffdf9] p-5 sm:p-7">
              <div className="flex items-center gap-2"><BookOpen size={20} className="text-[#c94e28]"/><h4 className="text-xl font-semibold tracking-tight">Das musst du wissen</h4></div>
              <p className="mt-2 text-xs leading-6 text-[#707a82]">Verständlich erklärt. Quellen am Ende der Lerneinheit. Die Gesundheitsthemen sind redaktionelle Beta-Inhalte und ersetzen keine fachliche Beratung.</p>
              <ul className="mt-5 space-y-4">{lesson.knowledge.map((fact,i)=><li key={i} className="flex gap-3 text-sm leading-7"><Check size={16} className="mt-[5px] shrink-0 text-[#c94e28]"/><span>{fact}</span></li>)}</ul>
            </div>
            <div className="mt-5 rounded-xl border border-[#e1d8cd] bg-[#f9f4ed] p-5 sm:p-7">
              <h4 className="text-lg font-semibold">So setzt du das selbst um</h4>
              <ol className="mt-4 space-y-3">{lesson.steps.map((step,i)=><li key={i} className="flex gap-3 text-sm leading-7"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#162639] text-xs text-white">{i+1}</span><span>{step}</span></li>)}</ol>
            </div>
            <div className="mt-7 rounded-xl bg-[#f5efe7] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[#af4b2a]"><MessageCircle size={18}/><p className="text-xs font-semibold uppercase tracking-widest">Tom & Lena · Beispielsituation</p></div>
              <p className="mt-4 text-sm leading-7">{lesson.scene}</p>
              {lesson.dialogue && lesson.dialogue.length > 0 ? <div className="mt-5 space-y-3">
                {lesson.dialogue.map((line,i)=><p key={i} className={"rounded-r-md border-l-[3px] px-4 py-3 text-sm leading-7 " +
                  (line.speaker==="Tom"?"border-[#c94e28] bg-[#fffaf4]":line.speaker==="Lena"?"border-[#72869a] bg-white":"border-[#bfa78b] bg-[#eee6dc]")}>
                  <strong>{line.speaker}:</strong> {line.speaker==="Sprecher"?line.text:`„${line.text}“`}
                </p>)}
              </div> : <>
                <div className="mt-5 space-y-3">
                  <p className="border-l-2 border-[#c94e28] pl-4 text-sm leading-6"><strong>Tom:</strong> „{lesson.tom}“</p>
                  <p className="border-l-2 border-[#aaa08e] pl-4 text-sm leading-6"><strong>Lena:</strong> „{lesson.lena}“</p>
                </div>
                <p className="mt-6 border-t border-[#dcd0c4] pt-4 text-sm leading-7"><strong>Sprecher:</strong> {lesson.narrator}</p>
              </>}
            </div>

            {lesson.challenge && <fieldset className="mt-6 rounded-xl border-2 border-[#e5c4b0] bg-[#fff8f3] p-5 sm:p-6">
              <legend className="px-2 text-xs font-semibold uppercase tracking-widest text-[#a94325]">Dein Lerncheck · nur für dich</legend>
              <p className="text-sm font-semibold leading-7">{lesson.challenge.prompt}</p>
              <div className="mt-4 grid gap-2">{lesson.challenge.options.map((option,choice)=>{
                const selected = progress.checkpoints[activeModule]?.[activeStep] ?? -1;
                const isCorrect = selected === lesson.challenge!.correct;
                return <label key={option} className={"flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 text-sm leading-6 " +
                  (selected===choice ? isCorrect?"border-[#68a37c] bg-[#eaf5ee]":"border-[#cc8c6c] bg-[#fce9df]":"border-[#e2d8cb] bg-white hover:border-[#c94e28]")}>
                  <input type="radio" checked={selected===choice} name={`checkpoint-${activeModule}-${activeStep}`}
                    onChange={()=>answerCheckpoint(activeModule,activeStep,choice)} className="mt-1 h-4 w-4 shrink-0 accent-[#c94e28]"/>
                  <span>{option}</span>
                </label>;
              })}</div>
              {(progress.checkpoints[activeModule]?.[activeStep] ?? -1) >= 0 && <p role="status" className="mt-4 text-sm leading-7">
                <strong>{progress.checkpoints[activeModule]?.[activeStep] === lesson.challenge.correct?"Richtig!":"Noch nicht ganz."}</strong>
                {" "}{progress.checkpoints[activeModule]?.[activeStep] === lesson.challenge.correct?
                  lesson.challenge.explanation:"Überlege, welche Aufgabe du selbst übernehmen kannst und wo fachlicher Rat wichtig ist. Du darfst die Antwort ändern."}
              </p>}
            </fieldset>}

            {lesson.sources.length>0 && <div className="mt-5 rounded-lg border border-[#e4ddd2] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a5a48]">Quellen zum Nachlesen</p>
              <ul className="mt-2 space-y-2">{lesson.sources.map(source=><li key={source.url} className="text-xs leading-6">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[#ad4627] underline underline-offset-4">{source.label}</a>
              </li>)}</ul>
            </div>}
            <div className="mt-6 border-l-[3px] border-[#c94e28] bg-[#fdf8f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#b34829]">Dein nächster Schritt</p>
              <p className="mt-2 text-sm leading-7">{lesson.hisAction}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={()=>markReviewed(activeModule,activeStep)}
                disabled={progress.reviewed[activeModule]?.[activeStep]}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d6cec4] bg-[#fffdf9] px-4 py-2 text-xs font-semibold disabled:border-[#b7d5b6] disabled:bg-[#eef6ee] disabled:text-[#317047]">
                <Check size={16}/> {progress.reviewed[activeModule]?.[activeStep]?"Einheit bearbeitet ✓":"Einheit als gelesen markieren"}
              </button>
              <button type="button" onClick={()=>setActiveStep(activeStep<quizStep-1?activeStep+1:quizStep)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#c94e28] px-4 py-2 text-xs font-semibold text-white hover:bg-[#a94222]">
                {activeStep===quizStep-1?"Zum Modultest":"Nächste Einheit"} <ArrowRight size={16}/>
              </button>
            </div>
          </section>}

          {onQuiz && <section className="rounded-2xl border border-[#e2dad0] bg-white p-5 sm:p-8" aria-labelledby="quiz-title">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c4532b]">KONTROLLFRAGEN · MODUL {String(activeModule+1).padStart(2,"0")}</p>
            <h3 id="quiz-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Was hast du verstanden?</h3>
            <p className="mt-3 text-sm leading-7 text-[#657079]">
              Diese Fragen beantwortest du selbst – nicht Lena. In der offenen Testphase kannst du den Test jederzeit starten,
              Antworten korrigieren und wiederholen, auch wenn das Avatar-Video noch fehlt.
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#f5efe7] p-4 text-sm">
              <ClipboardCheck size={21} className="shrink-0 text-[#c94e28]"/>
              <span><strong>{score} / {module.quiz.length} richtig.</strong> Für den Modulabschluss müssen alle Antworten stimmen.</span>
            </div>
            <div className="mt-7 space-y-8">
              {module.quiz.map((question,qi)=>{
                const selected = progress.answers[activeModule]?.[qi] ?? -1;
                const correct = selected === question.correct;
                return <fieldset key={question.prompt} className="min-w-0 border-b border-[#e7dfd4] pb-7">
                  <legend className="text-sm font-semibold leading-6">{qi+1}. {question.prompt}</legend>
                  <div className="mt-4 grid gap-2">
                    {question.options.map((option,choice) =>
                      <label key={option} className={"flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm leading-6 " +
                        (selected===choice ? correct?"border-[#82ad8f] bg-[#edf6ed]":"border-[#d99a86] bg-[#fff1e9]":"border-[#e2dad0] hover:border-[#c94e28]")}>
                        <input type="radio" className="h-4 w-4 shrink-0 accent-[#c94e28]" name={"m"+activeModule+"-q"+qi}
                          checked={selected===choice} onChange={()=>answer(activeModule,qi,choice)}/>
                        <span>{option}</span>
                      </label>)}
                  </div>
                  {selected>=0 && <p role="status" className={"mt-3 rounded-lg px-4 py-3 text-sm leading-6 " +
                    (correct?"bg-[#edf6ed] text-[#28643c]":"bg-[#fff1e9] text-[#92462e]")}>
                    <strong>{correct?"Richtig!":"Noch nicht ganz."}</strong> {correct?question.explanation:"Überlege, was du selbst erkennen und übernehmen kannst. Du darfst die Antwort jederzeit ändern."}
                  </p>}
                </fieldset>;
              })}
            </div>
            {passed ? <div className="mt-6 rounded-xl bg-[#edf6ed] p-5">
              <p className="flex items-center gap-2 text-base font-semibold text-[#28643c]"><CheckCircle2 size={20}/> Modultest bestanden!</p>
              <p className="mt-2 text-sm leading-6">Du hast alle Kontrollfragen richtig beantwortet. Alle anderen Module sind und bleiben frei zugänglich.</p>
            </div> : <p className="mt-5 text-sm leading-6 text-[#657079]">
              Alle Module bleiben offen – auch wenn dein Testergebnis noch nicht vollständig ist.
            </p>}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={()=>resetQuiz(activeModule)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#d6cec4] px-4 text-xs font-semibold hover:bg-[#f5efe7]">
                <RefreshCcw size={15}/> Test neu starten
              </button>
              {activeModule<COURSE.length-1 && <button type="button" onClick={()=>selectModule(activeModule+1)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#c94e28] px-4 text-xs font-semibold text-white hover:bg-[#a94222]">
                Weiter zu Modul {String(activeModule+2).padStart(2,"0")} <ArrowRight size={16}/>
              </button>}
            </div>
          </section>}

          {activeModule === 0 && <section className="rounded-2xl border border-[#e2dad0] bg-white p-5 sm:p-8" aria-labelledby="seven-days">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#b34829]">Deine persönliche Umsetzung</p>
            <h3 id="seven-days" className="mt-2 text-2xl font-semibold">Mein 7-Tage-Mittrageplan</h3>
            <p className="mt-3 text-sm leading-7 text-[#657079]">
              Schreib deinen eigenen, konkreten Plan. Lena muss ihn nicht erstellen oder bestätigen.
              Beantworte: Was übernehme ich? Woran erkenne ich den Bedarf? Was organisiere ich selbst? Wann prüfe ich, ob es funktioniert?
            </p>
            <label htmlFor="mittrageplan" className="mt-5 block text-sm font-semibold">Mein Verantwortungsbereich und meine vier Schritte</label>
            <textarea id="mittrageplan" rows={6} maxLength={2500} value={progress.plans[activeModule] ?? ""}
              onChange={e=>savePlan(activeModule,e.target.value)}
              placeholder={"Ich übernehme für sieben Tage ...\nIch erkenne den Bedarf an ...\nIch plane und erledige ...\nIch kontrolliere selbst am ..."}
              className="mt-3 w-full rounded-xl border border-[#d8d0c5] bg-[#fffcf7] p-4 text-sm leading-7 focus:outline-2 focus:outline-[#c94e28]"/>
            <p className="mt-2 text-xs leading-6 text-[#69737b]">
              {progress.plans[activeModule]?.trim()?"Dein Plan ist in diesem Browser gespeichert.":"Dein Plan wird beim Schreiben lokal im Browser gespeichert."}
              {" "}Du kannst ihn später jederzeit verbessern.
            </p>
          </section>}

          <section className="rounded-2xl border border-[#e2dad0] bg-[#f1e9dd] p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#b34829]">Deine Aufgabe für den Alltag</p>
            <h3 className="mt-2 text-xl font-semibold">Jetzt übernimmst du.</h3>
            <p className="mt-3 text-sm leading-7">{module.practice}</p>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm font-medium">
              <input type="checkbox" checked={progress.practices[activeModule]}
                onChange={()=>togglePractice(activeModule)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#c94e28]"/>
              <span>{progress.practices[activeModule]?"Als umgesetzt markiert.":"Ich habe diese Aufgabe selbst umgesetzt."}</span>
            </label>
            <p className="mt-3 text-xs leading-6 text-[#6d777e]">Für den offenen Test optional. Deine ehrliche Umsetzung zählt – nicht eine Bestätigung durch Lena.</p>
          </section>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold hover:text-[#c94e28]"><ArrowLeft size={16}/> Zur Startseite</a>
            <button type="button" onClick={()=>setActiveStep(quizStep)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#ad4627] hover:underline">
              Zum Kontrolltest <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </main>
    <footer className="border-t border-[#dfd8cf] bg-[#162639] px-6 py-8 text-center text-xs text-white/75">
      MITTRAGEN · Offene Testphase · <a href="/impressum" className="underline underline-offset-4">Impressum</a>
    </footer>
  </div>;
}
