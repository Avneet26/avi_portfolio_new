/** Legitimate crawlers we allow (SEO, previews, monitoring). */
const ALLOWED_BOTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "applebot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "discordbot",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "preview",
  "vercel",
  "uptimerobot",
  "pingdom",
];

/** Aggressive scrapers / SEO bots — block at the edge. */
const BLOCKED_BOTS = [
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "mj12bot",
  "petalbot",
  "bytespider",
  "chatgpt-user",
  "ccbot",
  "anthropic-ai",
  "claudebot",
  "claude-web",
  "amazonbot",
  "dataforseobot",
  "blexbot",
  "serpstatbot",
  "megaindex",
  "screaming frog",
  "httrack",
  "wget",
  "curl/",
  "python-requests",
  "scrapy",
  "go-http-client",
  "java/",
  "libwww-perl",
  "masscan",
  "nikto",
  "zgrab",
];

export function isBlockedBot(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim().length < 4) return true;

  const ua = userAgent.toLowerCase();

  if (ALLOWED_BOTS.some((bot) => ua.includes(bot))) return false;
  if (BLOCKED_BOTS.some((bot) => ua.includes(bot))) return true;

  return false;
}
