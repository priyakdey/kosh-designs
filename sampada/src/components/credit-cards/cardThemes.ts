export interface CardTheme {
  id: string;
  base: string;
  accent: string;
  glow: string;
  glowBottom: string;
}

const CARD_THEMES: Record<string, CardTheme> = {
  "slate-red": {
    id: "slate-red",
    base: "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-red-500/10",
    glowBottom: "bg-purple-500/[0.08]",
  },
  "slate-blue": {
    id: "slate-blue",
    base: "bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-900",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-blue-400/10",
    glowBottom: "bg-indigo-500/[0.08]",
  },
  "zinc-emerald": {
    id: "zinc-emerald",
    base: "bg-gradient-to-br from-zinc-900 via-emerald-900/60 to-zinc-900",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-emerald-400/10",
    glowBottom: "bg-teal-500/[0.08]",
  },
  "indigo-violet": {
    id: "indigo-violet",
    base: "bg-gradient-to-br from-indigo-950 via-violet-900/70 to-indigo-950",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-violet-400/10",
    glowBottom: "bg-purple-500/[0.08]",
  },
  "cyan-sky": {
    id: "cyan-sky",
    base: "bg-gradient-to-br from-cyan-950 via-sky-900/60 to-cyan-950",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-sky-400/10",
    glowBottom: "bg-cyan-500/[0.08]",
  },
  "amber-orange": {
    id: "amber-orange",
    base: "bg-gradient-to-br from-amber-950 via-orange-900/60 to-amber-950",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-orange-400/10",
    glowBottom: "bg-amber-500/[0.08]",
  },
  "lime-emerald": {
    id: "lime-emerald",
    base: "bg-gradient-to-br from-lime-950 via-emerald-900/50 to-lime-950",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-emerald-400/10",
    glowBottom: "bg-lime-500/[0.08]",
  },
  "neutral-gray": {
    id: "neutral-gray",
    base: "bg-gradient-to-br from-neutral-950 via-gray-800/70 to-neutral-950",
    accent: "bg-gradient-to-tr from-transparent via-white/5 to-white/[0.02]",
    glow: "bg-gray-400/10",
    glowBottom: "bg-slate-500/[0.08]",
  },
};

const DEFAULT_THEME: CardTheme = CARD_THEMES["neutral-gray"];

export function getCardTheme(themeId: string): CardTheme {
  return CARD_THEMES[themeId] ?? DEFAULT_THEME;
}
