/**
 * MITTRAGEN – ausführliche Lerninhalte direkt für die offene Kurswebsite.
 * 32 Lerneinheiten und 36 Fall-/Wissensfragen; Ausgangsbasis: course.ts.
 * Medizinische Inhalte: redaktionelle Beta, vor offizieller Veröffentlichung fachlich prüfen.
 * Für die Video-Produktion weiterhin eigene Avatar-MP4s mit Tom und Lena einsetzen.
 */
import { COURSE as BASE_COURSE, type CourseModule, type Lesson, type Question } from "./course";

export type LearningSource = { label: string; url: string };
export type LearningDetails = { knowledge: string[]; steps: string[]; sources: LearningSource[] };
export type LearningLesson = Lesson & LearningDetails;
export type LearningModule = Omit<CourseModule,"lessons"|"quiz"> & {
  lessons: LearningLesson[];
  quiz: Question[];
};

const REF = {
  pregnancy: {label:"Gesund ins Leben – Handlungsempfehlungen 2026",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/"},
  nausea: {label:"IQWiG – Übelkeit in der Schwangerschaft",url:"https://www.gesundheitsinformation.de/was-hilft-gegen-uebelkeit-in-der-schwangerschaft.html"},
  food: {label:"Gesund ins Leben – Schutz vor Lebensmittelinfektionen",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/schutz-vor-infektionen-durch-lebensmittel-in-der-schwangerschaft/"},
  caffeine: {label:"Gesund ins Leben – Koffeinempfehlungen",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/weitere-gesundheitsaspekte/koffein-in-der-schwangerschaft/"},
  nutrition: {label:"Gesund ins Leben – Ernährung und Getränke",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/ernaehrung/ernaehrungsweise-und-getraenke-in-der-schwangerschaft/"},
  folate: {label:"Gesund ins Leben – Folsäure bei Kinderwunsch und Schwangerschaft",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/nachgefragt/folsaeure-bei-kinderwunsch-und-schwangerschaft-wann-und-wieviel/"},
  mental: {label:"Daminger – kognitive Haushaltsarbeit (2019)",url:"https://doi.org/10.1177/0003122419859007"},
  birth: {label:"familienplanung.de – Geburt vorbereiten (2026)",url:"https://www.familienplanung.de/schwangerschaft/geburt/geburtsvorbereitung/wie-kann-ich-mich-auf-die-geburt-vorbereiten/"},
  postpartum: {label:"familienplanung.de – Gut vorbereitet ins Wochenbett (2026)",url:"https://www.familienplanung.de/schwangerschaft/geburt/geburtsvorbereitung/ambulante-geburt/"},
  infant: {label:"kindergesundheit-info.de – Sicherheitsregeln fürs Baby",url:"https://www.kindergesundheit-info.de/themen/sicher-aufwachsen/0-12-monate/unfallschwerpunkte/sicherheitsregeln/"},
  sleep: {label:"kindergesundheit-info.de – Sicher schlafen",url:"https://www.kindergesundheit-info.de/themen/schlafen/0-12-monate/schlafumgebung/sicher-schlafen"},
  crying: {label:"kindergesundheit-info.de – Babyschreien verstehen",url:"https://www.kindergesundheit-info.de/themen/entwicklung/0-12-monate/schreien/"},
  overwhelm: {label:"kindergesundheit-info.de – Was tun bei Überforderung?",url:"https://www.kindergesundheit-info.de/themen/faq/unser-baby-schreit-unglaublich-viel-und-manchmal-drehe-ich-fast-durch-was-soll-ich-tun/"},
} satisfies Record<string, LearningSource>;

const d = (knowledge:string[],steps:string[],sources:LearningSource[]):LearningDetails => ({knowledge,steps,sources});
const add = (title:string,objective:string,scene:string,tom:string,lena:string,narrator:string,hisAction:string,knowledge:string[],steps:string[],sources:LearningSource[]):LearningLesson =>
  ({title,objective,scene,tom,lena,narrator,hisAction,knowledge,steps,sources});
const ask=(prompt:string,options:[string,string,string],correct:0|1|2,explanation:string):Question=>({prompt,options,correct,explanation});

/** Zu jeder vorhandenen Tom-und-Lena-Szene vermitteln wir zusätzlich überprüfbares Wissen und eine klare Vorgehensweise. */
const ORIGINAL: LearningDetails[][] = [
  [
    d(
      ["Helfen bedeutet oft: Jemand anderes erkennt ein Problem, plant die Lösung und verteilt Aufgaben. Mittragen heißt: Du übernimmst auch diese Denkarbeit.",
       "Ein eigener Verantwortungsbereich besteht aus Bedarf erkennen, Lösung vorbereiten, relevante Entscheidungen abstimmen und Ergebnis nachhalten.",
       "Die Partnerin zu unterstützen bedeutet nicht, ihre Entscheidungen über ihren Körper oder persönliche Wünsche zu übernehmen."],
      ["Wähle einen kleinen Alltagsbereich, für den du komplett zuständig bist.","Lege fest, woran du selbst bemerkst, dass etwas ansteht.","Organisiere und erledige es, ohne auf eine Erinnerung zu warten."],
      [REF.mental]),
    d(
      ["Im frühen Schwangerschaftsverlauf können Müdigkeit, Übelkeit und veränderte Geruchs- oder Geschmacksempfindlichkeit auftreten – bevor man einen Bauch sieht.",
       "Nicht jede Frau erlebt die gleichen Beschwerden. Stärke und Dauer unterscheiden sich erheblich.",
       "Was für Lena heute angenehm ist, kann morgen unangenehm sein. Unterstützen heißt nach ihren Bedürfnissen handeln, nicht Symptome herunterspielen."],
      ["Kümmere dich um Mahlzeiten und Haushalt, ohne die Planung abzugeben.","Achte darauf, welche Gerüche oder Speisen deine Partnerin gerade nicht mag.","Wenn sie kaum Flüssigkeit behalten kann oder es ihr deutlich schlechter geht, hilf bei der medizinischen Abklärung."],
      [REF.nausea,REF.pregnancy]),
    d(
      ["Auch im späteren Verlauf verändert sich der Körper weiter. Je nach Person können beispielsweise Rückenbeschwerden, Sodbrennen oder schlechter Schlaf eine Rolle spielen.",
       "Ein Kommentar über den Körper, selbst gut gemeint, ist nicht automatisch unterstützend.",
       "Die bevorstehende Geburt erzeugt Organisationsaufgaben. Du kannst Informationen sammeln und Logistik vorbereiten, statt damit auf Anweisungen zu warten."],
      ["Höre zu, statt das Aussehen oder Leistungsvermögen deiner Partnerin zu bewerten.","Organisiere vereinbarte Besorgungen, Anfahrt oder Termine eigenständig.","Kläre Wünsche, die sie persönlich betreffen, statt sie festzulegen."],
      [REF.pregnancy]),
  ],
  [
    d(
      ["Mental Load meint nicht nur das Tun, sondern auch das gedankliche Vorausplanen, Entscheiden und Erinnern.",
       "In der Forschung werden vier Schritte unterschieden: Bedürfnisse voraussehen, Optionen finden, entscheiden und die Umsetzung überprüfen.",
       "Ein Mann kann viel erledigen und trotzdem die Gesamtorganisation beim anderen Elternteil lassen."],
      ["Liste für deinen Bereich die wiederkehrenden Auslöser auf: Was wird wann knapp oder fällig?","Trage eigene Erinnerungen ein – auf deinem Gerät.","Überprüfe selbst, ob Aufgabe und Nachbereitung wirklich abgeschlossen sind."],
      [REF.mental]),
    d(
      ["Vollständige Zuständigkeit beginnt mit dem Überblick und endet erst nach Durchführung und Nachbereitung.",
       "Gemeinsame oder persönliche Entscheidungen werden abgesprochen; die Organisation einzelner Schritte übernimmst du dann selbst.",
       "Eine einmalige Hilfsaktion ersetzt keine verlässliche Routine."],
      ["Definiere für eine Aufgabe einen Startauslöser, ein Ziel und einen Ersatzplan.","Recherchiere selbst, welche Materialien oder Informationen fehlen.","Stimme nur die Entscheidungen ab, die beide betreffen; übernimm den Rest."],
      [REF.mental]),
    d(
      ["Vorausschauende Organisation bedeutet, vor dem akuten Mangel oder Zeitdruck tätig zu werden.",
       "Initiative und Bevormundung sind verschieden: Einkauf planen ist sinnvoll, Wünsche des anderen ignorieren nicht.",
       "Ein guter Standard ist eine Routine, die auch ohne tägliche Erinnerungen funktioniert."],
      ["Prüfe einmal pro Woche deine Zuständigkeitsbereiche.","Plane die nächsten Schritte und reserviere Zeit dafür.","Frage nach persönlichen Wünschen und bleibe selbst für die Umsetzung zuständig."],
      [REF.mental]),
  ],
  [
    d(
      ["Geburtsvorbereitung umfasst nicht nur die Kliniktasche, sondern auch Gespräche über Wünsche, Begleitung und organisatorische Fragen.",
       "Ein Geburtsverlauf lässt sich nicht vollständig planen. Vorbereitung soll Handlungsfähigkeit erhöhen, nicht Kontrolle versprechen.",
       "Die Schwangere entscheidet über ihren Körper; Fachpersonen beraten zu medizinischen Optionen."],
      ["Organisiere eigenständig Anfahrt, erreichbare Kontakte und nötige Unterlagen.","Informiere dich über den Ort und die Abläufe der geplanten Geburt.","Frage, was deine Partnerin sich für deine Rolle wünscht – ohne eine Entscheidung vorwegzunehmen."],
      [REF.birth]),
    d(
      ["Während der Geburt können Bedürfnisse sich schnell ändern. Was gerade noch gut war, kann wenig später unerwünscht sein.",
       "Körperkontakt, Trinken, Ruhe oder Ansprache sollten nicht aufgedrängt werden.",
       "Eine begleitende Person kann Orientierung geben, zuhören und Kommunikation unterstützen, ohne die Führung über den Körper der Gebärenden zu beanspruchen."],
      ["Respektiere jedes Nein unmittelbar.","Frage bei Bedarf kurz: Soll ich zuhören, eine Frage stellen oder einfach da sein?","Bleib ansprechbar und hol das Behandlungsteam hinzu, wenn medizinische Fragen auftreten."],
      [REF.birth]),
    d(
      ["Geburtswünsche können wichtig sein, sind aber keine Verpflichtung und keine Garantie für den Verlauf.",
       "Bei unerwarteten Entwicklungen unterstützen Ruhe, verständliche Informationen und die Zusammenarbeit mit den Fachpersonen.",
       "Deine Aufgabe ist nicht, medizinische Entscheidungen zu erzwingen oder zu ersetzen."],
      ["Lass dir Begriffe bei Bedarf erklären.","Hilf deiner Partnerin, Fragen an das Behandlungsteam zu formulieren.","Organisiere im Hintergrund, was für den weiteren Weg gebraucht wird."],
      [REF.birth]),
  ],
  [
    d(
      ["Im Wochenbett stehen körperliche Erholung, Versorgung des Kindes und die neue Familienorganisation im Vordergrund.",
       "Nach einer Geburt ist die körperliche Regeneration individuell; insbesondere nach einem Kaiserschnitt kann Unterstützung anders aussehen.",
       "Die Verantwortung für Verpflegung und Organisation muss nicht bei der Person liegen, die sich erholen soll."],
      ["Plane Mahlzeiten und Einkauf schon vor der Geburt.","Klärt gemeinsam, welche Besuchsregeln zu euch passen.","Übernimm Haushaltsaufgaben ohne tägliche Aufforderungen."],
      [REF.postpartum]),
    d(
      ["Besuche sind freiwillig und sollten sich an den Bedürfnissen der Familie orientieren.",
       "Freundliche klare Kommunikation kann die Person im Wochenbett von zusätzlichen Diskussionen entlasten.",
       "Grenzen verändern sich: Ein heute passender Besuch kann morgen zu viel sein."],
      ["Formuliere eine gemeinsame Besuchsregel.","Informiere Angehörige selbst über die aktuelle Situation.","Organisiere gegebenenfalls praktische Hilfe statt Geschenke oder Besuchsdruck."],
      [REF.postpartum]),
    d(
      ["Auch mit einem Neugeborenen laufen Essen, Wäsche, Putzen und Besorgungen weiter.",
       "Schlaf und Erholung sind häufig knapp; die konkrete Aufgabenverteilung muss zum Fütteralltag und zu den Bedürfnissen aller passen.",
       "Selbstständige Verantwortung umfasst auch Windelvorräte, gereinigte Materialien und einen Plan B."],
      ["Schreibe eine kurze tägliche Checkliste für deinen Bereich.","Halte Vorräte und notwendige Telefonnummern bereit.","Überprüfe die Umsetzung selbst, statt die Partnerin zu fragen, was noch fehlt."],
      [REF.postpartum]),
  ],
  [
    d(
      ["Die Betreuung des eigenen Babys ist Elternverantwortung, kein Babysitten für den anderen Elternteil.",
       "Versorgung bedeutet auch: Material kennen, Routinen planen und Sicherheitsinformationen selbst nachlesen.",
       "Beim Wickeln darf ein Baby nicht allein auf erhöhten Flächen liegen."],
      ["Mach dich selbst mit Wickelplatz, Kleidung und Vorräten vertraut.","Übe die Versorgung und hole bei Unsicherheit fachliche Anleitung.","Plane die Nachbereitung selbst ein."],
      [REF.infant]),
    d(
      ["Ein schreiendes Baby braucht nicht immer die gleiche Reaktion. Hunger, Müdigkeit, Nähe oder Unbehagen können eine Rolle spielen.",
       "Niemals ein Baby schütteln – schon kurzes Schütteln kann schwere Verletzungen verursachen.",
       "Bei Überforderung: Baby an einen sicheren Ort legen, kurz Abstand gewinnen und Hilfe organisieren."],
      ["Prüfe mögliche Grundbedürfnisse ruhig und nacheinander.","Wenn du die Kontrolle zu verlieren drohst, lege das Baby sicher ab und hole Unterstützung.","Informiere dich über Schreiambulanzen oder Frühe Hilfen, bevor eine Belastungssituation eskaliert."],
      [REF.crying,REF.overwhelm]),
    d(
      ["Eine gute Routine umfasst Vorräte, Termine, Hygiene und das Erkennen, wann etwas ausgeht.",
       "Du brauchst eigene Erinnerungssysteme, statt Lena zu deinem Kalender zu machen.",
       "Sicherheit geht vor Perfektion: Fehlende Informationen suchst du bei verlässlichen Fachquellen."],
      ["Übernimm eine Versorgungskette von Vorbereitung bis Aufräumen.","Behalte Vorräte im Blick und kümmere dich um Ersatz.","Trage Termine selbst ein und prüfe offene Schritte."],
      [REF.infant]),
  ],
  [
    d(
      ["Lenas Selbstbestimmung über ihre Zeit, Interessen und Grenzen bleibt auch nach der Geburt wichtig.",
       "Ein freier Nachmittag ist nur dann entlastend, wenn sie nicht vorher die gesamte Betreuung planen muss.",
       "Zeit für sich selbst ist keine Belohnung, die sie sich durch erledigte Hausarbeit verdienen muss."],
      ["Organisiere eine Betreuungseinheit inklusive Vorbereitung und Versorgung.","Frage, ob ein Zeitfenster passend ist, nicht was sie damit machen wird.","Gib Raum ohne Erwartung auf Gegenleistung."],
      [REF.mental]),
    d(
      ["Nicht jede Sorge verlangt sofort einen Lösungsvorschlag.",
       "Zuhören heißt nachfragen, verstanden haben wollen und auch unangenehme Gefühle gelten lassen.",
       "Ratschläge, Entscheidungen und Bewertungen können zusätzlichen Druck auslösen, wenn gerade Verständnis gesucht wird."],
      ["Frage, ob Zuhören oder gemeinsames Planen gewünscht ist.","Lass deine Partnerin aussprechen.","Übernimm vereinbarte praktische Schritte, statt nur gute Absichten zu äußern."],
      [REF.mental]),
    d(
      ["Mittragen entsteht durch verlässliche Routinen und regelmäßiges Nachdenken über die eigene Zuständigkeit.",
       "Ein gelegentliches großes Engagement ist kein Ersatz für alltägliche Verantwortung.",
       "Auch in schwierigen Phasen braucht es faire Absprachen, Anpassungsfähigkeit und gegebenenfalls Unterstützung von außen."],
      ["Definiere zwei dauerhafte Bereiche.","Prüfe wöchentlich selbst, ob deine Routinen funktionieren.","Sprich über nötige Anpassungen, ohne die gesamte Organisation zurückzugeben."],
      [REF.mental]),
  ],
];

/** Zusätzliche Lerneinheiten heben die Kurse von drei Botschafts-Szenen zu konkretem Wissen und Umsetzen. */
const MORE: LearningLesson[][] = [
  [
    add("Sicher einkaufen und Essen zubereiten","Wichtige Lebensmittelrisiken kennen und eigenständig sichere Mahlzeiten organisieren.",
      "Tom steht an der Kühltheke und vergleicht ein Produkt mit rohem tierischem Anteil mit einer durchgegarten Alternative.",
      "Ich möchte nichts falsch einkaufen. Ich schaue mir die Empfehlungen selbst an.",
      "Super. Ich hätte gern etwas, das ich gut vertrage.",
      "Rohe tierische Lebensmittel sind in der Schwangerschaft zu meiden. Bei allen Produkten zählen Auswahl, Lagerung und Hygiene. Auch Pflanzenprodukte können mit Keimen belastet sein.",
      "Erstelle einen Einkauf für zwei Tage – inklusive Lagerung, Küchenhygiene und einer gut gegarten Alternative.",
      ["Bei der Auswahl gilt: keine rohen tierischen Lebensmittel; Fleisch, Fisch und Eier ausreichend durcherhitzen.",
       "Gründliches Waschen von frischem Obst und Gemüse ist wichtig. Tiefkühlbeeren und Sprossen nur nach starkem Erhitzen verwenden.",
       "Listerien können sich auch bei Kühlschranktemperaturen vermehren. Frische, Lagerung und saubere Zubereitung sind deshalb genauso relevant wie die Lebensmittelauswahl.",
       "Informiere dich selbst, anstatt deiner Partnerin vorzuschreiben, was sie essen darf. Persönliche Vorlieben oder Unverträglichkeiten erfragt ihr gemeinsam."],
      ["Wähle ein einfaches Gericht und suche geeignete Zutaten.","Prüfe bei fertigen Produkten Aufbewahrung und Zubereitung; wasche die Hände und trenne roh von verzehrfertig.","Koche, räume auf und plane den nächsten Einkauf."],
      [REF.food,REF.nutrition]),
    add("Alkohol, Koffein und verlässliche Informationen","Empfehlungen unterscheiden und Informationen richtig einordnen.",
      "Tom kauft Getränke. Neben dem Kaffee stehen Cola, Tee und alkoholfreie Alternativen.",
      "Ich wusste gar nicht, dass auch Tee und Schokolade Koffein enthalten können.",
      "Ich möchte selbst auswählen. Gut, dass du Alternativen mitbringst.",
      "Die 2026er deutschen Empfehlungen raten in der Schwangerschaft von Alkohol ab. Koffein soll aus allen Quellen insgesamt 200 Milligramm am Tag nicht übersteigen. Das ist ein Orientierungswert, keine Aufforderung zur Kontrolle deiner Partnerin.",
      "Prüfe bei Getränken die Inhaltsstoffe und biete passende Alternativen an. Wenn es um Supplemente oder Arzneimittel geht, verweist du an Fachpersonen.",
      ["Alkoholkonsum in der Schwangerschaft wird nicht empfohlen; es gilt: kein Alkohol.",
       "Für Koffein nennen die deutschen Handlungsempfehlungen höchstens 200 mg am Tag aus allen Lebensmitteln und Getränken zusammen.",
       "Koffein kommt nicht nur in Kaffee vor, sondern etwa auch in Tee, Cola, Energydrinks, Guarana und Schokolade. Mengen schwanken.",
       "Über Nahrungsergänzungsmittel und Medikamente entscheidet die Schwangere mit fachlicher Beratung – nicht der Partner."],
      ["Informiere dich über Zutaten und Mengenangaben beim Einkauf.","Sorge für alkoholfreie und bei Bedarf koffeinfreie Optionen.","Recherchiere Gesundheitsfragen bei offiziellen Stellen und halte deine Quellen fest."],
      [REF.caffeine,REF.pregnancy]),
    add("Beschwerden erkennen, Hilfe organisieren","Eigene Grenzen kennen und bei ernsthaften Beschwerden Unterstützung organisieren.",
      "Lena erbricht stark und kann kaum Flüssigkeit bei sich behalten. Tom merkt, dass das nicht einfach mit einem Tee gelöst ist.",
      "Das klingt ernst. Ich organisiere jetzt medizinische Rücksprache und kümmere mich um den Rest.",
      "Danke. Ich möchte das nicht auch noch selbst koordinieren müssen.",
      "Schwere, anhaltende Schwangerschaftsübelkeit kann eine Behandlung nötig machen. Tom stellt keine Diagnose, sondern hilft, qualifizierte Versorgung zu erreichen.",
      "Speichere Kontakte von Praxis, Hebamme und Klinik und erstelle einen Plan, wie du bei dringenden Problemen Unterstützung organisierst.",
      ["Übliche Schwangerschaftsbeschwerden unterscheiden sich sehr. Verharmlosung hilft nicht.",
       "Wenn Übelkeit und Erbrechen so stark sind, dass ausreichend Flüssigkeit kaum möglich ist, ist eine zeitnahe medizinische Einschätzung wichtig.",
       "Ein Onlinekurs kann keine Diagnose stellen und keine Behandlung festlegen; bei akuten Notfällen ist umgehend Notfallhilfe nötig.",
       "Du kannst Kontaktwege, Fahrt und Haushalt eigenständig organisieren, während die gesundheitlichen Entscheidungen bei deiner Partnerin und Fachpersonen bleiben."],
      ["Speichere wichtige Kontakt- und Anfahrtsinformationen auf deinem Handy.","Frage in einer konkreten Situation nach Bedürfnissen, ohne Symptome zu bewerten.","Organisiere bei schweren oder ungewöhnlichen Beschwerden zügig fachliche Abklärung."],
      [REF.nausea]),
  ],
  [
    add("Eine Zuständigkeitskarte erstellen","Verantwortung schriftlich, messbar und wiederholbar gestalten.",
      "Tom will künftig für Wäsche und Waschmittel verantwortlich sein, merkt aber, dass er noch immer auf Lenas Erinnerung wartet.",
      "Ich lege fest, wann ich prüfe, ob Waschmittel oder saubere Kleidung knapp wird.",
      "Gut. Dann ist das wirklich nicht mehr auf meiner Liste.",
      "Eine vollständige Zuständigkeit hat einen Auslöser, eine Routine, einen Mindeststandard und einen Ersatzplan. Lena muss nichts kontrollieren.",
      "Erstelle deine eigene Karte mit Startsignal, Erinnerung und Nachbereitung.",
      ["Der Auslöser beantwortet: Woran bemerkst du frühzeitig, dass gehandelt werden muss?",
       "Der Standard beantwortet: Woran erkennst du, dass die Arbeit vollständig erledigt ist?",
       "Der Ersatzplan beantwortet: Was passiert, wenn du krank bist oder etwas Unerwartetes dazwischenkommt?"],
      ["Notiere einen konkreten Auslöser.","Lege Kalendererinnerungen und Kontrollintervalle fest.","Schreibe einen realistischen Plan B auf."],
      [REF.mental]),
    add("Wenn alte Muster zurückkommen","Rückfälle erkennen und eigene Verantwortung selbst korrigieren.",
      "Nach zwei Wochen übernimmt Tom den Einkauf nicht mehr regelmäßig. Lena fragt erneut nach.",
      "Stimmt, ich habe meine Routine schleifen lassen. Ich richte sie neu ein.",
      "Mir hilft, wenn ich mich nicht wieder darum kümmern muss.",
      "Routinen ändern sich. Entscheidend ist, dass Tom das Problem bemerkt und selbst repariert, nicht dass Lena einen neuen Plan für ihn macht.",
      "Schau deinen Verantwortungsbereich ehrlich an und verbessere einen schwachen Schritt.",
      ["Eine gelungene Woche ist nicht das Ende, sondern der Anfang einer Routine.",
       "Wenn ein Plan scheitert, unterscheide zwischen schlechter Planung, fehlenden Ressourcen und unrealistischen Standards.",
       "Besprecht notwendige Anpassungen gemeinsam, aber delegiere nicht die gesamte Reparatur an Lena."],
      ["Erkenne das konkrete Hindernis.","Ändere genau eine Routine, die das Hindernis abfängt.","Prüfe nach einer Woche eigenständig, ob es besser funktioniert."],
      [REF.mental]),
  ],
  [
    add("Deine Checkliste für den Geburtsbeginn","Bei Unsicherheit organisatorisch vorbereitet sein.",
      "Nachts gibt es Anzeichen, dass die Geburt beginnen könnte. Tom gerät zunächst in Hektik.",
      "Wir haben die Nummer der Geburtsstation gespeichert. Ich frage dort nach, was wir jetzt tun sollen.",
      "Gut. Dann müssen wir nicht planlos suchen.",
      "Nicht der Partner entscheidet, ob eine Geburt medizinisch begonnen hat. Er kann Kontakte, Unterlagen, Fahrt und Ruhe organisieren und Fachpersonen befragen.",
      "Erstelle jetzt eine gemeinsame Kontakt- und Anfahrtsliste, bevor du sie brauchst.",
      ["Bei Anzeichen für einen Geburtsbeginn sollen individuelle Hinweise von Hebamme oder Klinik beachtet werden.",
       "Eine fertig organisierte Tasche und klare Kontaktwege können Stress vermeiden.",
       "Bei Unsicherheit können zuständige Fachpersonen erklären, welches Vorgehen passend ist."],
      ["Speichere Klinik, Hebamme und relevante Notrufnummern.","Plane Anfahrt und Ersatzroute.","Kläre mit der Partnerin, welche organisatorischen Aufgaben du übernimmst."],
      [REF.birth]),
    add("Die erste Zeit danach organisieren","Nicht nur bis zur Geburt, sondern auch danach vorausdenken.",
      "Die Geburt ist geschafft. Tom ist glücklich – und bemerkt, dass noch niemand Einkauf und Versorgung zu Hause organisiert hat.",
      "Ich kümmere mich um das Essen und um alles, was wir für die ersten Tage brauchen.",
      "Danke. Lass uns in Ruhe ankommen.",
      "Der Familienalltag beginnt nicht erst nach der Heimfahrt. Vorbereitung kann auch Essen, Betreuung weiterer Kinder und einen ruhigen Anfang umfassen.",
      "Plane zusammen mit den eigenen Zuständigkeiten die ersten drei Tage nach der Rückkehr.",
      ["Eine Geburt kann anders verlaufen als erwartet. Die Organisation danach muss flexibel sein.",
       "Mahlzeiten, Hygieneartikel und Erreichbarkeit von Unterstützung können früh vorbereitet werden.",
       "Ruhezeiten und die Wünsche beider Eltern berücksichtigen – insbesondere die Regeneration nach der Geburt."],
      ["Organisiere Vorräte und einfache Mahlzeiten.","Kläre bei Bedarf die Versorgung älterer Kinder oder Haustiere.","Halte Nachsorgekontakte und Unterstützungsmöglichkeiten bereit."],
      [REF.birth,REF.postpartum]),
  ],
  [
    add("Der Sieben-Tage-Plan","Versorgung der Familie verlässlich organisieren, ohne Zusatzarbeit zu erzeugen.",
      "Der Kühlschrank wird leer; Tom merkt, dass Essen, Wäsche und Besuche gleichzeitig geplant werden müssen.",
      "Ich mache einen Wochenplan mit Essen, Haushalt und freien Ruhezeiten. Wir stimmen nur die wichtigen Wünsche ab.",
      "Dann kann ich mich auf die Erholung konzentrieren.",
      "Nicht der perfekt geschriebene Plan ist das Ziel, sondern praktische Entlastung mit realistischem Ersatz, wenn der Tag anders läuft.",
      "Schreibe einen machbaren Sieben-Tage-Plan und nenne für jeden Tag deine Zuständigkeiten.",
      ["Plane nicht nur die schönen Momente, sondern Versorgung und Nachbereitung.",
       "Berücksichtige Erschöpfung, Füttern, Erholung und mögliche Planänderungen.",
       "Organisiere Hilfe von außen dort, wo die eigenen Kräfte nicht reichen."],
      ["Erstelle eine Einkaufsliste und drei einfache Mahlzeitenalternativen.","Trage deine Haushalts- und Betreuungsaufgaben ein.","Plane für unerwartete Termine und Müdigkeit einen Ersatz ein."],
      [REF.postpartum]),
    add("Nachsorge und Hilfe finden","Professionelle Unterstützung rechtzeitig einbeziehen.",
      "Lena hat Fragen zu ihrer Erholung, Tom weiß nicht, wer zuständig ist.",
      "Ich suche die Kontaktdaten der Hebamme und der Nachsorgepraxis heraus.",
      "Gut. Ich möchte selbst besprechen, was mir gesundheitlich wichtig ist.",
      "Der Mann kann Kontaktwege und Organisation übernehmen. Die medizinische Beratung erfolgt durch qualifizierte Fachpersonen; Lena bestimmt über ihre Versorgung.",
      "Erstelle eine erreichbare Kontaktliste und kläre Unterstützung im Wochenbett.",
      ["Nachsorge und individuelle Regeneration gehören in die Betreuung von Hebamme oder medizinischem Fachpersonal.",
       "Auch psychische Belastungen nach der Geburt verdienen ernsthafte Aufmerksamkeit und gegebenenfalls professionelle Unterstützung.",
       "Hilfe organisieren heißt nicht, gegen den Willen der Partnerin über ihren Körper oder ihre Behandlung zu bestimmen."],
      ["Finde wichtige Nachsorgekontakte.","Halte Telefon, Erreichbarkeit und Anfahrt griffbereit.","Sorge für Entlastung, damit Termine und Erholung praktisch möglich sind."],
      [REF.postpartum]),
  ],
  [
    add("Sicher schlafen","Die Schlafumgebung eines Säuglings nach offiziellen Empfehlungen gestalten.",
      "Tom richtet das Babybett her. Ein großes Kissen und Kuscheltiere liegen darin.",
      "Ich habe nachgelesen: Für den Schlaf gehören diese Sachen nicht ins Babybett.",
      "Gut, dann schaffen wir gemeinsam eine sichere Umgebung.",
      "Für das erste Lebensjahr empfehlen Fachinformationen die Rückenlage, eine feste ebene Matratze, möglichst einen Schlafsack und ein eigenes Bett im Elternschlafzimmer. Überwärmung und Rauch vermeiden.",
      "Überprüfe selbst den Schlafplatz anhand offizieller Empfehlungen und kläre Besonderheiten mit einer Fachperson.",
      ["Zum Schlafen immer auf den Rücken legen; die Seitenlage gilt nicht als sichere Standard-Schlafposition.",
       "Das Bett sollte möglichst im Elternschlafzimmer stehen und eine feste, ebene Matratze haben.",
       "Kein Kopfkissen, keine weichen Bettumrandungen, möglichst Schlafsack statt Bettdecke; Überwärmung und Rauch vermeiden."],
      ["Prüfe Matratze und Schlafposition.","Entferne lose Kissen, Decken und Gegenstände aus dem Babybett.","Lies die offizielle Information und besprecht besondere Situationen mit Kinderarzt oder Hebamme."],
      [REF.sleep]),
    add("Wickeln und Tragen sicher lernen","Sichere Handgriffe und Umgebungen selbstständig einüben.",
      "Tom wickelt das Baby auf einer erhöhten Kommode. Das Telefon klingelt.",
      "Ich gehe nicht weg, solange das Baby hier liegt. Ich sichere zuerst die Situation.",
      "Genau – dann müssen wir uns keine Sorgen um einen Sturz machen.",
      "Ein Baby darf nie unbeaufsichtigt auf Wickeltisch, Sofa oder anderen erhöhten Flächen liegen. Für sichere praktische Handgriffe lohnt Anleitung durch Hebamme oder Fachpersonal.",
      "Richte selbst einen sicheren Wickelplatz ein und übe die Routine unter geeigneter Anleitung.",
      ["Stürze von erhöhten Flächen sind ein vermeidbares Risiko. Am Wickeltisch immer eine Hand am Kind lassen.",
       "Material sollte vor dem Wickeln griffbereit sein, damit du dich nicht entfernen musst.",
       "Online-Wissen ersetzt keine praktische Einweisung bei Unsicherheit."],
      ["Platziere alle notwendigen Dinge in Reichweite.","Übe die sichere Versorgung, ohne das Kind allein zu lassen.","Organisiere die Reinigung und das Auffüllen der Materialien."],
      [REF.infant]),
    add("Wenn dir alles zu viel wird","Überforderung früh erkennen und sichere Hilfe organisieren.",
      "Nach einer unruhigen Nacht merkt Tom, wie seine Geduld schwindet.",
      "Ich brauche kurz Unterstützung. Ich lege das Baby sicher ab und rufe jemanden an.",
      "Gut, dass du das sagst. Wir organisieren Entlastung.",
      "Überforderung kann allen Eltern passieren. Entscheidend ist ein sicherer Notfallplan: Baby niemals schütteln, sicher ablegen, selbst beruhigen, Hilfe holen.",
      "Notiere deine Warnzeichen und zwei konkrete Personen oder Stellen, die du kontaktieren kannst.",
      ["Schon kurzes Schütteln kann das Baby schwer verletzen oder töten.",
       "Wenn du die Kontrolle zu verlieren drohst, lege das Baby sicher ab und gewinne kurz Abstand.",
       "Unterstützung gibt es unter anderem bei Kinderarzt, Beratungsstellen und Schreiambulanzen."],
      ["Schreibe deine persönlichen Stresswarnzeichen auf.","Lege einen sicheren Ablauf für akute Überforderung fest.","Notiere mindestens zwei erreichbare Hilfekontakte."],
      [REF.overwhelm,REF.crying]),
  ],
  [
    add("Freiräume ohne versteckte Bedingungen","Die gesamte Organisation von Betreuung und Auszeit selbst übernehmen.",
      "Lena möchte eine Stunde für sich haben. Tom fragt sie nach einem detaillierten Babyplan.",
      "Ich merke gerade, dass ich deine Pause wieder zu einer Planungsaufgabe mache.",
      "Ja, ich möchte nicht vorher hundert Dinge vorbereiten müssen.",
      "Freiraum ist erst echte Entlastung, wenn Tom Vorbereitung und Verantwortung währenddessen selbst trägt.",
      "Organisiere eine eigene Betreuungseinheit samt Essen, Material und Nachbereitung.",
      ["Wenn die Partnerin vor einer Auszeit alles vorbereiten muss, bleibt ihre Organisationslast bestehen.",
       "Respektvolle Abstimmung ist wichtig; eine vollständige Anweisungsliste einzufordern ist etwas anderes.",
       "Verlässliche Zuständigkeit schafft Freiraum, ohne dass eine Gegenleistung erwartet wird."],
      ["Plane die Betreuung selbst.","Kläre kurze wichtige Absprachen.","Übernimm Versorgung und Nachbereitung vollständig."],
      [REF.mental]),
    add("Euer gemeinsamer Check-in","Erwartungen besprechen, ohne dass Lena die Projektleitung übernimmt.",
      "Tom bemerkt, dass die Aufgabenverteilung nach einigen Wochen nicht mehr funktioniert.",
      "Ich habe meine Zuständigkeiten geprüft. Zwei Dinge möchte ich ändern – können wir kurz besprechen, ob das für uns passt?",
      "Gern. Mir ist wichtig, dass du auch danach selbst dranbleibst.",
      "Ein Check-in dient dem gegenseitigen Verstehen. Er ist kein Termin, bei dem Lena eine neue Liste mit Aufgaben für Tom schreibt.",
      "Plane einen kurzen Austausch, bring konkrete eigene Vorschläge mit und halte deine Aufgaben selbst nach.",
      ["Gute Absprachen berücksichtigen Veränderungen von Arbeit, Schlaf und Belastung.",
       "Beide können Wünsche äußern und Grenzen setzen, ohne dass einer den anderen erzieht.",
       "Fortschritt zeigt sich in eigenständigen Routinen – nicht in der Zahl der Gespräche."],
      ["Prüfe vor dem Gespräch deine eigene Umsetzung.","Schlage konkrete Verbesserungen vor.","Halte die beschlossenen eigenen Schritte selbst fest."],
      [REF.mental]),
  ],
];

const EXTRA_QUIZ: Question[][] = [
  [
    ask("Tom kauft für Lena Sushi mit rohem Fisch. Was sollte er stattdessen tun?",["Das Essen einfach als unproblematisch ansehen.","Eine geeignete Alternative mit ausreichend gegarten Zutaten wählen und hygienisch zubereiten.","Lena dafür verantwortlich machen, ihn nachträglich zu kontrollieren."],1,"Die deutschen Handlungsempfehlungen raten während der Schwangerschaft von rohen tierischen Lebensmitteln ab."),
    ask("Lena kann wegen starker Übelkeit kaum Flüssigkeit behalten. Wie handelt Tom?",["Er unterstützt eine zeitnahe medizinische Abklärung und übernimmt die Organisation.","Er wartet mehrere Tage, weil Übelkeit immer harmlos ist.","Er gibt ihr ohne fachliche Beratung ein Medikament."],0,"Starke anhaltende Beschwerden können behandlungsbedürftig sein. Tom organisiert Hilfe, statt selbst zu diagnostizieren."),
  ],
  [
    ask("Tom kümmert sich um die Wäsche, vergisst aber regelmäßig das Waschmittel. Was fehlt?",["Lenas perfekter Einkaufszettel.","Die tägliche Kontrolle durch Lena.","Eine eigene Routine zur Vorratsprüfung und Nachbereitung."],2,"Komplette Zuständigkeit schließt die unsichtbare Organisation ein."),
    ask("Lena hat andere Vorlieben beim Essen als Tom. Was bedeutet Mittragen?",["Tom entscheidet grundsätzlich allein.","Tom plant selbst und stimmt persönliche Wünsche respektvoll ab.","Tom bittet sie, den gesamten Wocheneinkauf zu planen."],1,"Initiative und gegenseitige Selbstbestimmung gehören zusammen."),
  ],
  [
    ask("Es ist unklar, ob die Fahrt zur Klinik jetzt nötig ist. Wie handelt Tom?",["Er nutzt die vorbereiteten Kontakte und lässt sich von zuständigen Fachpersonen beraten.","Er diagnostiziert selbst den Geburtsbeginn.","Er fährt erst, wenn alle anderen Aufgaben erledigt sind."],0,"Organisation darfst du übernehmen; medizinische Einschätzung gehört zu qualifizierten Fachpersonen."),
    ask("Nach der Geburt fehlt zu Hause Essen. Was war eine sinnvolle Vorbereitung?",["Warten, bis Lena eine Liste schreibt.","Sich ausschließlich um Deko kümmern.","Mahlzeiten, Vorräte und mögliche Hilfe vorher organisieren."],2,"Ein geschützter Start braucht praktische Versorgung."),
  ],
  [
    ask("Tom möchte spontan Gäste einladen, Lena braucht Ruhe. Was ist angemessen?",["Er lädt sie trotzdem ein.","Er respektiert ihre Grenze und übernimmt die Kommunikation.","Er überlässt ihr das Absagen sämtlicher Besuche."],1,"Auch die Kommunikation nach außen ist Organisationsarbeit."),
    ask("Warum hilft ein Plan für die ersten Tage im Wochenbett?",["Er entlastet bei Essen, Haushalt und Unterstützung, bleibt aber flexibel.","Weil die Geburt immer genauso verläuft wie geplant.","Weil Erholung sonst keine Rolle spielt."],0,"Ein machbarer Versorgungsplan lässt Raum für Änderungen."),
  ],
  [
    ask("Wie richtet Tom einen sicheren Schlafplatz ein?",["Mit weichem Kissen und Kuscheltieren.","Mit Seitenlagerung als Standard.","Mit Rückenlage, fester ebener Matratze und möglichst Schlafsack ohne lose Kissen."],2,"Offizielle Empfehlungen zum sicheren Babyschlaf legen den Schwerpunkt auf Rückenlage und eine sparsame Schlafumgebung."),
    ask("Tom merkt, dass er beim anhaltenden Schreien die Kontrolle verlieren könnte. Was tut er?",["Er schüttelt das Baby, um das Schreien zu stoppen.","Er legt das Baby an einen sicheren Ort, gewinnt Abstand und organisiert Hilfe.","Er gibt dem Baby eigenmächtig ein beruhigendes Medikament."],1,"Niemals schütteln. Ein klarer Unterstützungsplan schützt alle."),
  ],
  [
    ask("Lena bekommt einen freien Nachmittag, muss aber vorher die gesamte Betreuung planen. Was fehlt?",["Tom müsste sich selbst die Versorgung inklusive Vorbereitung organisieren.","Lena sollte die Liste nur früher schreiben.","Der freie Nachmittag ist deshalb grundsätzlich nicht sinnvoll."],0,"Eine Auszeit sollte keine zusätzliche Organisationsarbeit auslösen."),
    ask("Wie geht Tom mit einer neuen Aufgabenverteilung um?",["Er erwartet tägliche Erinnerungen.","Er macht nur vage Versprechen.","Er bringt konkrete eigene Vorschläge ein und hält deren Umsetzung selbst nach."],2,"Vereinbarungen entfalten Wirkung durch verlässliche Eigeninitiative."),
  ],
];

export const COURSE: LearningModule[] = BASE_COURSE.map((module,m)=>({
  ...module,
  lessons: [
    ...module.lessons.map((lesson,i)=>({
      ...lesson,
      ...(ORIGINAL[m]?.[i] ?? d([],[],[])),
    })),
    ...(MORE[m] ?? []),
  ],
  quiz: [...module.quiz,...(EXTRA_QUIZ[m] ?? [])],
}));
