import { useState, useMemo } from "react";
import { semesterArchive } from "../data/semesterGalleryData";

export function useSemesterGallery() {
  const [activeSemIdx, setActiveSemIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  const activeSemester = semesterArchive[activeSemIdx] || semesterArchive[0];

  const filteredItems = useMemo(() => {
    let items = activeSemester.items || [];
    if (activeFilter === "photos") {
      items = items.filter((i) => i.type === "image");
    } else if (activeFilter === "videos") {
      items = items.filter((i) => i.type === "video");
    } else if (activeFilter !== "all") {
      items = items.filter((i) => (i.category || "").toLowerCase() === activeFilter.toLowerCase());
    }
    return items;
  }, [activeSemester, activeFilter]);

  const prevSemester = () => {
    setActiveSemIdx((prev) => (prev > 0 ? prev - 1 : semesterArchive.length - 1));
  };

  const nextSemester = () => {
    setActiveSemIdx((prev) => (prev < semesterArchive.length - 1 ? prev + 1 : 0));
  };

  return {
    semesters: semesterArchive,
    activeSemIdx,
    setActiveSemIdx,
    activeSemester,
    activeFilter,
    setActiveFilter,
    filteredItems,
    prevSemester,
    nextSemester,
  };
}
