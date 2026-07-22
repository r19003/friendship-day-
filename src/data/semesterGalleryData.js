// ══════════════════════════════════════════
// SEMESTER ARCHIVE DEFINITIONS (Semesters 1 to 6: 2023 – June 2026)
// Real structural definitions with clean initial empty item arrays
// ══════════════════════════════════════════

export const semesterDefinitions = [
  {
    semesterNumber: 1,
    title: "Semester One",
    dateLabel: "2023",
    description: "The beginning of our college memory archive.",
    accent: "lavender",
  },
  {
    semesterNumber: 2,
    title: "Semester Two",
    dateLabel: "January–June 2024",
    description: "More comfort, more photographs, and more reasons to stay together longer.",
    accent: "yellow",
  },
  {
    semesterNumber: 3,
    title: "Semester Three",
    dateLabel: "July–December 2024",
    description: "The friendship becoming more natural, familiar, and chaotic.",
    accent: "purple",
  },
  {
    semesterNumber: 4,
    title: "Semester Four",
    dateLabel: "January–June 2025",
    description: "Ordinary college days slowly becoming irreplaceable memories.",
    accent: "blue",
  },
  {
    semesterNumber: 5,
    title: "Semester Five",
    dateLabel: "July–December 2025",
    description: "Plans, celebrations, events, and the feeling that college was moving too quickly.",
    accent: "pink",
  },
  {
    semesterNumber: 6,
    title: "Semester Six",
    dateLabel: "January–June 2026",
    description: "The chapter where college memories began meeting internships, work, careers, and growing responsibilities.",
    accent: "gold",
  },
];

export const semesterArchive = semesterDefinitions.map((sem) => ({
  id: `semester-${sem.semesterNumber}`,
  semesterNumber: sem.semesterNumber,
  title: sem.title,
  dateLabel: sem.dateLabel,
  description: sem.description,
  accent: sem.accent,
  items: [],
}));
