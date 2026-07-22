import { ChevronDown } from "lucide-react";
import { WordsPullUp } from "./ui";
import { DROP } from "../lib/content";

const SHOP_VIDEO = "/ss1-collection.mp4";

/* Fullscreen cinematic video intro for the shop — same energy as the home
   hero: a muted film loop with the collection title rising over it. */
export default function ShopHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={SHOP_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* film overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="noise-overlay absolute inset-0 opacity-[0.3] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 sm:px-6 md:px-10 md:pb-14">
        <p className="mb-3 text-[10px] tracking-[0.45em] text-primary/70 md:text-xs">
          {DROP.code} · SS1 COLLECTION
        </p>
        <h1
          className="text-[19vw] font-medium leading-[0.85] tracking-[-0.06em] sm:text-[17vw] md:text-[15vw] lg:text-[13vw]"
          style={{ color: "#E1E0CC" }}
        >
          <WordsPullUp text="SS1" showAsterisk />
        </h1>
        <p className="mt-4 max-w-md text-xs text-primary/70 sm:text-sm md:text-base">
          The first Realest drop — heavyweight boxy-fit tees where street style
          meets automotive art. Designed in Katlehong, made for the scene.
        </p>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-primary/60">
        <span className="text-[10px] tracking-[0.4em]">SCROLL FOR THE DROP</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
