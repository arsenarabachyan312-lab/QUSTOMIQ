"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("section").forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already visible on page load — don't animate, just show
      if (rect.top < window.innerHeight && rect.bottom > 0) return;
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
