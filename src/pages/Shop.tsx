import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Repeat } from "lucide-react";
import { Reveal, WordsPullUp, EASE } from "../components/ui";
import ShopHero from "../components/ShopHero";
import { PRODUCTS, DROP } from "../lib/content";
import type { Product } from "../lib/content";

/* Price format: R 450 (ZAR). Prices are placeholders per the plan. */
export const formatPrice = (n: number) => `R ${n.toLocaleString("en-ZA")}`;

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  // front -> back -> any lifestyle ("as worn") shots, cycled on hover/click
  const frames = [
    { src: product.front, label: "front" },
    { src: product.back, label: "back" },
    ...(product.lifestyle ?? []).map((src, i) => ({
      src,
      label: `as worn ${i + 1}`,
    })),
  ];
  const [frame, setFrame] = useState(0);
  const active = frames[frame];
  const next = () => setFrame((f) => (f + 1) % frames.length);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: EASE }}
      className="group"
    >
      <div
        className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100"
        onMouseEnter={next}
        onClick={next}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.src}
            src={active.src}
            alt={`${product.name} — ${active.label}`}
            className={`absolute inset-0 h-full w-full ${
              active.label.startsWith("as worn") ? "object-cover object-top" : "object-cover"
            }`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            loading="lazy"
          />
        </AnimatePresence>
        {/* cycle hint */}
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <Repeat className="h-3.5 w-3.5" />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[9px] tracking-[0.3em] text-gray-400 backdrop-blur">
          {DROP.code}
        </span>
        {/* frame dots — only shown when there's more than front/back to cycle through */}
        {frames.length > 2 && (
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {frames.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === frame ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-ink">{product.name}</h3>
          <p className="mt-0.5 font-serif italic text-sm text-neutral-500">
            {product.caption}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.3em] text-neutral-500">
            {product.colorway.toUpperCase()} · BOXY FIT
          </p>
        </div>
        <span className="whitespace-nowrap text-sm font-bold text-ink">
          {formatPrice(product.price)}
        </span>
      </div>

      <Link
        to="/contact"
        className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
      >
        RESERVE VIA INQUIRY
        <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
      </Link>
    </motion.article>
  );
}

export default function Shop() {
  return (
    <main className="bg-white">
      {/* fullscreen cinematic video intro */}
      <ShopHero />

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:pt-32">
        {/* drop header — editorial */}
        <p className="mb-6 text-[10px] tracking-[0.45em] text-neutral-500">
          {DROP.code} · LIMITED RUN
        </p>
        <h2 className="text-5xl font-extrabold leading-[0.9] tracking-tight text-ink md:text-8xl">
          <WordsPullUp text="Wear the" />
          <br />
          <span className="font-serif italic font-normal">
            <WordsPullUp text="culture." delay={0.2} />
          </span>
        </h2>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
            {DROP.blurb} Street style meets automotive art — designed in
            Katlehong, made for the scene.
          </p>
          <p className="text-[10px] tracking-[0.3em] text-neutral-500">
            PRICES PROVISIONAL · FINAL AT DROP
          </p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>

        {/* how the drop works */}
        <div className="mt-24 grid gap-3 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Limited by design",
              d: "Small, numbered runs. We'd rather sell out than water it down.",
            },
            {
              n: "02",
              t: "Reserve via inquiry",
              d: "Online checkout is coming. For now, reserve your size through an inquiry and we'll confirm by email.",
            },
            {
              n: "03",
              t: "Collabs welcome",
              d: "Limited-edition pieces with car influencers and brands — if you want to build a drop together, talk to us.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-gray-300 p-7">
                <span className="font-serif italic text-3xl text-neutral-400">
                  {s.n}
                </span>
                <h2 className="mt-4 text-lg font-bold text-ink">{s.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {s.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-5 text-center">
          <p className="max-w-md text-sm text-neutral-600">
            Want first access when the drop goes live?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-all hover:gap-3"
          >
            Get on the list
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-110">
              <ArrowRight className="h-4 w-4 text-ink" />
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
