/**
 * Derive the playlist URI for the page the user is currently viewing.
 * Returns null when the current page isn't a (v1/v2) playlist.
 */
export function getCurrentPlaylistUri(): string | null {
   const pathname: string | undefined = Spicetify.Platform?.History?.location?.pathname;
   if (!pathname) return null;

   const segments = pathname.split('/').filter(Boolean);
   const i = segments.indexOf('playlist');
   if (i === -1 || !segments[i + 1]) return null;

   // Spotify IDs are 22-char base62. Checked by hand since `Spicetify.URI` was removed in newer Spicetify.
   const id = segments[i + 1];
   return /^[0-9A-Za-z]{22}$/.test(id) ? `spotify:playlist:${id}` : null;
}
