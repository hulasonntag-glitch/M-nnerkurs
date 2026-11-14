/** MITTRAGEN – Avatar-Video-Plan. Tom und Lena sind das durchgehende Beispielpaar.
 * Der Kurs und alle Tests richten sich ausschließlich an den Mann. Lena muss nichts erklären, kontrollieren oder beantworten.
 * Optionales MP4 später je Szene unter "videoSrc" eintragen, z.B. "/videos/modul-01/video-01.mp4".
 */
export type Lesson = {
  title: string;
  objective: string;
  scene: string;
  tom: string;
  lena: string;
  narrator: string;
  hisAction: string;
  videoSrc?: string;
};
export type Question = {
  prompt: string;
  options: [string,string,string];
  correct: 0|1|2;
  explanation: string;
};
export type CourseModule = {
  title: string;
  subtitle: string;
  intro: string;
  lessons: Lesson[];
  quiz: Question[];
  practice: string;
};
const l = (title:string,objective:string,scene:string,tom:string,lena:string,narrator:string,hisAction:string):Lesson =>
  ({title,objective,scene,tom,lena,narrator,hisAction});
const q = (prompt:string,options:[string,string,string],correct:0|1|2,explanation:string):Question =>
  ({prompt,options,correct,explanation});
export const COURSE:CourseModule[] = [
  {
    title:"Schwangerschaft verstehen",
    subtitle:"Was sich verändert. Und was das für euch bedeutet.",
    intro:"Was passiert im Körper deiner Partnerin? Und was heißt das für deinen Alltag? Tom und Lena zeigen, wie du ohne Aufforderung Verantwortung übernimmst.",
    lessons:[
      l("Willkommen: Nicht helfen, mittragen","Von gut gemeinter Hilfe zu echter Verantwortung.",
        "Abends auf dem Sofa. Lena ist erschöpft, die Einkaufsliste ist noch offen.",
        "Sag einfach, was ich tun soll. Dann helfe ich dir.","Ich möchte nicht auch noch alles planen müssen.",
        "Tom meint es gut. Aber solange Lena alles sehen, planen und verteilen muss, bleibt die Verantwortung bei ihr. Mittragen beginnt, wenn Tom selbst erkennt, was ansteht.",
        "Übernimm heute einen kleinen Bereich komplett – Überblick, Planung und Umsetzung."),
      l("Das erste Trimester","Unsichtbare Veränderungen und Erschöpfung verstehen.",
        "Lena kommt müde von der Arbeit. Tom wundert sich: Noch ist kein Bauch zu sehen.",
        "Warum bist du so erschöpft? Man sieht doch noch gar nichts.","Mein Körper stellt gerade sehr viel um.",
        "Schon früh verändert sich im Körper viel. Müdigkeit oder Übelkeit können erheblich sein. Tom muss das nicht beurteilen; er kann aufmerksam sein und praktische Entlastung organisieren.",
        "Plane heute selbst ein verträgliches Abendessen und schaffe Raum für Ruhe."),
      l("Zweites und drittes Trimester","Respektvoll begleiten und rechtzeitig vorbereiten.",
        "Lena sucht bequeme Kleidung. Tom bemerkt ihren sich verändernden Körper.",
        "Wow, du siehst jetzt aber richtig schwanger aus!","Ich merke die Veränderung selbst. Ich brauche gerade eher Verständnis.",
        "Tom lernt: Kommentare über ihren Körper sind nicht automatisch hilfreich. Er kann zuhören, Interessen erfragen und rechtzeitig Organisatorisches übernehmen.",
        "Kläre eigenständig, welche Termine und praktischen Vorbereitungen anstehen – und stimme gemeinsame Entscheidungen ab."),
    ],
    quiz:[
      q("Tom sagt: „Sag mir einfach, was ich tun soll.“ Was fehlt?",["Er wartet weiter auf Lenas Planung.","Er übernimmt bereits den ganzen Mental Load.","Lena muss nur genauer erklären, was sie will."],0,"Hilfe auf Zuruf nimmt Lena nicht das Denken und Organisieren ab."),
      q("Warum kann Lena schon im ersten Trimester erschöpft sein?",["Weil das Baby bereits sehr schwer ist.","Weil ihr Körper sich früh stark verändert, auch ohne sichtbaren Bauch.","Weil Erschöpfung grundsätzlich nichts mit Schwangerschaft zu tun hat."],1,"Körperliche und hormonelle Anpassungen beginnen sehr früh."),
      q("Wie reagiert Tom sinnvoll auf Veränderungen ihres Körpers?",["Er kommentiert ihr Aussehen häufiger.","Er entscheidet, was sie anziehen sollte.","Er hört zu und respektiert, wie Lena darüber sprechen möchte."],2,"Ihre Gefühle und Wünsche sind wichtiger als Toms ungebetene Bewertungen."),
      q("Was ist Toms eigene Aufgabe bei der Vorbereitung?",["Er organisiert nach Absprache Termine und Aufgaben selbstständig.","Er wartet, bis Lena alle Listen schreibt.","Er entscheidet allein über medizinische Fragen."],0,"Mittragen bedeutet selbst planen und dabei die Selbstbestimmung der Partnerin respektieren."),
    ],
    practice:"Übernimm diese Woche nach kurzer gemeinsamer Absprache Einkauf oder Terminorganisation von Anfang bis Ende. Lena muss dich nicht daran erinnern.",
  },
  {
    title:"Mental Load übernehmen",
    subtitle:"Nicht nur erledigen. Auch daran denken.",
    intro:"Mentale Arbeit ist unsichtbar: sehen, planen, erinnern und nachhalten. Du lernst, diese Verantwortung eigenständig zu übernehmen.",
    lessons:[
      l("Die unsichtbare Liste","Planung als echte Arbeit erkennen.",
        "Lena weiß, welche Vorräte fehlen und wann der nächste Termin ist. Tom hat gestern die Wäsche aufgehängt.",
        "Ich mache doch schon so viel!","Ja, aber ich musste dich an die Wäsche erinnern und den Rest planen.",
        "Tom erledigt etwas, aber die unsichtbare Organisation bleibt bei Lena. Er muss lernen, selbst Übersicht aufzubauen.",
        "Erstelle deine eigene Übersicht über wiederkehrende Familienaufgaben."),
      l("Von Anfang bis Ende zuständig","Komplette Zuständigkeitsbereiche tragen.",
        "Die Kliniktasche muss vorbereitet werden.",
        "Ich recherchiere, was wir brauchen. Deine persönlichen Wünsche gleichen wir ab.","Gut, dann muss ich nicht jeden Einzelpunkt allein vorbereiten.",
        "Selbst recherchieren und organisieren, gemeinsame Entscheidungen abstimmen: Genau so entsteht Verantwortung.",
        "Übernimm einen Bereich inklusive Recherche, Besorgung und Nachbereitung."),
      l("Vorausschauen, ohne zu bestimmen","Initiative mit Respekt verbinden.",
        "Für morgen sind kaum Lebensmittel im Haus, und beide haben Termine.",
        "Ich habe den Einkauf eingeplant. Gibt es etwas, das du gerade besonders brauchst?","Danke. Das nimmt mir einiges ab.",
        "Mitdenken heißt nicht, Lena zu bevormunden. Tom übernimmt die Planung und respektiert gemeinsame Wünsche.",
        "Plane die nächste Woche proaktiv und kläre nur die Entscheidungen ab, die euch beide betreffen."),
    ],
    quiz:[
      q("Was gehört zum Mental Load?",["Nur die körperliche Arbeit.","Sehen, Planen, Erinnern und Nachhalten.","Nur die Termine beim Arzt."],1,"Mentale Organisation ist Arbeit, selbst wenn man sie nicht sieht."),
      q("Was bleibt bei Lena, wenn sie Tom jedes Detail sagen muss?",["Nichts; die Arbeit ist vollständig geteilt.","Nur die Freizeitplanung.","Die Denkarbeit und das Delegieren."],2,"Eine erledigte Aufgabe ist nicht automatisch übernommene Verantwortung."),
      q("Wie übernimmt Tom die Kliniktasche sinnvoll?",["Er recherchiert selbst und stimmt persönliche Wünsche mit Lena ab.","Er wartet auf eine detaillierte Liste.","Er entscheidet über Lenas persönliche Dinge allein."],0,"Eigeninitiative plus Abstimmung verhindert Bevormundung."),
      q("Wie erkennt Tom, dass er wirklich mitträgt?",["Lena erinnert ihn jeden Morgen.","Er organisiert Aufgaben, ohne dass Lena alles kontrollieren muss.","Er erklärt häufiger, wie viel er schon tut."],1,"Zuverlässige selbstständige Verantwortung ist das Ziel."),
    ],
    practice:"Wähle einen Bereich, den du sieben Tage lang komplett organisierst. Lege deine eigene Routine fest, ohne Lena zur Projektleiterin zu machen.",
  },
  {
    title:"Geburt: dein Platz",
    subtitle:"Präsent sein, auch wenn du nicht alles kontrollieren kannst.",
    intro:"Du bereitest dich vor, bleibst ruhig und unterstützt Lenas Entscheidungen. Medizinische Fragen gehören zum Fachpersonal.",
    lessons:[
      l("Gemeinsam vorbereiten","Logistik übernehmen und Wünsche erfragen.",
        "Tom und Lena sprechen vor der Geburt über den Weg zur Klinik.",
        "Ich kläre Fahrt, Unterlagen und Kontakte. Was ist dir im Kreißsaal wichtig?","Bitte hör mir zu und entscheide nicht ungefragt für mich.",
        "Tom trägt die Organisation. Lena entscheidet über ihren Körper; medizinische Entscheidungen besprecht ihr mit dem Behandlungsteam.",
        "Kläre Anfahrt, Erreichbarkeit und Unterlagen eigenständig."),
      l("Unter der Geburt begleiten","Auf Veränderungen im Moment reagieren.",
        "Lena möchte während einer Wehe nicht mehr berührt werden.",
        "Okay, ich höre auf. Ich bin hier.","Bleib bitte einfach bei mir.",
        "Gute Begleitung ist aufmerksam und flexibel. Was vorhin geholfen hat, muss jetzt nicht mehr passen.",
        "Übe zuzuhören und direkte Wünsche ohne Diskussion zu respektieren."),
      l("Wenn es anders läuft","Flexibel bleiben und Fachpersonen einbeziehen.",
        "Der Geburtsverlauf ändert sich. Das Team erklärt die Optionen.",
        "Soll ich nachfragen, wenn dir etwas unklar ist?","Ja, hilf mir bitte, die Informationen zu verstehen.",
        "Tom muss nichts kontrollieren. Er kann ruhig bleiben, Informationen klären helfen und Lenas Entscheidungen respektieren.",
        "Formuliere drei Fragen, die du im Kreißsaal sachlich stellen könntest."),
    ],
    quiz:[
      q("Was kann Tom vor der Geburt eigenständig organisieren?",["Anfahrt, wichtige Kontakte und Unterlagen.","Lenas medizinische Entscheidungen.","Den genauen Verlauf der Geburt."],0,"Organisation ist deine Aufgabe; medizinische Entscheidungen triffst du nicht für sie."),
      q("Lena möchte keine Massage mehr. Wie reagiert Tom?",["Er massiert weiter.","Er stoppt und bleibt aufmerksam.","Er nimmt es persönlich."],1,"Bedürfnisse können sich jederzeit ändern."),
      q("Wenn die Geburt anders verläuft als geplant, sollte Tom …",["auf dem ursprünglichen Plan bestehen.","ohne Rücksprache entscheiden.","ruhig zuhören und beim Verstehen medizinischer Informationen helfen."],2,"Respekt und Flexibilität sind wichtig."),
      q("Was gehört zu guter Geburtsbegleitung?",["Präsenz, Nachfragen und Zusammenarbeit mit Fachpersonen.","Kontrolle über jeden medizinischen Schritt.","Abstand halten, damit niemand etwas fragt."],0,"Du kannst verlässlich da sein, ohne alles kontrollieren zu müssen."),
    ],
    practice:"Übernimm eine konkrete Geburtsvorbereitungsaufgabe und besprecht gemeinsam Wünsche und Grenzen. Bereite dich auch auf Planänderungen vor.",
  },
  {
    title:"Das Wochenbett",
    subtitle:"Einen geschützten Anfang möglich machen.",
    intro:"Nach der Geburt geht es um Erholung, Versorgung und Bindung. Du organisierst Schutz und Alltag – ohne deine Partnerin zusätzlich zur Managerin zu machen.",
    lessons:[
      l("Erholung schützen","Wochenbett und körperliche Regeneration ernst nehmen.",
        "Kurz nach der Heimkehr fragt Toms Familie nach einem Besuch.",
        "Alle würden gern vorbeikommen. Ich frage erst, ob das für uns passt.","Ich brauche gerade Ruhe.",
        "Besuchswünsche sind weniger wichtig als die Bedürfnisse der frischgebackenen Familie. Tom übernimmt die Kommunikation.",
        "Organisiere Essen und Ruhezeiten und kläre Besuchsregeln."),
      l("Besuche und Grenzen","Nach außen Verantwortung übernehmen.",
        "Verwandte kündigen sich spontan an.",
        "Ich erkläre freundlich, dass wir Besuch nur nach Absprache möchten.","Danke, ich möchte das nicht selbst jedem erklären müssen.",
        "Tom übernimmt unangenehme Gespräche, statt sie an Lena weiterzureichen.",
        "Schreibe eine freundliche Nachricht mit euren Besuchsgrenzen."),
      l("Versorgung und Alltag","Versorgung nicht als Zusatzhilfe verstehen.",
        "Das Baby ist nachts unruhig, der Kühlschrank ist leer.",
        "Ich kümmere mich um Wickeln, Frühstück und den Einkauf.","So kann ich mich zwischendurch erholen.",
        "Tom übernimmt angemessene Aufgaben bei Pflege und Haushalt, angepasst an den Still- oder Fütteralltag.",
        "Erstelle eine eigene Routine für Mahlzeiten, Haushalt und Babyversorgung."),
    ],
    quiz:[
      q("Was steht im Wochenbett besonders im Mittelpunkt?",["Viele Gäste.","Erholung, Versorgung und ein geschützter Anfang.","Eine perfekt aufgeräumte Wohnung."],1,"Ruhe und Unterstützung sind wichtiger als Erwartungen anderer."),
      q("Lena wünscht keinen Besuch. Was macht Tom?",["Er lädt trotzdem ein.","Er lässt Lena die Absagen organisieren.","Er kommuniziert die gemeinsame Grenze selbst."],2,"Du kannst die Kommunikation nach außen übernehmen."),
      q("Wie beteiligt sich Tom nachts?",["Er übernimmt passende Aufgaben und stimmt sich ab.","Er schläft immer durch.","Er fragt jeden Morgen nach einer vollständigen Aufgabenliste."],0,"Die Aufteilung richtet sich nach eurer Situation und geteilter Verantwortung."),
      q("Was sollte Tom bei auffälligen Beschwerden beachten?",["Selbst diagnostizieren.","Lena unterstützen, fachliche Hilfe zu erhalten.","Alles ignorieren."],1,"Medizinische Warnzeichen gehören zu qualifizierten Fachpersonen."),
    ],
    practice:"Plane die Basisversorgung für mehrere Tage: Essen, Einkäufe, Wäsche, Besuchskommunikation und Ruhe – gemeinsam abstimmen, dann selbst organisieren.",
  },
  {
    title:"Baby-Alltag in der Praxis",
    subtitle:"Vertrauen entsteht, wenn du selbst ins Tun kommst.",
    intro:"Du bist Vater, nicht Babysitter. Du eignest dir Wissen an, übst, achtest auf Sicherheit und trägst auch die Organisation rund ums Baby.",
    lessons:[
      l("Vater statt Babysitter","Die eigene Elternrolle anerkennen.",
        "Lena möchte eine Pause machen. Tom sagt, er könne auf das Baby aufpassen.",
        "Ich übernehme jetzt die Betreuung. Du musst mir keine Liste schreiben.","Das entlastet mich wirklich.",
        "Sich um das eigene Kind zu kümmern, ist keine Gefälligkeit. Tom macht sich mit Versorgung und Routinen vertraut.",
        "Übernimm eine Betreuungseinheit inklusive Vorbereitung und Aufräumen."),
      l("Wenn das Baby weint","Ruhig bleiben und Sicherheit beachten.",
        "Das Baby weint trotz frischer Windel.",
        "Ich prüfe ruhig mögliche Bedürfnisse. Wenn ich überfordert bin, lege ich es sicher ab und hole Unterstützung.","Du musst nicht auf alles sofort eine Antwort haben.",
        "Tom darf lernen und Hilfe holen. Wichtig: Ein Baby niemals schütteln.",
        "Informiere dich über sichere Beruhigung, Versorgung und den Umgang mit Überforderung."),
      l("Routinen eigenständig tragen","Vorräte, Termine und Nachbereitung organisieren.",
        "Die Windeln gehen zur Neige, ein Termin steht an.",
        "Ich habe Windeln besorgt und den Termin eingetragen.","Gut, dann muss ich nicht daran erinnern.",
        "Auch beim Baby-Alltag gehören Planung und Verantwortung zur Versorgung.",
        "Übernimm einen kompletten Versorgungsbereich mit Vorräten und Terminen."),
    ],
    quiz:[
      q("Wie sollte Tom seine Rolle beim Baby verstehen?",["Als gleich verantwortlicher Elternteil.","Als gelegentlicher Babysitter.","Als Aushilfe, wenn Lena darum bittet."],0,"Vatersein umfasst Versorgung und Verantwortung."),
      q("Was tut Tom bei Überforderung durch Weinen?",["Er schüttelt das Baby.","Er legt es bei Bedarf sicher ab und holt Unterstützung.","Er ignoriert es grundsätzlich."],1,"Niemals schütteln. Unterstützung holen ist verantwortungsvoll."),
      q("Was gehört zur Babyversorgung?",["Nur Füttern.","Nur Spielen.","Auch Vorräte, Reinigung, Termine und Routinen."],2,"Verantwortung endet nicht mit der sichtbaren Tätigkeit."),
      q("Wie gewinnt Tom Sicherheit?",["Durch Lernen, Übung und fachliche Sicherheitsempfehlungen.","Indem er alles Lena überlässt.","Indem er Sicherheitsregeln ignoriert."],0,"Elternschaft ist ein Lernprozess."),
    ],
    practice:"Übernimm einen vollständigen Baby-Alltagsbereich. Informiere dich selbst über passende Sicherheitsregeln und hole bei Unsicherheit fachliche Hilfe.",
  },
  {
    title:"Raum für sie",
    subtitle:"Sie ist Mutter. Und immer noch sie selbst.",
    intro:"Lena bleibt ein eigenständiger Mensch mit Wünschen, Grenzen und Interessen. Du sorgst für verlässliche Freiräume, ohne zu bestimmen, wie sie diese nutzt.",
    lessons:[
      l("Sie ist mehr als Mutter","Eigene Interessen und Bedürfnisse respektieren.",
        "Lena vermisst eine Freundin und hätte gern Zeit für sich.",
        "Ich übernehme Samstag den Baby-Alltag, wenn du dir Zeit für dich nehmen möchtest.","Danke. Was ich mit der Zeit mache, entscheide ich gern selbst.",
        "Tom schafft Raum, ohne Erwartungen oder Bedingungen daran zu knüpfen.",
        "Organisiere verlässliche Betreuungszeit, ohne Lena dafür vorher alles vorbereiten zu lassen."),
      l("Zuhören statt lösen","Aktiv zuhören und Grenzen respektieren.",
        "Lena erzählt von den vielen Erwartungen, die auf ihr lasten.",
        "Möchtest du, dass ich einfach zuhöre oder dass wir gemeinsam eine Lösung suchen?","Hör mir bitte erst einmal zu.",
        "Tom nimmt den Wunsch ernst. Nicht jedes Gefühl muss von ihm sofort gelöst werden.",
        "Übe zuzuhören, ohne zu unterbrechen oder ungefragt Ratschläge zu geben."),
      l("Dauerhaft ein Team sein","Verlässliche Verantwortung verankern.",
        "Einige Wochen später merkt Tom, dass die Terminplanung wieder bei Lena landet.",
        "Ich habe gemerkt, dass ich das schleifen lasse. Ab jetzt trage ich die Termine selbst ein.","Danke. Mir ist wichtig, dass wir beide dranbleiben.",
        "Mittragen ist keine einmalige Heldentat. Tom überprüft seine Routinen selbst und verbessert sie.",
        "Übernimm zwei dauerhafte Zuständigkeitsbereiche und überprüfe deine Umsetzung."),
    ],
    quiz:[
      q("Wie schafft Tom wirklichen Freiraum für Lena?",["Indem er ihre Freizeit festlegt.","Indem er Betreuung selbst organisiert und ihr die Wahl lässt.","Indem er eine Gegenleistung erwartet."],1,"Freiräume müssen nicht verdient werden."),
      q("Lena möchte einfach erzählen. Was tut Tom?",["Er hört zu und respektiert ihren Wunsch.","Er erklärt sofort, wie sie sich fühlen sollte.","Er lenkt das Gespräch auf seine eigenen Leistungen."],0,"Aktives Zuhören schafft Verbindung."),
      q("Was zeigt dauerhafte Verantwortung?",["Eine einmalige Überraschung.","Dass Lena alles weiter kontrolliert.","Verlässliche Routinen ohne ständige Erinnerung."],2,"Konsequente Zuständigkeiten sind zentral."),
      q("Was bedeutet Mittragen für Lenas persönliche Wünsche?",["Tom entscheidet für sie.","Tom respektiert ihre Selbstbestimmung und organisiert seinen Anteil.","Lena muss ihre Wünsche begründen."],1,"Partnerschaftliche Verantwortung ist nicht Bevormundung."),
    ],
    practice:"Übernimm zwei dauerhafte Bereiche und prüfe nach einer Woche selbst, was funktioniert – ohne Lena zur Kontrolleurin zu machen.",
  },
];
