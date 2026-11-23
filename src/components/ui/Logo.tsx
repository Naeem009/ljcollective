import { useId } from "react";
import Link from "next/link";
import { company } from "@/content/site";

type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

function Monogram({ className }: { className: string }) {
  const id = `lj-mark-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="36 16 168 176" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="0" y2="175">
          <stop offset="0" stopColor="#352720" />
          <stop offset="0.35" stopColor="#352720" />
          <stop offset="0.8" stopColor="#A9573D" />
          <stop offset="1" stopColor="#A9573D" />
        </linearGradient>
      </defs>
      <path
        d="M 74 22 H 126 L 125 28 C 114 28 109 31 105 42 L 80 118 C 78 124 82 126 92 126 H 110 C 126 126 140 122 150 114 L 153 116 C 147 127 134 132 112 132 H 40 L 42 128 C 54 128 58 124 62 112 L 90 38 C 93 30 90 28 72 28 Z"
        fill="#352720"
      />
      <path
        d="M 142 56 H 198 L 197 62 C 191 62 188 64 185 72 L 162 138 C 157 151 148 163 135 171 C 117 182 90 187 58 186 C 86 180 108 174 121 163 C 131 155 138 147 142 136 L 168 70 C 170 64 168 62 140 62 Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const compact = variant === "mark";

  return (
    <Link
      href="/"
      aria-label={`${company.name} — Home`}
      className={`shrink-0 items-center text-espresso ${className || "inline-flex"}`}
    >
      <span className="inline-flex items-center gap-2.5 md:gap-3">
        {compact ? null : (
          <>
            <Monogram className="h-9 w-auto md:h-11" />
            <span aria-hidden className="h-8 w-px shrink-0 bg-espresso/35 md:h-10" />
          </>
        )}
        <span className="flex flex-col items-start justify-center">
          <span
            className={`font-display leading-none tracking-[-0.02em] text-espresso ${
              compact ? "text-[1.35rem]" : "text-[1.05rem] md:text-[1.35rem]"
            }`}
          >
            LJ Collective
          </span>
          {compact ? null : (
            <span className="mt-1 font-sans text-[7px] font-medium uppercase tracking-[0.2em] text-sienna md:text-[9px] md:tracking-[0.24em]">
              {company.descriptor}
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}
