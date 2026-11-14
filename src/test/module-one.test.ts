import { describe, expect, it } from "vitest";
import { COURSE } from "../data/professionalCourse";

describe("MITTRAGEN: offener Schwangerschafts-Lernparcours", () => {
  const moduleOne = COURSE[0]!;

  it("hält alle sechs Module zugänglich", () => {
    expect(COURSE).toHaveLength(6);
    expect(COURSE.every(module => module.lessons.length > 0 && module.quiz.length > 0)).toBe(true);
  });

  it("vermittelt in Modul 1 neun eigenständige Lerneinheiten und 14 Modulfragen", () => {
    expect(moduleOne.title).toBe("Schwangerschaft verstehen");
    expect(moduleOne.lessons).toHaveLength(9);
    expect(moduleOne.quiz).toHaveLength(14);
  });

  it("enthält pro Lerneinheit Wissen, Handlungsplan, Quellen und Transfercheck", () => {
    for (const lesson of moduleOne.lessons) {
      expect(lesson.knowledge.length).toBeGreaterThanOrEqual(3);
      expect(lesson.steps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.sources.length).toBeGreaterThan(0);
      expect(lesson.dialogue?.some(line => line.speaker === "Tom")).toBe(true);
      expect(lesson.dialogue?.some(line => line.speaker === "Lena")).toBe(true);
      expect(lesson.dialogue?.some(line => line.speaker === "Sprecher")).toBe(true);
      expect(lesson.challenge?.options).toHaveLength(3);
      expect(lesson.challenge?.correct).toBeGreaterThanOrEqual(0);
      expect(lesson.challenge?.correct).toBeLessThan(3);
    }
  });

  it("hinterlegt bei jeder Modulfrage klare Optionen und Rückmeldung", () => {
    for (const question of moduleOne.quiz) {
      expect(question.prompt.length).toBeGreaterThan(12);
      expect(question.options).toHaveLength(3);
      expect(question.correct).toBeGreaterThanOrEqual(0);
      expect(question.correct).toBeLessThan(3);
      expect(question.explanation.length).toBeGreaterThan(12);
    }
  });

  it("verweist auf öffentliche HTTPS-Quellen und nicht auf Avatar-Dateien, die noch fehlen", () => {
    for (const lesson of moduleOne.lessons) {
      for (const source of lesson.sources) expect(source.url.startsWith("https://")).toBe(true);
      expect(lesson.videoSrc).toBeUndefined();
    }
  });
});
