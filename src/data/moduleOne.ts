/**
 * MITTRAGEN – Modul 01, didaktisch überarbeitete Testfassung (14.11.2026).
 * Alle Inhalte richten sich an den werdenden Vater; Lena muss weder unterrichten noch kontrollieren.
 * Medizinische Quellen: Netz­werk Gesund ins Leben (Handlungsempfehlungen 2026), BIÖG, IQWiG.
 * Medizinische Fachfreigabe vor kommerziellem Kursstart steht noch aus.
 */
import type { LearningModule, LearningLesson, LearningSource, LearningChallenge } from "./professionalCourse";

const S = {
  grundlagen: {label:"Netzwerk Gesund ins Leben – Handlungsempfehlungen 2026",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/"},
  body: {label:"BIÖG – Körperliche Veränderungen in der Schwangerschaft",url:"https://www.familienplanung.de/schwangerschaft/beschwerden-und-krankheiten/beschwerden-in-der-schwangerschaft-wie-sich-der-koerper-veraendert/"},
  weeks: {label:"BIÖG – 5. bis 8. Schwangerschaftswoche",url:"https://www.familienplanung.de/schwangerschaft/schwangerschaftswochen/5-bis-8-schwangerschaftswoche/"},
  folate: {label:"Gesund ins Leben – Folsäure (Empfehlungen 2026)",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/supplemente/supplement-folsaeure/"},
  iodine: {label:"Gesund ins Leben – Jod (Empfehlungen 2026)",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/supplemente/supplement-jod/"},
  dha: {label:"Gesund ins Leben – DHA (Empfehlungen 2026)",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/supplemente/supplement-dha"},
  iron: {label:"Gesund ins Leben – Eisen (Empfehlungen 2026)",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/supplemente/supplement-eisen/"},
  nutrition: {label:"Gesund ins Leben – Ernährung und Getränke",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/ernaehrung/ernaehrungsweise-und-getraenke-in-der-schwangerschaft/"},
  food: {label:"Gesund ins Leben – Infektionen durch Lebensmittel vermeiden",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/schutz-vor-infektionen-durch-lebensmittel-in-der-schwangerschaft/"},
  caffeine: {label:"Gesund ins Leben – Koffein in der Schwangerschaft",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/weitere-gesundheitsaspekte/koffein-in-der-schwangerschaft/"},
  alcohol: {label:"Gesund ins Leben – Alkohol vor und in der Schwangerschaft",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/weitere-gesundheitsaspekte/alkohol-vor-und-in-der-schwangerschaft/"},
  meds: {label:"Gesund ins Leben – Arzneimittel in der Schwangerschaft",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/weitere-gesundheitsaspekte/arzneimittel-vor-und-in-der-schwangerschaft/"},
  checkups: {label:"BIÖG – Vorsorgeuntersuchungen in der Schwangerschaft",url:"https://www.familienplanung.de/schwangerschaft/schwangerschaftsvorsorge-und-begleitung/vorsorge-zur-sicherheit/"},
  pass: {label:"BIÖG – Der Mutterpass",url:"https://www.familienplanung.de/schwangerschaft/schwangerschaftsvorsorge/der-mutterpass/"},
  physical: {label:"Gesund ins Leben – Bewegung in der Schwangerschaft",url:"https://www.gesund-ins-leben.de/fuer-fachkreise/familien-vor-und-in-der-schwangerschaft/handlungsempfehlungen/bewegung/bewegungsausmass-und-art-vor-und-in-der-schwangerschaft/"},
  bleeding: {label:"BIÖG – Blutungen in der Schwangerschaft",url:"https://www.familienplanung.de/schwangerschaft/beschwerden-und-krankheiten/akute-erkrankungen-und-infektionen/blutungen/"},
  headache: {label:"BIÖG – Kopfschmerzen in der Schwangerschaft",url:"https://www.familienplanung.de/schwangerschaft/die-schwangerschaft/beschwerden-und-krankheiten/beschwerden/kopfschmerzen/"},
  mental: {label:"Daminger (2019) – Kognitive Haushaltsarbeit",url:"https://doi.org/10.1177/0003122419859007"},
} satisfies Record<string,LearningSource>;

const c = (prompt:string, options:[string,string,string],correct:0|1|2, explanation:string):LearningChallenge =>
  ({prompt,options,correct,explanation});
const q = (prompt:string, options:[string,string,string],correct:0|1|2, explanation:string) =>
  ({prompt,options,correct,explanation});
const L = (lesson:LearningLesson):LearningLesson => lesson;

export const MODULE_ONE:LearningModule = {
  title:"Schwangerschaft verstehen",
  subtitle:"Wissen, was passiert. Risiken einordnen. Selbst Verantwortung übernehmen.",
  intro:"Von den ersten Schwangerschaftswochen bis zum Alltag vor der Geburt: Du lernst, was in ihrem Körper passiert, was du bei Einkauf, Vorsorge und Beschwerden wissen musst und wie du deinen Teil zuverlässig organisierst. Tom und Lena begleiten dich durch neun konkrete Situationen.",
  practice:"Übernimm für sieben Tage einen klaren Bereich – etwa den sicheren Einkauf, Mahlzeiten oder die gemeinsame Terminorganisation. Erkenne selbst, was ansteht, plane rechtzeitig, stimme Wünsche respektvoll ab und überprüfe deine Umsetzung.",
  lessons:[
    L({
      title:"Nicht nur dabei sein – von Anfang an mittragen",
      objective:"Du erkennst den Unterschied zwischen Hilfe auf Zuruf und eigener Verantwortung.",
      scene:"Abends in der Küche: Tom sieht Lena erschöpft auf dem Sofa. Die Küche ist unaufgeräumt und der Kühlschrank fast leer.",
      tom:"Sag mir einfach, was ich machen soll. Dann helfe ich.",
      lena:"Ich kann gerade nicht auch noch alles organisieren.",
      narrator:"Tom will helfen, aber Lena müsste weiter voraussehen, entscheiden und delegieren. Das ist eine andere Aufgabe als der Einkauf selbst.",
      hisAction:"Such dir einen Haushaltsbereich und übernimm ihn ab heute vollständig.",
      durationMinutes:6,
      knowledge:[
        "Beim Mittragen geht es nicht darum, möglichst viele Aufträge auszuführen. Du sollst Aufgaben selbst bemerken, planen, durchführen und anschließend im Blick behalten.",
        "Die Forschung zur kognitiven Haushaltsarbeit beschreibt vier Teilaufgaben: Bedürfnisse voraussehen, Optionen suchen, Entscheidungen treffen und die Umsetzung nachhalten.",
        "Eigeninitiative heißt nicht, über deine Partnerin zu bestimmen. Persönliche Wünsche und gemeinsame Entscheidungen besprecht ihr, den Organisationsaufwand für deinen Bereich trägst du selbst.",
        "Schwangerschaft verändert den Alltag oft früh. Du kannst deshalb von Beginn an Verantwortung übernehmen, statt auf einen sichtbaren Babybauch zu warten."
      ],
      steps:["Wähle einen Bereich wie Einkauf oder Wäsche und kläre kurz, dass du ihn übernimmst.","Lege deinen eigenen Erinnerungspunkt fest: Woran erkennst du, dass du handeln musst?","Organisiere die nächsten Schritte und überprüfe selbst, ob alles erledigt ist."],
      dialogue:[
        {speaker:"Tom",text:"Sag mir einfach, was ich machen soll. Dann helfe ich."},
        {speaker:"Lena",text:"Ich bin erschöpft. Ich kann nicht auch noch alle Aufgaben für dich planen."},
        {speaker:"Sprecher",text:"Das Problem ist nicht, dass Tom zu wenig guten Willen hat. Er wartet darauf, dass Lena die Arbeit erkennt und verteilt."},
        {speaker:"Tom",text:"Verstanden. Ich prüfe ab jetzt selbst den Kühlschrank, plane den Einkauf und kümmere mich um das Essen. Deine Wünsche stimmen wir kurz ab."},
        {speaker:"Lena",text:"Danke. Dann muss ich nicht alles im Kopf behalten."}
      ],
      challenge:c("Der Kühlschrank ist leer, und Lena liegt mit Übelkeit auf dem Sofa. Was ist ein guter erster Schritt?",[
        "Du fragst Lena, welche genaue Einkaufsliste du abarbeiten sollst.",
        "Du prüfst selbst die Vorräte, planst einen geeigneten Einkauf und klärst nur ihre aktuellen Wünsche.",
        "Du entscheidest ohne Rücksprache, was sie essen muss."
      ],1,"Du übernimmst Planung und Ausführung, ohne ihre Wünsche zu übergehen."),
      sources:[S.mental,S.grundlagen],
    }),
    L({
      title:"Die ersten zwölf Wochen: Warum man so viel nicht sieht",
      objective:"Du verstehst frühe Veränderungen und reagierst auf Müdigkeit und Übelkeit, ohne sie kleinzureden.",
      scene:"Lena kommt von der Arbeit, öffnet die Wohnungstür und reagiert auf den Geruch von gebratenem Essen. Tom wundert sich, weil die Schwangerschaft noch nicht sichtbar ist.",
      tom:"Aber man sieht doch noch gar nichts. Bist du wirklich so fertig?",
      lena:"Mir ist übel und ich bin total müde. Ich brauche heute Ruhe.",
      narrator:"Frühe Schwangerschaft kann Müdigkeit, Übelkeit, Geruchsempfindlichkeit und Kreislaufveränderungen mit sich bringen. Die Beschwerden sind sehr unterschiedlich ausgeprägt und nicht von außen ablesbar.",
      hisAction:"Organisiere heute Essen und Haushalt selbst; bei starken Beschwerden hilf, fachlichen Rat einzuholen.",
      durationMinutes:8,
      knowledge:[
        "In den ersten Schwangerschaftswochen werden wichtige Anlagen für die Entwicklung des Embryos gebildet. Auch der mütterliche Körper verändert sich: Hormonhaushalt, Kreislauf und Stoffwechsel passen sich an.",
        "Häufige frühe Beschwerden sind Müdigkeit, Übelkeit, Geruchsempfindlichkeit, Schwindel und vermehrter Harndrang. Ihr Ausmaß unterscheidet sich von Person zu Person.",
        "Nicht jede Schwangere erlebt Übelkeit. Wenige Beschwerden bedeuten nicht, dass die Schwangerschaft 'weniger echt' oder dass die Frau weniger Unterstützung braucht.",
        "Übelkeit ist nicht auf den Morgen beschränkt. Wenn sie oft erbricht, kaum trinken kann oder sich ihr Zustand deutlich verschlechtert, sollte fachliche Hilfe organisiert werden.",
        "Du kannst Gerüche reduzieren, Mahlzeiten besorgen, Ruhe ermöglichen und organisatorische Aufgaben übernehmen, ohne zuerst lange Erklärungen zu verlangen."
      ],
      steps:["Nimm ernst, wie es ihr geht, statt es anhand des Bauchs oder der Schwangerschaftswoche zu beurteilen.","Kümmere dich um Essen und Küche; erfrage nur notwendige Vorlieben oder Unverträglichkeiten.","Wenn Beschwerden stark, ungewöhnlich oder anhaltend sind, hilf beim Kontakt zu Hebamme oder ärztlicher Praxis."],
      dialogue:[
        {speaker:"Tom",text:"Aber man sieht doch noch gar nichts. Bist du wirklich so erschöpft?"},
        {speaker:"Lena",text:"Ja. Mir ist übel, und von dem Essen wird mir noch schlechter."},
        {speaker:"Sprecher",text:"Ob man eine Schwangerschaft sieht, sagt wenig darüber aus, wie belastend ihre ersten Wochen sein können."},
        {speaker:"Tom",text:"Entschuldige, ich habe das unterschätzt. Ich räume die Küche auf und besorge dir etwas, das du gerade verträgst."},
        {speaker:"Lena",text:"Danke. Ruhe ist heute genau das Richtige."}
      ],
      challenge:c("Lena ist in der siebten Schwangerschaftswoche sehr müde. Welche Aussage trifft zu?",[
        "Die Beschwerden können durch frühe körperliche Veränderungen entstehen, auch ohne sichtbaren Bauch.",
        "Solange kein Bauch sichtbar ist, kann sie körperlich kaum belastet sein.",
        "Wenn sie morgens nicht erbricht, ist ihre Müdigkeit nur Einbildung."
      ],0,"Frühe Beschwerden sind real, individuell und nicht von außen messbar."),
      sources:[S.weeks,S.body],
    }),
    L({
      title:"Zweites und drittes Trimester: Was sich verändern kann",
      objective:"Du verstehst veränderte Bedürfnisse, vermeidest Bewertungen und organisierst praktische Unterstützung.",
      scene:"Lena probiert eine bequemere Hose. Tom sagt unbedacht etwas über ihren Bauch. Wenig später sieht er, dass sie wegen Rückenschmerzen den Einkauf nur mühsam trägt.",
      tom:"Wow, jetzt sieht man dir die Schwangerschaft richtig an!",
      lena:"Ich weiß. Hilf mir lieber mit den schweren Taschen, statt meinen Körper zu kommentieren.",
      narrator:"Im Schwangerschaftsverlauf verändern sich Kreislauf, Beweglichkeit, Schlaf und Belastbarkeit unterschiedlich. Respektvolle Begleitung beginnt damit, ihre Erfahrung ernst zu nehmen.",
      hisAction:"Organisiere die anstehenden Besorgungen und körperlich anstrengenden Alltagsarbeiten, soweit sie davon entlastet werden möchte.",
      durationMinutes:7,
      knowledge:[
        "Im späteren Verlauf können beispielsweise Rückenschmerzen, Sodbrennen, Schlafprobleme oder Wassereinlagerungen auftreten. Nicht jede Frau erlebt diese Beschwerden gleich.",
        "Schwangere sollen bei einem unkomplizierten Verlauf regelmäßig körperlich aktiv sein; die deutschen Empfehlungen nennen im Allgemeinen mindestens 150 Minuten moderate Bewegung pro Woche. Individuelle Gegenanzeigen klärt die ärztliche Betreuung.",
        "Die Empfehlungen rechtfertigen nicht, dass du deine Partnerin zum Sport drängst oder ihre Aktivität bewertest. Es geht um Information und die Möglichkeit, selbstbestimmte Entscheidungen zu treffen.",
        "Körperkommentare können verletzen. Wichtiger ist, zuzuhören, Belastungen zu erkennen und praktische Dinge wie Einkäufe und Wege rechtzeitig zu organisieren.",
        "Vorbereitungen auf Geburt und Familienalltag lassen sich früh beginnen: Termine, benötigte Dinge, Fahrwege und Aufgabenverteilung."
      ],
      steps:["Übernimm belastende Besorgungen und plane sie rechtzeitig.","Frage, wobei Unterstützung hilfreich wäre, ohne den Körper zu bewerten.","Halte organisatorische Vorbereitungen selbst in deinem Kalender nach."],
      dialogue:[
        {speaker:"Tom",text:"Du siehst aber schon richtig schwanger aus!"},
        {speaker:"Lena",text:"Mir ist mein Körper selbst gerade fremd. Ich möchte nicht bewertet werden."},
        {speaker:"Sprecher",text:"Gut gemeint ist nicht immer gut angekommen. Tom kann neugierig zuhören und konkret entlasten."},
        {speaker:"Tom",text:"Verstanden. Ich lasse die Kommentare und kümmere mich um die Einkäufe und unsere Fahrt zum nächsten Termin."},
        {speaker:"Lena",text:"Das hilft mir gerade wirklich."}
      ],
      challenge:c("Lena hat Rückenschmerzen und sagt einen Spaziergang ab. Was ist die beste Reaktion?",[
        "Du erklärst ihr, dass sie mindestens 150 Minuten Sport pro Woche machen muss.",
        "Du sagst, dass Beschwerden in der Schwangerschaft normal sind und ignoriert werden können.",
        "Du akzeptierst ihre Grenze, organisierst Entlastung und unterstützt bei ungewöhnlichen Beschwerden medizinische Abklärung."
      ],2,"Allgemeine Bewegungsrichtlinien ersetzen keine individuelle Entscheidung oder medizinische Beratung."),
      sources:[S.body,S.physical,S.grundlagen],
    }),
    L({
      title:"Vorsorge, Mutterpass und Termine verstehen",
      objective:"Du kennst den Zweck der Vorsorge und organisierst Termine, ohne medizinische Entscheidungen an dich zu ziehen.",
      scene:"Ein Vorsorgetermin steht an. Lena hat noch Fragen zum Mutterpass. Tom fragt, ob er mitkommen darf, und prüft selbst die Fahrtverbindung.",
      tom:"Soll ich mitkommen? Ich kann die Anfahrt und unsere Zeitplanung übernehmen.",
      lena:"Gern, aber meine Befunde möchte ich selbst mit der Ärztin besprechen.",
      narrator:"Vorsorge soll die Gesundheit von Mutter und Kind begleiten. Die Untersuchungen sind freiwillig; Entscheidungen liegen bei der Schwangeren.",
      hisAction:"Finde die nächste passende Fahrtverbindung oder sonstige vereinbarte Unterstützung. Den Mutterpass verwahrt und nutzt sie selbst.",
      durationMinutes:7,
      knowledge:[
        "Bei der Schwangerschaftsvorsorge werden Gesundheit und Entwicklung begleitet. Dazu gehören regelmäßige Untersuchungen sowie im üblichen Verlauf drei vorgesehene Ultraschall-Screenings; bei Bedarf kann mehr untersucht werden.",
        "Der Mutterpass dokumentiert wichtige Befunde. Er gehört zur persönlichen Gesundheitsdokumentation der Schwangeren – keine Kontrolle durch den Partner.",
        "Vorsorge ist freiwillig: Sie darf nach Beratung Untersuchungen annehmen oder ablehnen. Auch die Frage, ob du mit in den Untersuchungsraum gehst, entscheidet sie.",
        "Viele Vorsorgeuntersuchungen können ärztlich oder durch Hebammen erfolgen; Ultraschall wird ärztlich durchgeführt.",
        "Was du übernehmen kannst: Termine auf Wunsch in einen gemeinsamen Kalender eintragen, Anfahrt organisieren, benötigte Unterlagen abstimmen und eigene Fragen notieren."
      ],
      steps:["Frage, ob sie Unterstützung bei Terminen oder Begleitung wünscht.","Organisiere die vereinbarten Wege, Zeiten und Erinnerungen selbst.","Überlasse Entscheidungen über Untersuchungen und persönliche Befunde konsequent ihr."],
      dialogue:[
        {speaker:"Tom",text:"Nächste Woche ist Vorsorge. Ich habe mir den Termin notiert und die Anfahrt recherchiert. Soll ich mitkommen?"},
        {speaker:"Lena",text:"Ja, das wäre gut. Bei den Untersuchungen möchte ich aber selbst entscheiden."},
        {speaker:"Sprecher",text:"Du kannst Organisator und verlässlicher Begleiter sein. Du bist nicht die Instanz, die den Mutterpass kontrolliert."},
        {speaker:"Tom",text:"Natürlich. Ich bin für dich da, wenn du mich dabeihaben möchtest."}
      ],
      challenge:c("Lena möchte einen freiwilligen Ultraschall nicht durchführen lassen. Wie handelst du?",[
        "Du bestehst darauf, weil du bei der Planung geholfen hast.",
        "Du respektierst ihre Entscheidung und bietest an, Fragen für das Gespräch mit dem Fachpersonal zu sammeln.",
        "Du suchst ihre Befunde heimlich im Mutterpass."
      ],1,"Unterstützung und medizinische Selbstbestimmung sind zwei verschiedene Dinge."),
      sources:[S.checkups,S.pass],
    }),
    L({
      title:"Lebensmittelsicherheit: Jetzt weißt du, was du einkaufst",
      objective:"Du kannst riskantere Lebensmittel erkennen, sichere Alternativen wählen und hygienisch kochen.",
      scene:"Tom steht im Supermarkt: Für ein Abendessen hat er rohen Fisch, Räucherlachs, einen Salat mit Sprossen und eine Alternative mit gegarten Zutaten im Blick.",
      tom:"Ich prüfe selbst, was in der Schwangerschaft sicher zubereitet werden muss.",
      lena:"Super. Heute hätte ich gern etwas Frisches, aber bitte ohne die problematischen Zutaten.",
      narrator:"Es geht nicht um Angst vor jedem Lebensmittel, sondern um den Schutz vor Infektionen wie Listeriose und Toxoplasmose. Mit einer guten Auswahl und sorgfältiger Zubereitung lässt sich viel organisieren.",
      hisAction:"Plane ein einfaches Gericht, kaufe die geeigneten Produkte ein und kümmere dich selbst um Lagerung, Zubereitung und Aufräumen.",
      durationMinutes:9,
      knowledge:[
        "Die deutschen Empfehlungen 2026: In der Schwangerschaft keine rohen tierischen Lebensmittel essen. Dazu gehören zum Beispiel roher Fisch, rohes Fleisch, rohe Eier und Rohmilchprodukte.",
        "Eier werden so gegart, dass Eiweiß und Eigelb fest sind. Fisch und Fleisch sollen gut durcherhitzt werden.",
        "Sprossen und Tiefkühlbeeren sollen nur nach starkem Erhitzen gegessen werden. Auch pflanzliche Produkte können Keime enthalten.",
        "Achte auf Kühlkette, Verbrauchsdatum, saubere Hände, getrennte Zubereitung von rohen und verzehrfertigen Zutaten sowie Herstellerhinweise. Wasche Obst und Gemüse gründlich.",
        "Nicht alles ist verboten: Aus ausreichend erhitzten Produkten und frischen, gut gewaschenen Zutaten lassen sich abwechslungsreiche Mahlzeiten zubereiten. Frage nach ihren Vorlieben statt ihr Vorschriften zu machen."
      ],
      steps:["Plane die Mahlzeiten und prüfe kritische Zutaten selbst anhand der Fachinformationen.","Wähle gegarte statt roher tierischer Alternativen und beachte Lager- und Hygieneregeln.","Koche und räume auf – Lena muss den Einkauf nicht nachkontrollieren."],
      dialogue:[
        {speaker:"Tom",text:"Ich hätte fast Räucherlachs gekauft. Der ist aber kalt geräuchert und wird nicht noch einmal richtig erhitzt."},
        {speaker:"Lena",text:"Dann such uns lieber eine gut durchgegarte Alternative. Auf etwas Frisches habe ich trotzdem Lust."},
        {speaker:"Sprecher",text:"Tom übernimmt die Recherche und die Küchensicherheit. Lena entscheidet weiter, worauf sie Appetit hat."},
        {speaker:"Tom",text:"Ich besorge die Zutaten und bereite alles hygienisch zu. Du musst nicht noch eine Einkaufsliste schreiben."}
      ],
      challenge:c("Für den Nachtisch hat Tom tiefgekühlte Beeren gekauft. Wie geht er nach den Empfehlungen vor?",[
        "Er gibt sie unaufgetaut direkt über das Dessert.",
        "Er spült sie nur kurz mit kaltem Wasser ab.",
        "Er erhitzt sie stark und verwendet sie erst danach."
      ],2,"Tiefkühlbeeren sollen in der Schwangerschaft vor dem Verzehr stark erhitzt werden."),
      sources:[S.food,S.nutrition],
    }),
    L({
      title:"Folsäure, Jod und Co.: Was du wissen solltest",
      objective:"Du kannst die wichtigsten Empfehlungen unterscheiden, ohne eigenmächtig Supplemente zu kaufen oder zu dosieren.",
      scene:"Tom steht vor dem Regal mit Schwangerschaftsvitaminen. Er möchte einen großen Vorrat kaufen, liest aber erst die aktuellen Empfehlungen.",
      tom:"Hier gibt es so viele Präparate. Ich will nicht einfach irgendetwas aussuchen.",
      lena:"Gut. Ich kläre mit meiner Ärztin, was für mich passt. Du kannst die Infos zusammentragen.",
      narrator:"Bestimmte Nährstoffe verdienen besondere Aufmerksamkeit. Die deutschen Empfehlungen unterscheiden ausdrücklich zwischen Folsäure, Jod, DHA und Eisen.",
      hisAction:"Schau die offiziellen Empfehlungen nach und sammle Fragen für das nächste Gespräch mit der betreuenden Fachperson.",
      durationMinutes:8,
      knowledge:[
        "Folsäure: Die Empfehlung beginnt möglichst bereits bei Kinderwunsch. Üblich sind 400 µg täglich bis zum Ende der 12. Schwangerschaftswoche. Wenn nicht mindestens vier Wochen vor der Empfängnis begonnen wurde, nennen die Empfehlungen 2026 stattdessen 800 µg – die individuelle Anwendung wird fachlich geklärt.",
        "Jod: Die deutschen Empfehlungen nennen für Schwangere zusätzlich zur Ernährung täglich 100 bis 150 µg Jod über die Schwangerschaft. Bei einer Schilddrüsenerkrankung muss dies vorab ärztlich besprochen werden.",
        "DHA: Empfohlen werden im Durchschnitt 200 mg täglich, erreichbar beispielsweise durch ein- bis zweimal wöchentlich fettreichen Meeresfisch oder bei Verzicht darauf durch ein geeignetes Supplement.",
        "Eisen: Ein zusätzliches Eisenpräparat wird nicht pauschal für alle empfohlen, sondern nach labordiagnostiziertem Eisenmangel.",
        "Diese Zahlen dienen deinem Verständnis – nicht dazu, deiner Partnerin Tabletten zu verordnen oder bereits bestehende Präparate zu ändern. Dosierung, Kombinationen und Vorerkrankungen gehören zur fachlichen Beratung."
      ],
      steps:["Lerne die vier unterschiedlichen Empfehlungen auseinanderzuhalten.","Erstelle bei Bedarf eine kurze Liste mit Fragen für die betreuende Ärztin, den Arzt oder die Hebamme.","Kaufe keine zusätzlichen Präparate auf eigene Faust und ändere keine bestehende Medikation."],
      dialogue:[
        {speaker:"Tom",text:"Hier steht auf jeder Packung etwas anderes. Ich möchte nicht einfach das teuerste Produkt kaufen."},
        {speaker:"Lena",text:"Ich habe schon ein Präparat bekommen. Ich bespreche die Ergänzungen in der Praxis."},
        {speaker:"Sprecher",text:"Gutes Mittragen heißt: Empfehlungen verstehen, aktuelle Quellen kennen und medizinische Entscheidungen nicht selbst treffen."},
        {speaker:"Tom",text:"Ich merke mir die Fragen zu Folsäure, Jod, DHA und Eisen. Dann können wir sie beim Termin klären."}
      ],
      challenge:c("Lena hat eine Schilddrüsenerkrankung. Tom liest die Jod-Empfehlung. Was ist richtig?",[
        "Er organisiert eine ärztliche Rücksprache, bevor ein Jod-Supplement eingenommen wird.",
        "Er erhöht vorsorglich selbst die Jod-Dosis.",
        "Er kauft ohne Rücksprache mehrere Kombipräparate."
      ],0,"Bei Schilddrüsenerkrankungen gehört die Jod-Supplementierung in die ärztliche Abstimmung."),
      sources:[S.folate,S.iodine,S.dha,S.iron],
    }),
    L({
      title:"Alkohol, Koffein und Medikamente einordnen",
      objective:"Du kennst relevante Empfehlungen und schützt vor vermeidbaren Risiken, ohne Verbote über Lena zu verhängen.",
      scene:"Tom kauft für einen Abend Getränke und möchte zugleich etwas gegen Lenas Kopfschmerzen aus der Apotheke mitbringen.",
      tom:"Ich bringe alkoholfreie Getränke mit. Bei Medikamenten frage ich lieber nach, bevor ich etwas kaufe.",
      lena:"Danke. Über meine Behandlung möchte ich mit der Praxis sprechen.",
      narrator:"Informiert einkaufen ist sinnvoll. Gesundheitliche Entscheidungen trifft aber die Schwangere mit qualifizierter Beratung.",
      hisAction:"Sorge für passende Getränke und lies bei medizinischen Fragen offizielle Informationen, statt Medikamente eigenmächtig auszuwählen.",
      durationMinutes:8,
      knowledge:[
        "Alkohol: Die deutschen Empfehlungen sind eindeutig – während der Schwangerschaft kein Alkohol. Eine sichere Menge ist nicht bekannt.",
        "Koffein: Maximal 200 mg über den Tag aus allen Quellen. Es zählt nicht nur Kaffee, sondern auch Schwarztee, Cola, Energydrinks, Guarana oder Schokolade. Die Gehalte schwanken.",
        "Zur Orientierung nennt die Fachquelle etwa 90 mg Koffein für 200 ml Filterkaffee und etwa 45 mg für 200 ml schwarzen Tee. Verlasse dich bei Portionen nicht auf Scheingenauigkeit.",
        "Bei Medikamenten, auch frei verkäuflichen oder pflanzlichen, gilt: nur nach ärztlicher Rücksprache einnehmen oder absetzen. Vorhandene notwendige Medikamente dürfen nicht eigenmächtig abgesetzt werden.",
        "Du kannst Alkoholverzicht unterstützen und geeignete Alternativen einkaufen, ohne die Auswahl oder das Verhalten deiner Partnerin zu überwachen."
      ],
      steps:["Besorge Getränke, die zu den Empfehlungen und ihren Wünschen passen.","Berücksichtige bei Koffein mehrere Quellen statt nur den Morgenkaffee.","Bei Medikamenten und Präparaten: kontaktiere mit ihr bei Bedarf das behandelnde Fachpersonal."],
      dialogue:[
        {speaker:"Tom",text:"Ich dachte, nur Kaffee zählt beim Koffein. In Schwarztee und Cola ist also auch etwas drin?"},
        {speaker:"Sprecher",text:"Ja. Entscheidend ist die Tagesmenge aus allen Quellen. Alkohol wird in der Schwangerschaft nicht empfohlen."},
        {speaker:"Tom",text:"Ich bringe für uns passende Alternativen mit. Wegen der Kopfschmerztabletten frage ich vorher nach fachlichem Rat."},
        {speaker:"Lena",text:"Gut. Was ich einnehme, kläre ich selbst mit meiner Ärztin."}
      ],
      challenge:c("Tom rechnet 2 Tassen Filterkaffee à ungefähr 90 mg und einen schwarzen Tee à 45 mg zusammen. Was folgt daraus?",[
        "Das sind ungefähr 225 mg – mehr als der Orientierungswert von 200 mg täglich.",
        "Tee zählt nicht, deshalb sind es nur 180 mg.",
        "Schwangere dürfen überhaupt kein koffeinhaltiges Getränk trinken."
      ],0,"Koffein aus allen Quellen zählt. Die Werte sind Näherungen und schwanken."),
      sources:[S.alcohol,S.caffeine,S.meds],
    }),
    L({
      title:"Beschwerden und Warnzeichen: Wann du Hilfe organisierst",
      objective:"Du erkennst Situationen, in denen Abwarten falsch wäre, und weißt, wen du kontaktieren musst.",
      scene:"Lena hat wiederholt erbrochen und schafft es kaum zu trinken. Tom schlägt zuerst Tee vor, merkt aber, dass er medizinische Hilfe organisieren sollte.",
      tom:"Ich merke, dass du kaum Flüssigkeit bei dir behalten kannst. Ich rufe bei der Praxis an und organisiere die Fahrt.",
      lena:"Danke. Mir fehlt gerade die Kraft, das alles selbst zu klären.",
      narrator:"Ein Männerkurs kann keine Diagnose stellen. Tom kann Warnsignale ernst nehmen und rasch den Kontakt zu Fachpersonen oder im akuten Notfall die Notfallversorgung organisieren.",
      hisAction:"Speichere Kontakte von Praxis, Hebamme, Klinik und Notdienst. Besprich, wie du bei Bedarf Hilfe organisierst.",
      durationMinutes:8,
      knowledge:[
        "Leichte Beschwerden sind häufig, aber nicht alles ist harmlos. Starkes, anhaltendes Erbrechen mit unzureichender Flüssigkeitsaufnahme erfordert eine zeitnahe medizinische Abklärung.",
        "Blutungen in der Schwangerschaft sollen ärztlich abgeklärt werden. Bei stärkeren Blutungen, starken Bauchschmerzen oder Kreislaufproblemen: sofort in eine Geburtsklinik beziehungsweise bei einem Notfall die Notfallversorgung kontaktieren.",
        "Neue oder sehr starke Kopfschmerzen, insbesondere in der zweiten Schwangerschaftshälfte und bei Sehstörungen, müssen rasch medizinisch beurteilt werden.",
        "Du solltest keine Diagnosen stellen, keine Medikamente auf eigene Faust geben und nicht damit argumentieren, dass Beschwerden „nun mal zur Schwangerschaft gehören“.",
        "Übernimm die organisatorischen Schritte: Nummern finden, anrufen helfen, gegebenenfalls Fahrt organisieren und auf Wunsch bei der Kommunikation unterstützen. Bei akuter Lebensgefahr gilt in Deutschland 112."
      ],
      steps:["Speichere die Kontakte der betreuenden Praxis oder Hebamme sowie Klinik und Notdienst.","Nimm ungewöhnliche, starke oder anhaltende Beschwerden ernst und organisiere fachliche Einschätzung.","Bei Blutungen mit starken Schmerzen, Kreislaufproblemen oder anderen Notfallzeichen keine Zeit verlieren."],
      dialogue:[
        {speaker:"Tom",text:"Du hast so oft erbrochen. Ich dachte erst, das geht von selbst vorbei."},
        {speaker:"Lena",text:"Mir geht es gerade wirklich nicht gut, und trinken klappt kaum."},
        {speaker:"Sprecher",text:"Starkes Schwangerschaftserbrechen kann medizinische Behandlung erfordern. Tom übernimmt jetzt den organisatorischen Teil."},
        {speaker:"Tom",text:"Ich kontaktiere direkt die Praxis und kläre, wo wir Hilfe bekommen. Um den Haushalt kümmere ich mich."}
      ],
      challenge:c("Lena blutet und hat starke Unterleibsschmerzen. Was machst du?",[
        "Du wartest bis zum nächsten regulären Termin.",
        "Du organisierst umgehend die medizinische Notfallabklärung beziehungsweise Notfallhilfe.",
        "Du suchst im Internet ein Hausmittel."
      ],1,"Blutungen mit starken Schmerzen sind ein Warnsignal, bei dem umgehend fachliche Hilfe nötig ist."),
      sources:[S.weeks,S.bleeding,S.headache],
    }),
    L({
      title:"Deine ersten sieben Tage als Mitträger",
      objective:"Du baust eine eigene Routine, die Lena wirklich Organisationsarbeit abnimmt.",
      scene:"Eine Woche später: Lena liegt auf dem Sofa. Tom hat den Einkauf übernommen, die Termine im Blick und bemerkt selbst, dass etwas fehlt.",
      tom:"Für den Einkauf ist gesorgt, ich habe die Vorräte geprüft und die Termine in meinen Kalender eingetragen.",
      lena:"Das macht den Kopf frei. Ich musste dich diesmal nicht daran erinnern.",
      narrator:"Gute Absichten sind der Anfang. Entlastung entsteht durch verlässliche, überprüfbare Verantwortung im Alltag – ohne dass die Partnerin zur Lehrerin oder Kontrolleurin wird.",
      hisAction:"Nutze den persönlichen Sieben-Tage-Plan unter dem Modultest. Fülle ihn konkret aus und übernimm die Umsetzung.",
      durationMinutes:7,
      knowledge:[
        "Ein vollständiger Verantwortungsbereich beginnt mit einem wiederkehrenden Auslöser und umfasst Planung, Entscheidung/Abstimmung, Umsetzung und Nachbereitung.",
        "Ein brauchbarer Plan hat vier Antworten: Was übernehme ich? Woran bemerke ich Handlungsbedarf? Welche Schritte organisiere ich selbst? Wann kontrolliere ich meine eigene Umsetzung?",
        "Für medizinische Fragen übernimmst du Recherche und Organisation, nicht die medizinische Entscheidung deiner Partnerin.",
        "Du brauchst kein Lob, keinen Haken und keine Bestätigung von Lena für jede erledigte Kleinigkeit. Entscheidend ist, dass deine Routine tatsächlich funktioniert."
      ],
      steps:["Wähle einen klaren Bereich für sieben Tage und lege eine eigene Erinnerung an.","Beschreibe Bedarf, Schritte, notwendige Absprachen und deinen eigenen Kontrollpunkt.","Passe den Plan selbst an, falls etwas schiefgeht – ohne die Projektleitung zurückzugeben."],
      dialogue:[
        {speaker:"Tom",text:"Früher habe ich gefragt, was ich machen soll. Heute prüfe ich selbst, was fehlt."},
        {speaker:"Lena",text:"Ich merke das. Ich muss den Einkauf nicht mehr im Kopf behalten."},
        {speaker:"Sprecher",text:"Tom ist nicht plötzlich perfekt. Aber er hat aus einer Absicht eine verlässliche Zuständigkeit gemacht."},
        {speaker:"Tom",text:"Nächste Woche prüfe ich, ob mein Plan funktioniert – und verbessere ihn selbst."}
      ],
      challenge:c("Du bist für den Wocheneinkauf verantwortlich, vergisst aber mehrfach wichtige Lebensmittel. Was machst du?",[
        "Du bittest Lena, dich jeden Tag daran zu erinnern.",
        "Du erklärst, dass Einkaufen nun einmal schwer ist, und gibst die Zuständigkeit zurück.",
        "Du prüfst die Lücke in deinem Ablauf und richtest eine eigene Erinnerung und Vorratskontrolle ein."
      ],2,"Zuständigkeit heißt, auch die eigene Planung zu verbessern."),
      sources:[S.mental,S.grundlagen],
    })
  ],
  quiz:[
    q("Tom sagt: „Sag mir einfach, was ich tun soll.“ Was fehlt?",[
      "Eine vollständige eigene Zuständigkeit samt Planung und Nachbereitung.",
      "Ein noch genauerer Auftrag von Lena.",
      "Dass Tom über alle Wünsche allein entscheidet."
    ],0,"Mittragen umfasst auch das Erkennen und Organisieren der Arbeit."),
    q("Lena ist in Schwangerschaftswoche 8 sehr erschöpft, aber ihr Bauch ist noch nicht sichtbar. Was ist richtig?",[
      "Vor einem sichtbaren Bauch gibt es keine Schwangerschaftsbeschwerden.",
      "Frühe körperliche Veränderungen können bereits deutliche Beschwerden verursachen.",
      "Erst ab dem dritten Trimester braucht sie Ruhe."
    ],1,"Hormonelle und körperliche Umstellungen beginnen sehr früh."),
    q("Tom sagt, Lena müsse regelmäßig Sport machen, obwohl sie heute nicht kann. Was sollte er stattdessen tun?",[
      "Sie an die 150 Minuten erinnern, bis sie losgeht.",
      "Ihre Bedürfnisse ignorieren.",
      "Ihre Grenze respektieren und bei Bedarf fachlichen Rat unterstützen."
    ],2,"Allgemeine Bewegungsempfehlungen sind kein Zwang und ersetzen keine individuelle Einschätzung."),
    q("Was ist die richtige Rolle von Tom beim Mutterpass und der Vorsorge?",[
      "Er organisiert vereinbarte Termine, respektiert ihre Entscheidungen und liest keine Befunde ungefragt.",
      "Er entscheidet, welche Untersuchungen sie machen muss.",
      "Er kontrolliert regelmäßig ihre Befunde ohne Zustimmung."
    ],0,"Ihre Vorsorge ist freiwillig, ihre Gesundheitsdaten sind privat."),
    q("Welche Einkaufsidee passt zu den Empfehlungen in der Schwangerschaft?",[
      "Rohes Rinderhack, wenn die Packung frisch aussieht.",
      "Gut durchgegartes Fleisch mit gründlich gewaschenem Gemüse.",
      "Rohe Eier in hausgemachter Creme."
    ],1,"Rohe tierische Lebensmittel sollen vermieden werden; Hygiene und Durcherhitzen sind wichtig."),
    q("Was gilt laut den aktuellen deutschen Empfehlungen für Eier?",[
      "Das Eigelb darf immer flüssig bleiben.",
      "Nur die Schale muss sauber sein.",
      "Eiweiß und Eigelb sollen durch Erhitzen fest sein."
    ],2,"Die Eier sollen vollständig durchgegart sein."),
    q("Tom möchte tiefgekühlte Beeren und Sprossen verwenden. Wie geht er vor?",[
      "Beides vor dem Essen stark erhitzen.",
      "Nur auftauen beziehungsweise abspülen.",
      "Beides grundsätzlich immer roh essen."
    ],0,"Für Tiefkühlbeeren und Sprossen wird starkes Erhitzen empfohlen."),
    q("Welche Aussage über Folsäure entspricht den Empfehlungen 2026?",[
      "Folsäure wird in der Schwangerschaft grundsätzlich nicht empfohlen.",
      "Die Empfehlung startet möglichst schon bei Kinderwunsch; 400 µg täglich bis Ende Woche 12, bei spätem Beginn nennen die Empfehlungen 800 µg.",
      "Tom sollte eigenständig beliebige Mengen kaufen."
    ],1,"Die aktuelle Empfehlung unterscheidet den Beginn der Supplementierung. Individuelle Fragen gehören zur Fachberatung."),
    q("Lena hat eine Schilddrüsenerkrankung. Was ist beim Jod-Supplement wichtig?",[
      "Es ist grundsätzlich für alle verboten.",
      "Tom wählt eigenständig die höchste Dosis.",
      "Vor der Einnahme ist ärztliche Rücksprache wichtig."
    ],2,"Die allgemeinen Jod-Empfehlungen gelten bei Schilddrüsenerkrankungen nur nach ärztlicher Rücksprache."),
    q("Was gilt für Eisenpräparate in der Schwangerschaft?",[
      "Gezielte Ergänzung bei labordiagnostiziertem Mangel, nicht pauschal für alle.",
      "Jede Schwangere muss täglich zusätzliches Eisen einnehmen.",
      "Tom entscheidet anhand ihrer Müdigkeit, wie viel Eisen sie braucht."
    ],0,"Eisen-Supplemente sind nach den deutschen Empfehlungen an die medizinische Diagnostik gebunden."),
    q("Tom zählt etwa 90 mg Koffein im Kaffee, 45 mg im schwarzen Tee und 80 mg in einem weiteren Getränk. Was ergibt das?",[
      "Nur der Kaffee zählt.",
      "Zusammen etwa 215 mg und damit über dem Orientierungswert von 200 mg am Tag.",
      "Der Wert ist völlig bedeutungslos."
    ],1,"Koffein aus allen Getränken und Lebensmitteln zählt zusammen; Portionswerte sind Näherungen."),
    q("Lena nimmt ein seit Längerem verschriebenes Medikament. Tom hat eine Warnung im Internet gelesen. Was jetzt?",[
      "Tom setzt das Medikament sofort ab.",
      "Tom ersetzt es eigenständig durch ein Naturpräparat.",
      "Er unterstützt eine ärztliche Rücksprache; nichts eigenmächtig absetzen."
    ],2,"Medikamente nur mit fachlicher Beratung beginnen, ändern oder absetzen."),
    q("Lena hat eine Blutung und starke Bauchschmerzen. Was ist deine Aufgabe?",[
      "Sofort fachliche Notfallhilfe organisieren, nicht abwarten.",
      "Eine Tasse Tee machen und mehrere Tage beobachten.",
      "Selbst die Ursache diagnostizieren."
    ],0,"Blutung mit starken Schmerzen kann ein ernster Notfall sein."),
    q("Am Ende der Woche bleibt die Organisation des Einkaufs immer noch bei Lena. Was änderst du?",[
      "Du fragst sie nach einer ausführlicheren Einkaufsliste.",
      "Du übernimmst auch Bestandsprüfung, Planung und eigene Erinnerungen; gemeinsame Wünsche stimmst du kurz ab.",
      "Du behauptest, dein Teil sei mit dem Einkauf erledigt."
    ],1,"Die unsichtbare Denkarbeit muss ebenfalls übernommen werden.")
  ]
};
