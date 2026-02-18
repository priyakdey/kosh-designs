import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { CreditCard } from "@/types";
import { getCardTheme } from "./cardThemes";
import { NetworkLogo } from "./NetworkLogo";

interface CreditCardVisualProps {
  card: CreditCard;
  onRemove: (cardId: string) => void;
}

function getUtilization(outstanding: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.round((outstanding / limit) * 100);
}

function getUtilizationBadge(percent: number) {
  if (percent > 70) {
    return {
      bg: "bg-red-500/20 ring-red-400/30 text-red-300",
      bar: "from-red-400 to-red-500",
    };
  }
  if (percent >= 30) {
    return {
      bg: "bg-amber-500/20 ring-amber-400/30 text-amber-300",
      bar: "from-amber-400 to-amber-500",
    };
  }
  return {
    bg: "bg-emerald-500/20 ring-emerald-400/30 text-emerald-300",
    bar: "from-emerald-400 to-emerald-500",
  };
}

function formatDueDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function CreditCardVisual({ card, onRemove }: CreditCardVisualProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const theme = getCardTheme(card.themeId);
  const utilization = getUtilization(card.outstanding, card.creditLimit);
  const badge = getUtilizationBadge(utilization);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden aspect-[1.586/1]",
        "text-white ring-1 ring-white/10 shadow-xl",
        "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl",
        "group",
        theme.base,
      )}
    >
      {/* Accent overlay */}
      <div className={cn("absolute inset-0 pointer-events-none", theme.accent)} />

      {/* Radial glow top-right */}
      <div
        className={cn(
          "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none",
          theme.glow,
        )}
      />

      {/* Radial glow bottom-left */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none",
          theme.glowBottom,
        )}
      />

      {/* Card content */}
      <div className="relative z-10 h-full p-5 flex flex-col justify-between">
        {/* Top row: bank + badge + menu */}
        <div className="flex items-start justify-between">
          <div>
            <p className="uppercase tracking-widest text-xs text-white/60">
              {card.bankName}
            </p>
            <p className="text-base font-semibold mt-0.5">{card.cardVariant}</p>
          </div>
          <div className="flex items-center gap-2" ref={menuRef}>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="w-4 h-4 text-white/60" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-8 z-20 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl py-1 min-w-[140px]">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onRemove(card.id);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/10 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle: masked number + network */}
        <div className="flex items-center justify-between">
          <p className="tracking-[0.25em] text-sm text-white/80">
            &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; {card.last4}
          </p>
          <NetworkLogo network={card.network} className="h-8 w-auto" />
        </div>

        {/* Bottom: financials + utilization bar */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-xs text-white/60">Outstanding</p>
              <p className="text-xl font-bold">{formatCurrency(card.outstanding)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">Limit</p>
              <p className="text-sm font-semibold text-white/90">
                {formatCurrency(card.creditLimit)}
              </p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2.5">
            <div
              className={cn("h-full rounded-full bg-gradient-to-r", badge.bar)}
              style={{ width: `${utilization}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Due {formatDueDate(card.dueDate)}</span>
            <span>{utilization}% used</span>
          </div>
        </div>
      </div>
    </div>
  );
}
