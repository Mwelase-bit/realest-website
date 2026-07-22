import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WordsPullUp, PillButton } from "./ui";
import { BRAND } from "../lib/content";

const HERO_VIDEO = "/golf-burgundy-reveal-v2.mp4";

/* ------------------------------------------------------------------ */
/*  Fullscreen film hero on a short 160vh scroll track:                */
/*  0.00 – 0.35  film fills the screen, camera settles (subtle zoom)   */
/*  0.20 – 0.55  the Realest hero content rises into place            */
/* ------------------------------------------------------------------ */

export default function CinematicHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  /* camera pushes in as the hero content arrives */
  const camScale = useTransform(p, [0, 0.55], [1, 1.8]);

  /* hero UI rises in after a small scroll */
  const filmUiOpacity = useTransform(p, [0.2, 0.5], [0, 1]);
  const filmUiY = useTransform(p, [0.2, 0.55], [40, 0]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  if (reduced) {
    /* Static fallback: fullscreen film with the hero content, no camera move */
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <HeroContent />
      </section>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* ------------- fullscreen film */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale: camScale }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>

        {/* ------------- film overlays */}
        <div className="pointer-events-none absolute inset-0">
          <div className="noise-overlay absolute inset-0 opacity-[0.3] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* ------------- hero content */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ opacity: filmUiOpacity, y: filmUiY }}
        >
          <HeroContent />
        </motion.div>

        {/* ------------- scroll hint */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] tracking-[0.4em]">SCROLL TO ENTER</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================== */

function HeroContent() {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 md:px-10 md:pb-10">
      <div className="grid grid-cols-12 items-end gap-4">
        <h2
          className="col-span-12 lg:col-span-8 text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] font-medium leading-[0.85] tracking-[-0.07em]"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUp text="Realest" showAsterisk />
        </h2>

        <div className="col-span-12 flex flex-col gap-4 lg:col-span-4 lg:pb-6">
          <p
            className="text-xs text-primary/70 sm:text-sm md:text-base"
            style={{ lineHeight: 1.2 }}
          >
            {BRAND.fullName} is an authentic automotive community — car
            reviews, photography, behind-the-scenes stories and
            street-inspired merchandise, made by real car people for real car
            people.
          </p>
          <div className="pointer-events-auto">
            <PillButton to="/contact">Join the collective</PillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
