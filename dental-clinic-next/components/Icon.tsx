import type { IconName } from "@/lib/types";

const STROKE: Partial<Record<IconName, React.ReactNode>> = {
  tooth: <path d="M7 3C4.5 3 3 5 3 7.5c0 2 .8 3.5 1.5 5 .8 1.8 1 4 1.5 6 .3 1.3.8 2.5 1.8 2.5 1.4 0 1.6-2.2 2-4 .3-1.3.8-2 2.2-2s1.9.7 2.2 2c.4 1.8.6 4 2 4 1 0 1.5-1.2 1.8-2.5.5-2 .7-4.2 1.5-6 .7-1.5 1.5-3 1.5-5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />,
  implant: <><path d="M6 3h12c0 3-2 5-6 5S6 6 6 3Z" /><path d="M9 11h6M9.5 14h5M10 17h4M11 20h2M12 8v13" /></>,
  braces: <><rect x="3" y="8" width="4" height="8" rx="1.5" /><rect x="10" y="8" width="4" height="8" rx="1.5" /><rect x="17" y="8" width="4" height="8" rx="1.5" /><path d="M1 12h22" /></>,
  sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
  shield: <><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  child: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14a4 4 0 0 0 7 0" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
  crown: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z" />,
  xray: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 8c0 2 1 3 1 6M16 8c0 2-1 3-1 6M12 7v10M9 10h6M9.5 13h5" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  pin: <><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  facebook: <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3Z" />,
  tiktok: <><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.5 3 2.5 5 6 5" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
};

const WHATSAPP =
  "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path fill="currentColor" d={WHATSAPP} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24" className={className} aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    >
      {STROKE[name] ?? STROKE.tooth}
    </svg>
  );
}
