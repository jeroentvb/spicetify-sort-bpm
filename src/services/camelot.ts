/**
 * Camelot wheel helpers.
 *
 * Spotify already computes the Camelot code for every analyzed track and hangs it off
 * the tracklist row's React props as `item.key.camelotKey` (e.g. `'9B'`), so there is no
 * key/pitch-class conversion to do here — this module only defines the sort order.
 */

/**
 * Every Camelot code in sort order: number first, then letter (1A, 1B, 2A, … 12B).
 * A track's sort rank is simply its index here.
 *
 * Relative minor/major pairs share a number (8A = A minor, 8B = C major), so this
 * ordering puts them next to each other and consecutive tracks in a sorted playlist are
 * almost always harmonically compatible.
 */
export const CAMELOT_ORDER = [
   '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B',
   '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B',
] as const;

export type CamelotCode = typeof CAMELOT_ORDER[number];

const RANKS = new Map<string, number>(CAMELOT_ORDER.map((code, index) => [code, index]));

/**
 * Narrow an arbitrary value to a Camelot code, tolerating case and surrounding
 * whitespace. Returns null for anything that isn't one of the 24 codes — including the
 * `undefined` we get for a track Spotify hasn't analyzed.
 */
export function asCamelotCode(value: unknown): CamelotCode | null {
   if (typeof value !== 'string') return null;
   const code = value.trim().toUpperCase();
   return RANKS.has(code) ? (code as CamelotCode) : null;
}

/** Sort rank of a Camelot code: 0 for 1A up to 23 for 12B. */
export function camelotRank(code: CamelotCode): number {
   // Every CamelotCode is in RANKS by construction; the fallback just keeps this total.
   return RANKS.get(code) ?? 0;
}
