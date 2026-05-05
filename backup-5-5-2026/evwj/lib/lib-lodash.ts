import { deburr } from "lodash";

export function LibLodashSlugify(text?: string): string {
  return deburr(text) // remove accents (é → e)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // remove quotes
    .replace(/[^a-z0-9]+/g, "-") // everything → dash
    .replace(/^-+|-+$/g, ""); // trim dashes
}
