import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { WordsPullUp, PillButton, Reveal, EASE } from "../components/ui";
import { GALLERY } from "../lib/gallery";
import { BRAND } from "../lib/content";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) =>
        a === null ? a : (a + dir + GALLERY.length) % GALLERY.length
      ),
    []
  );

  /* keyboard nav for the lightbox */
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <main className="bg-white px-6 pb-28 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl">
        {/* editorial header */}
        <p className="mb-6 text-[10px] tracking-[0.45em] text-neutral-500">
          GALLERY · SHOT BY REALEST
        </p>
        <h1 className="text-5xl font-extrabold leading-[0.9] tracking-tight text-ink md:text-8xl">
          <WordsPullUp text="Through the" />
          <br />
          <span className="font-serif italic font-normal">
            <WordsPullUp text="lens." delay={0.2} />
          </span>
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
            Builds, meets and the streets in between — every frame shot by the
            collective in and around {BRAND.location.split(",")[0]}. Light,
            angle, attitude.
          </p>
          <p className="text-[10px] tracking-[0.3em] text-neutral-500">
            {GALLERY.length} FRAMES · EST. {BRAND.founded}
          </p>
        </div>

        {/* masonry grid */}
        <div className="mt-16 columns-2 gap-3 md:columns-3 lg:columns-4 [column-fill:_balance]">
          {GALLERY.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-lg bg-neutral-100"
            >
              <img
                src={src}
                alt={`Realest Auto Collective — frame ${i + 1}`}
                loading="lazy"
                className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              <span className="pointer-events-none absolute bottom-2.5 left-3 text-[9px] tracking-[0.3em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                RAC · {String(i + 1).padStart(3, "0")}
              </span>
            </motion.button>
          ))}
        </div>

        <Reveal className="mt-24 flex flex-col items-center gap-6 text-center">
          <p className="max-w-md text-sm text-neutral-600">
            Want your build shot like this? Book a shoot with the collective.
          </p>
          <PillButton to="/contact">Book a shoot</PillButton>
        </Reveal>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={close}
          >
            <motion.img
              key={active}
              src={GALLERY[active]}
              alt={`Realest Auto Collective — frame ${active + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-h-full max-w-full rounded-md object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:left-6"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:right-6"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] text-white/60">
              {String(active + 1).padStart(3, "0")} / {String(GALLERY.length).padStart(3, "0")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
