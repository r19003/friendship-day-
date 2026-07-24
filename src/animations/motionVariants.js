// ══════════════════════════════════════════
// GLOBAL REUSABLE FRAMER MOTION VARIANTS
// ══════════════════════════════════════════

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const headingReveal = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const gentleScale = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideFromLeft = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideFromRight = {
  hidden: {
    opacity: 0,
    x: 36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const scrapbookReveal = {
  hidden: {
    opacity: 0,
    y: 26,
    rotate: -3,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const stampAnimation = {
  hidden: {
    opacity: 0,
    scale: 2.2,
    rotate: -14,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -8,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const glowPulseOnce = {
  hidden: {
    boxShadow: "0 0 0px rgba(245, 207, 102, 0)",
  },
  visible: {
    boxShadow: "0 0 30px rgba(245, 207, 102, 0.6)",
    transition: {
      duration: 0.8,
      yoyo: 1,
    },
  },
};

export const handwritingLine = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export const polaroidDevelop = {
  hidden: {
    opacity: 0,
    filter: "contrast(80%) brightness(120%) blur(4px)",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    filter: "contrast(100%) brightness(100%) blur(0px)",
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const modalReveal = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.25,
    },
  },
};

export const successPop = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 18,
    },
  },
};
