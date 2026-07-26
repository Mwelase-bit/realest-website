import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Check, Send, Play, ArrowRight, AlertCircle } from "lucide-react";
import {
  Reveal,
  WordsPullUp,
  WordsPullUpMultiStyle,
  ServiceIcon,
  PillButton,
  EASE,
} from "../components/ui";
import {
  SERVICES,
  TEAM,
  BRAND,
  YOUTUBE,
  PRODUCTS,
  videoUrl,
  videoThumb,
} from "../lib/content";
import { GALLERY } from "../lib/gallery";
import { formatPrice } from "./Shop";
import { validateInquiry, submitInquiry } from "../lib/api";
import type { Inquiry, InquiryErrors } from "../lib/api";

/* ================================================================== */
/*  SERVICES                                                           */
/* ================================================================== */

export function Services() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [hash]);

  return (
    <main className="bg-white px-6 pb-28 pt-36 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-[10px] tracking-[0.45em] text-gray-500">
          SERVICES
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          <WordsPullUp text="Made for the" />{" "}
          <span className="font-serif italic font-normal">
            <WordsPullUp text="culture." delay={0.2} />
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
          A multimedia platform capturing the raw energy of car culture —
          branded content, merchandise and creative collaborations. Street
          style meets automotive art; cinematic video and photography that
          tells the stories behind the build.
        </p>

        <div className="mt-20 space-y-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article
                id={s.slug}
                className="grid gap-6 rounded-2xl bg-neutral-100 p-8 md:grid-cols-12 md:p-12"
              >
                <div className="flex items-start justify-between md:col-span-3 md:flex-col md:justify-start md:gap-6">
                  <span className="font-serif italic text-5xl text-neutral-400">
                    {s.index}
                  </span>
                  <ServiceIcon name={s.icon} className="h-7 w-7 text-ink" />
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-2xl font-bold text-ink md:text-3xl">
                    {s.title}{" "}
                    <span className="block font-serif italic font-normal text-lg text-neutral-500 md:text-xl">
                      {s.accent}
                    </span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                    {s.long}
                  </p>
                  {s.slug === "reviews" && <VideoGrid videos={REVIEWS} />}
                  {s.slug === "photography" && <PhotoStrip />}
                  {s.slug === "behind-the-scenes" && <VideoGrid videos={VLOGS} />}
                  {s.slug === "short-form" && <ShortFormStrip />}
                  {s.slug === "merchandise" && <MerchStrip />}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-6 text-center">
          <p className="max-w-md text-sm text-neutral-600">
            Want a shoot, a review of your build, or a collab on a drop?
          </p>
          <PillButton to="/contact">Start an inquiry</PillButton>
        </Reveal>
      </div>
    </main>
  );
}

/* Content splits for the service cards: vlog-titled films go to the
   Behind-the-Scenes card, the rest to YouTube Reviews. */
const VLOGS = YOUTUBE.videos.filter((v) => /vlog/i.test(v.title)).slice(0, 3);
const REVIEWS = YOUTUBE.videos
  .filter((v) => !/vlog/i.test(v.title))
  .slice(0, 6);

/* Films from the channel — clickable thumbnails linking to YouTube. */
function VideoGrid({ videos }: { videos: typeof YOUTUBE.videos }) {
  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <a
            key={v.id}
            href={videoUrl(v.id)}
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-200">
              <img
                src={videoThumb(v.id)}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30" />
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-90 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                <Play className="ml-0.5 h-4 w-4 fill-ink text-ink" />
              </span>
            </div>
            <p className="mt-2.5 line-clamp-2 text-xs font-bold leading-snug text-ink md:text-sm">
              {v.title}
            </p>
          </a>
        ))}
      </div>
      <a
        href={YOUTUBE.channel}
        target="_blank"
        rel="noreferrer"
        className="group mt-7 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
      >
        MORE ON YOUTUBE · @REALESTAUTOCOLLECTIVE
        <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
      </a>
    </div>
  );
}

/* Shots from the gallery — shown inside the Car Photography card. */
function PhotoStrip() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {GALLERY.slice(40, 46).map((src, i) => (
          <Link
            key={src}
            to="/gallery"
            className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-200"
          >
            <img
              src={src}
              alt={`Realest photography sample ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </Link>
        ))}
      </div>
      <Link
        to="/gallery"
        className="group mt-7 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
      >
        VIEW ALL {GALLERY.length} FRAMES IN THE GALLERY
        <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
      </Link>
    </div>
  );
}

/* Vertical frames + link out — shown inside the Short-Form Content card. */
function ShortFormStrip() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-3">
        {GALLERY.slice(60, 64).map((src, i) => (
          <a
            key={src}
            href={BRAND.tiktok}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-neutral-200"
          >
            <img
              src={src}
              alt={`Realest short-form frame ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-colors duration-300 group-hover:from-black/60" />
            <span className="absolute bottom-2 left-2.5 text-[9px] font-bold tracking-[0.25em] text-white/90">
              9:16
            </span>
          </a>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
        <a
          href={BRAND.tiktok}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
        >
          TIKTOK · {BRAND.handle.toUpperCase()}
          <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
        </a>
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
        >
          INSTAGRAM · {BRAND.handle.toUpperCase()}
          <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
        </a>
      </div>
    </div>
  );
}

/* The actual drop — shown inside the Street-Inspired Merch card. */
function MerchStrip() {
  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link key={p.slug} to="/shop" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={p.front}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-2.5 flex items-start justify-between gap-3">
              <p className="text-xs font-bold leading-snug text-ink md:text-sm">
                {p.name}
              </p>
              <span className="whitespace-nowrap text-xs font-bold text-ink md:text-sm">
                {formatPrice(p.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/shop"
        className="group mt-7 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-500 transition-colors hover:text-ink"
      >
        SHOP THE DROP
        <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
      </Link>
    </div>
  );
}

/* ================================================================== */
/*  OUR STORY                                                          */
/* ================================================================== */

export function Story() {
  return (
    <main className="bg-white px-6 pb-28 pt-36 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-[10px] tracking-[0.45em] text-gray-500">
          OUR STORY
        </p>
        <h1 className="max-w-3xl text-3xl leading-[0.95] text-ink sm:text-4xl md:text-5xl lg:text-6xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Founded in 2024,", className: "font-normal" },
              {
                text: "born from the scene itself.",
                className: "font-serif italic",
              },
            ]}
            className="!justify-start"
          />
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
              The automotive media and street culture scene has grown fast —
              car content has evolved from simple showcase videos into
              full-blown storytelling, lifestyle branding and culture-driven
              visuals. Realest Auto Collective was founded in {BRAND.founded}{" "}
              in response to that demand: with car culture booming across
              social and event spaces, we stepped in to give it a fresh,
              artistic and authentic voice.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
              What sets us apart is authenticity — we focus on real car
              people, real builds and real culture, not just flashy cars. Very
              few brands combine clothing with car culture in a way that tells
              a story or feels personal. That's the space we live in.
            </p>
          </Reveal>
        </div>

        {/* vision / mission */}
        <div className="mt-20 grid gap-3 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-neutral-100 p-8 md:p-10">
              <p className="mb-4 text-[10px] tracking-[0.45em] text-neutral-500">
                VISION
              </p>
              <p className="font-serif italic text-xl leading-snug text-ink md:text-2xl">
                {BRAND.vision}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-neutral-100 p-8 md:p-10">
              <p className="mb-4 text-[10px] tracking-[0.45em] text-neutral-500">
                MISSION
              </p>
              <p className="font-serif italic text-xl leading-snug text-ink md:text-2xl">
                {BRAND.mission}
              </p>
            </div>
          </Reveal>
        </div>

        {/* team */}
        <h2 className="mt-24 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          The <span className="font-serif italic font-normal">organization.</span>
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <article className="rounded-2xl border border-gray-300 p-8">
                <h3 className="text-xl font-bold text-ink">{t.name}</h3>
                <p className="mt-1 text-xs tracking-[0.25em] text-gray-500">
                  {t.role.toUpperCase()}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                  {t.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-6 text-center">
          <p className="max-w-md text-sm text-neutral-600">
            We’re committed to growing into a leading voice in automotive
            content and streetwear.
          </p>
          <PillButton to="/contact">Work with us</PillButton>
        </Reveal>
      </div>
    </main>
  );
}

/* ================================================================== */
/*  CONTACT / INQUIRIES                                                */
/* ================================================================== */

const TOPICS = [
  "Photography / shoot booking",
  "Car review submission",
  "Merchandise / collab drop",
  "Sponsorship or investment",
  "Something else",
];

export function Contact() {
  const [form, setForm] = useState<Inquiry>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const set = (k: keyof Inquiry) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateInquiry(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("sending");
    try {
      await submitInquiry(form);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", topic: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition-all placeholder:text-neutral-400 focus:ring-4 ${
      bad
        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
        : "border-gray-200 focus:border-ink/50 focus:ring-primary/25"
    }`;

  return (
    <main className="bg-white px-6 pb-28 pt-36 md:pt-44">
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2">
        <div>
          <p className="mb-6 text-[10px] tracking-[0.45em] text-gray-500">
            INQUIRIES
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
            <WordsPullUp text="Reach" />{" "}
            <span className="font-serif italic font-normal">
              <WordsPullUp text="out." delay={0.15} />
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
            We’re always open to partnerships, collaborations, sponsorships
            and creative opportunities. Whether you’re a fellow creator,
            investor, car lover or streetwear enthusiast — let’s build
            something real together.
          </p>
          <ul className="mt-10 space-y-3 text-xs tracking-widest text-neutral-600">
            <li>{BRAND.location.toUpperCase()}</li>
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="transition-colors hover:text-ink"
              >
                {BRAND.email.toUpperCase()}
              </a>
            </li>
            {BRAND.phones.map((p) => (
              <li key={p.name}>
                {p.name.toUpperCase()}: {p.number}
              </li>
            ))}
          </ul>
        </div>

        {/* form */}
        <div>
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex h-full flex-col items-center justify-center gap-5 rounded-3xl border border-gray-200 bg-neutral-50 p-10 text-center shadow-sm md:p-14"
            >
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ink"
              >
                <Check className="h-6 w-6" style={{ color: "#E1E0CC" }} />
              </motion.span>
              <div>
                <h2 className="text-2xl font-bold text-ink">
                  Inquiry <span className="font-serif italic font-normal">sent.</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
                  Thanks, {form.name.split(" ")[0]} — we’ll get back to you at{" "}
                  <span className="font-medium text-ink">{form.email}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-2 text-xs font-medium tracking-[0.2em] text-neutral-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-ink"
              >
                SEND ANOTHER INQUIRY
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-3xl border border-gray-200 bg-neutral-50 p-7 shadow-sm md:p-9"
            >
              <div className="flex items-center gap-3.5 border-b border-gray-200 pb-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink">
                  <Send className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Send us a message</p>
                  <p className="text-xs text-neutral-500">
                    We typically reply within 2 business days.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    className={inputCls(errors.name)}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    className={inputCls(errors.email)}
                    placeholder="you@example.com"
                    type="email"
                    aria-invalid={!!errors.email}
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </Field>
              </div>

              <Field label="What's this about?" error={errors.topic}>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={form.topic === t}
                      onClick={() => set("topic")(t)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                        form.topic === t
                          ? "border-ink bg-ink text-white shadow-sm"
                          : "border-gray-200 bg-white text-neutral-600 hover:border-ink/40 hover:text-ink"
                      }`}
                    >
                      {form.topic === t && <Check className="h-3 w-3" />}
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  className={`${inputCls(errors.message)} min-h-[120px] resize-y`}
                  placeholder="Tell us about the build, the shoot, or the idea…"
                  aria-invalid={!!errors.message}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                />
              </Field>

              {status === "error" && (
                <p className="flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-3 text-xs leading-relaxed text-red-600">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  The inquiry couldn’t be sent. Check your connection and try
                  again — or email us directly at {BRAND.email}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all hover:shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send inquiry
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium tracking-[0.35em] text-neutral-500">
        {label.toUpperCase()}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </span>
      )}
    </label>
  );
}
