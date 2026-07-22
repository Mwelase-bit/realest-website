import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CinematicHero from "../components/CinematicHero";
import {
  Reveal,
  WordsPullUpMultiStyle,
  ServiceIcon,
  PillButton,
  EditorialBreak,
  Marquee,
  PhotoReel,
  TextMarquee,
  EASE,
} from "../components/ui";
import {
  SERVICES,
  STATS,
  MILESTONES,
  BRAND,
  PRODUCTS,
  DROP,
  YOUTUBE,
  videoThumb,
} from "../lib/content";
import { EDITORIAL, GALLERY } from "../lib/gallery";
import { ProductCard, formatPrice } from "./Shop";

export default function Home() {
  return (
    <main>
      {/* scroll header — fullscreen film hero */}
      <CinematicHero />

      {/* ---------------- brand ticker ---------------- */}
      <Marquee />

      {/* ---------------- editorial statement ---------------- */}
      <section className="bg-white px-6 py-28 md:py-40">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-[10px] tracking-[0.45em] text-gray-700">
            THE COLLECTIVE · EST. {BRAND.founded}
          </p>
          <h2 className="max-w-4xl text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
            <WordsPullUpMultiStyle
              className="!justify-start"
              segments={[
                { text: "Real car people.", className: "font-extrabold text-ink" },
                { text: "Real builds.", className: "font-serif italic text-neutral-400" },
                { text: "Real culture.", className: "font-extrabold text-ink" },
              ]}
            />
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="text-sm leading-relaxed text-gray-600 md:col-span-5 md:text-base">
              {BRAND.mission} Not just flashy cars — the people, the process
              and the streets behind every build, from {BRAND.location.split(",")[0]}{" "}
              to the whole scene.
            </p>
            <div className="flex items-end gap-10 md:col-span-7 md:justify-end">
              {STATS.map((st, i) => (
                <Reveal key={st.label} delay={i * 0.1}>
                  <div>
                    <p className="text-4xl font-extrabold text-ink md:text-5xl">
                      {st.value}%
                    </p>
                    <p className="mt-1 max-w-[9rem] text-[10px] tracking-[0.25em] text-gray-700">
                      {st.label.toUpperCase()}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- editorial break 01 — lifestyle shot ---------------- */}
      <EditorialBreak
        src={EDITORIAL.first}
        caption="Shot by the collective"
        tagline={`Builds, meets and the streets in between — every frame ours, from ${BRAND.location.split(",")[0]} out.`}
        to="/gallery"
        cta="View the gallery"
      />

      {/* ---------------- the drop (merch strip) ---------------- */}
      <section className="bg-white px-6 pb-28 pt-28 md:pb-40 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-4 flex items-center gap-4 text-[10px] tracking-[0.4em] text-gray-700">
              <span className="h-px w-10 bg-ink/30" />
              {DROP.code} · {DROP.name.toUpperCase()}
            </div>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                The <span className="font-serif italic font-normal">drop.</span>
              </h2>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-xs tracking-[0.3em] text-gray-600 transition-colors hover:text-ink"
              >
                SHOP ALL · FROM {formatPrice(Math.min(...PRODUCTS.map((p) => p.price)))}
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0 group-hover:text-ink" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
          <Reveal className="mt-16 flex justify-center">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full border border-ink px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              VIEW ALL {PRODUCTS.length} TEES
              <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- services — editorial index rows ---------------- */}
      <section className="bg-white px-6 pb-28 md:pb-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              What we <span className="font-serif italic font-normal">make.</span>
            </h2>
            <p className="mb-12 max-w-md text-sm text-gray-600">
              A multimedia platform capturing the raw energy of car culture —
              cinematic video and photography that tells the stories behind the
              build.
            </p>
          </Reveal>
          <div className="border-t border-gray-300">
            {SERVICES.map((s, i) => (
              <ServiceRow key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- editorial break 02 — lifestyle shot ---------------- */}
      <EditorialBreak
        src={EDITORIAL.second}
        caption="Made for the culture"
        tagline="Cinematic video and photography that tells the stories behind the build."
        to="/services"
        cta="What we make"
      />

      {/* ---------------- milestones ---------------- */}
      <section className="bg-white px-6 pb-28 pt-28 md:pb-40 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-14 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              Where this is{" "}
              <span className="font-serif italic font-normal">going.</span>
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1}>
                <div className="rounded-xl border border-gray-300 p-7">
                  <p className="font-serif italic text-4xl text-ink">
                    {m.year}
                  </p>
                  <div className="my-5 h-px w-8 bg-ink/25" />
                  <p className="text-sm leading-relaxed text-gray-600">
                    {m.goal}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- fresh from the lens — photo reel ---------------- */}
      <section className="bg-white pb-28 md:pb-40">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Fresh from the{" "}
                <span className="font-serif italic font-normal">lens.</span>
              </h2>
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 text-xs tracking-[0.3em] text-gray-600 transition-colors hover:text-ink"
              >
                ALL {GALLERY.length} FRAMES
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
              </Link>
            </div>
          </Reveal>
        </div>
        {/* text strip + reel + text strip — all drift left together */}
        <Reveal>
          <TextMarquee
            className="text-xs font-extrabold uppercase tracking-[0.2em] text-white md:text-base"
            words={["Real car people", "Real builds", "Real culture"]}
          />
          <PhotoReel images={GALLERY.slice(20, 40)} />
          <TextMarquee
            className="font-serif text-xs italic tracking-tight text-neutral-300 md:text-base"
            words={["Fresh from the lens", "Shot by the collective", "Every frame ours"]}
          />
        </Reveal>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-white px-6 pb-28 md:pb-40">
        <Reveal
          className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-2xl bg-gray-100 bg-cover bg-center px-6 py-20 text-center md:py-28"
          style={{ backgroundImage: `url(${EDITORIAL.first})` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-black/60" />
          <h2 className="relative max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Let’s build something{" "}
            <span className="font-serif italic font-normal">real</span>{" "}
            together.
          </h2>
          <p className="relative max-w-md text-sm text-white/80">
            Open to partnerships, collaborations, sponsorships and creative
            opportunities — whether you’re a fellow creator, investor, car
            lover or streetwear enthusiast.
          </p>
          <PillButton to="/contact" className="relative">
            Start an inquiry
          </PillButton>
        </Reveal>
      </section>
    </main>
  );
}

/* Real media shown in each row's hover preview, matched to the service. */
function previewMedia(slug: string): string[] {
  switch (slug) {
    case "reviews":
      return YOUTUBE.videos
        .filter((v) => !/vlog/i.test(v.title))
        .slice(0, 3)
        .map((v) => videoThumb(v.id));
    case "photography":
      return GALLERY.slice(40, 43);
    case "behind-the-scenes":
      return YOUTUBE.videos
        .filter((v) => /vlog/i.test(v.title))
        .slice(0, 3)
        .map((v) => videoThumb(v.id));
    case "short-form":
      return GALLERY.slice(60, 63);
    case "merchandise":
      return PRODUCTS.slice(0, 3).map((p) => p.front);
    default:
      return [];
  }
}

/* driversclub-style index row: number, title, accent, expands on hover */
function ServiceRow({
  s,
  i,
}: {
  s: (typeof SERVICES)[number];
  i: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
    >
      <Link
        to={`/services#${s.slug}`}
        className="group block border-b border-gray-300 py-7 transition-colors hover:bg-neutral-50 md:py-9"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex items-center gap-6 px-1 md:gap-10 md:px-4">
          <span className="w-10 shrink-0 font-serif italic text-xl text-neutral-400 md:text-2xl">
            {s.index}
          </span>
          <ServiceIcon
            name={s.icon}
            className="hidden h-5 w-5 shrink-0 text-neutral-500 sm:block"
          />
          <h3 className="flex-1 text-xl font-bold text-ink transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
            {s.title}{" "}
            <span className="font-serif italic font-normal text-base text-neutral-400 md:text-xl">
              — {s.accent}
            </span>
          </h3>
          <ArrowRight className="h-5 w-5 shrink-0 -rotate-45 text-neutral-500 transition-all group-hover:rotate-0 group-hover:text-ink" />
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden pl-[4.2rem] pr-10 md:pl-[8.5rem]"
        >
          <p className="pt-3 max-w-xl text-sm leading-relaxed text-gray-600">
            {s.short}
          </p>
          <div className="flex gap-2.5 pb-2 pt-4">
            {previewMedia(s.slug).map((src, j) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="h-20 w-32 rounded-md object-cover md:h-24 md:w-40"
                style={{ transitionDelay: `${j * 40}ms` }}
              />
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
