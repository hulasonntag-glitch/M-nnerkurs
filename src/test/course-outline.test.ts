import { describe, expect, it } from "vitest";
import { COURSE } from "../data/professionalCourse";

describe("MITTRAGEN Inhaltsverzeichnis",()=>{
  it("zeigt alle sechs Module in derselben Reihenfolge wie der Lernkurs",()=>{
    expect(COURSE.map(entry=>entry.title)).toEqual([
      "Schwangerschaft verstehen",
      "Mental Load übernehmen",
      "Geburt: dein Platz",
      "Das Wochenbett",
      "Baby-Alltag in der Praxis",
      "Raum für sie",
    ]);
  });
  it("enthält ausnahmslos benannte Lektionen und Tests",()=>{
    expect(COURSE).toHaveLength(6);
    for(const entry of COURSE){
      expect(entry.lessons.length).toBeGreaterThan(0);
      expect(entry.quiz.length).toBeGreaterThan(0);
      expect(entry.lessons.every(lesson=>lesson.title.length>3 && lesson.objective.length>3)).toBe(true);
    }
  });
  it("beginnt in Modul 1 mit echtem Lernstoff statt einem zweiten Willkommensvideo",()=>{
    expect(COURSE[0]!.lessons[0]!.title).toBe("Nicht nur dabei sein – von Anfang an mittragen");
    expect(COURSE[0]!.lessons.some(l=>l.title.includes("Lebensmittelsicherheit"))).toBe(true);
  });
});
