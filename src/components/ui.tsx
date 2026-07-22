import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CirclePlay,
  Camera,
  Shirt,
  Clapperboard,
  Zap,
  MapPin,
  Mail,
  Link as LinkIcon,
  Phone,
  Music2,
} from "lucide-react";
import { BRAND } from "../lib/content";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Word pull-up text animation (from the original Prisma hero)         */
/* ------------------------------------------------------------------ */

export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  delay = 0,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-hidden pb-[0.1em]">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: delay + i * 0.08, duration: 0.7, ease: EASE }}
            >
              {word}
              {showAsterisk && isLast && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                  *
                </span>
              )}
              {!isLast && "\u00A0"}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* Multi-style variant: array of {text, className} segments. */
export function WordsPullUpMultiStyle({
  segments,
  className = "",
}: {
  segments: { text: string; className?: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const words = segments.flatMap((seg) =>
    seg.text.split(" ").map((w) => ({ w, cls: seg.className ?? "" }))
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ w, cls }, i) => (
        <span key={i} className="overflow-hidden pb-[0.12em]">
          <motion.span
            className={`inline-block ${cls}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Fade-up on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Service icon mapper                                                 */
/* ------------------------------------------------------------------ */

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name: "play" | "camera" | "shirt" | "clapperboard" | "zap";
  className?: string;
}) {
  const props = { className, strokeWidth: 1.5 };
  switch (name) {
    case "play":
      return <CirclePlay {...props} />;
    case "camera":
      return <Camera {...props} />;
    case "shirt":
      return <Shirt {...props} />;
    case "clapperboard":
      return <Clapperboard {...props} />;
    case "zap":
      return <Zap {...props} />;
  }
}

/* ------------------------------------------------------------------ */
/* Pill CTA button (from the original hero)                            */
/* ------------------------------------------------------------------ */

export function PillButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
        <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar — hanging black pill, top center                             */
/* ------------------------------------------------------------------ */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/story", label: "Our story" },
  { to: "/contact", label: "Inquiries" },
];

export function Navbar() {
  return (
    <nav className="fixed left-1/2 top-0 z-50 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
      <ul className="flex items-center gap-4 sm:gap-6 md:gap-12 lg:gap-14">
        <li className="mr-1 hidden sm:block">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xs font-extrabold tracking-[0.25em] text-primary md:text-sm"
          >
            <img
              src="/rac-logo.jpg"
              alt="Realest Auto Collective logo"
              className="h-7 w-7 rounded-full object-cover md:h-8 md:w-8"
            />
            REALEST<span className="font-serif italic font-normal">.</span>
          </Link>
        </li>
        {NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap text-[10px] transition-colors sm:text-xs md:text-sm ${
                  isActive ? "" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#E1E0CC" : "rgba(225, 224, 204, 0.55)",
              })}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — scrolling brand ticker strip, driversclub-style           */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  "REAL CAR PEOPLE",
  "REAL BUILDS",
  "REAL CULTURE",
  `EST. ${BRAND.founded} — KATLEHONG`,
];

export function Marquee() {
  /* two identical halves; the track animates -50% for a seamless loop */
  const half = (
    <div aria-hidden className="flex shrink-0 items-center">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap text-xs font-extrabold tracking-[0.3em] text-primary md:text-sm">
            {item}
          </span>
          <img
            src="/rac-logo.jpg"
            alt=""
            className="mx-6 h-6 w-6 rounded-full object-cover md:mx-8 md:h-7 md:w-7"
          />
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex overflow-hidden bg-black py-4 md:py-5" role="presentation">
      <div className="marquee-track flex">
        {half}
        {half}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PhotoReel — auto-scrolling strip of shots that loops on its own      */
/* ------------------------------------------------------------------ */

export function PhotoReel({ images }: { images: string[] }) {
  const copy = (keyPrefix: string) =>
    images.map((src, i) => (
      <Link
        key={`${keyPrefix}-${i}`}
        to="/gallery"
        className="group relative block shrink-0 overflow-hidden rounded-lg bg-neutral-100 mr-3 md:mr-4"
      >
        <img
          src={src}
          alt={`Realest Auto Collective — frame ${i + 1}`}
          loading="lazy"
          className="h-56 w-auto max-w-none transition-transform duration-500 ease-out group-hover:scale-[1.04] md:h-80"
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
      </Link>
    ));
  return (
    <div className="reel flex overflow-hidden">
      {/* one track, two identical copies; the track animates -50% for a seamless loop.
          Spacing lives in each item's mr-* so both copies are exactly equal width. */}
      <div className="reel-track flex w-max">
        {copy("a")}
        <span aria-hidden className="contents">
          {copy("b")}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Editorial break — full-bleed lifestyle shot between sections,       */
/* driversclub-style, with a slow parallax drift                       */
/* ------------------------------------------------------------------ */

export function EditorialBreak({
  src,
  caption,
  tagline,
  to,
  cta,
}: {
  src: string;
  caption: string;
  tagline?: string;
  to?: string;
  cta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[65vh] w-full overflow-hidden md:h-[80vh]">
      <motion.img
        src={src}
        alt={caption}
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover will-change-transform"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-12 text-center md:pb-16">
        <p className="text-2xl font-extrabold uppercase tracking-tight text-white drop-shadow md:text-4xl">
          {caption}
        </p>
        {tagline && (
          <p className="max-w-xl text-sm text-white/80 md:text-base">{tagline}</p>
        )}
        {to && cta && (
          <Link
            to={to}
            className="mt-2 border border-white/80 bg-white/95 px-10 py-3 text-xs font-bold tracking-[0.25em] text-ink backdrop-blur transition-colors hover:bg-white"
          >
            {cta.toUpperCase()}
          </Link>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

/* Brand glyphs missing from this lucide version, drawn with primitives */
function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="0.5" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="border-t border-[#1c1c19] bg-black px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <img
            src="/rac-logo.jpg"
            alt="Realest Auto Collective logo"
            className="mb-5 h-14 w-14 rounded-xl object-cover"
          />
          <p className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
            Realest
            <span className="font-serif italic font-normal text-[#E1E0CC]">
              {" "}
              Auto Collective
            </span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
            Real car people, real builds, real culture — est. {BRAND.founded},{" "}
            {BRAND.location}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: BRAND.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: BRAND.tiktok, label: "TikTok", Icon: Music2 },
              { href: BRAND.youtube, label: "YouTube", Icon: YoutubeIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${BRAND.fullName} on ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a24] text-gray-400 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <ul className="space-y-3 text-xs tracking-widest text-gray-400">
          <li className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
            {BRAND.location.toUpperCase()}
          </li>
          <li>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-3 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
              {BRAND.email.toUpperCase()}
            </a>
          </li>
          <li>
            <a
              href={BRAND.linktree}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-primary"
            >
              <LinkIcon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              LINKTR.EE/REALESTAUTOCOLLECTIVE
            </a>
          </li>
          {BRAND.phones.map((p) => (
            <li key={p.name} className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
              {p.name.toUpperCase()}: {p.number}
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-[10px] tracking-[0.35em] text-gray-500">
        © 2026 REALEST AUTO COLLECTIVE {pathname === "/" ? "· KEEP IT REAL" : ""}
      </p>
    </footer>
  );
}
