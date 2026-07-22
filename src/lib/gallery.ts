/* Auto-imports every image dropped into src/gallery — add a photo to the
   folder and it shows up on the gallery page on the next build. */

const modules = import.meta.glob("../gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/* Sorted by filename so the order is stable across builds. */
export const GALLERY: string[] = Object.keys(modules)
  .sort()
  .map((k) => modules[k]);

/* Hand-picked shots used as full-bleed editorial breaks on the home page. */
const byName = (name: string) => modules[`../gallery/${name}`] ?? GALLERY[0];

export const EDITORIAL = {
  first: byName("realest-003.jpg"), // BMW engine bay
  second: byName("realest-011.jpg"), // car meet, bagged Polos
};
