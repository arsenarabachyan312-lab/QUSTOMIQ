import type { Variants, Transition } from "framer-motion";

export const EASE_OUT    = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

const baseTransition: Transition = {
  duration: 0.7,
  ease: EASE_OUT,
};

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export const staggerContainer = (delay = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

export function itemFadeUp(delay = 0): Variants {
  return {
    hidden:  { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE_OUT, delay },
    },
  };
}
