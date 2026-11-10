/** Encart affiché tant que la vraie photo n'est pas fournie. */
export function PhotoPending({ label = "Photo à venir", hint }: { label?: string; hint?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-9 text-violet"
      >
        <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="font-display text-[15px] leading-tight font-extrabold tracking-[-0.02em] text-ink md:text-[18px]">
        {label}
      </span>
      {hint && <span className="text-[12px] leading-snug font-semibold text-taupe md:text-[13px]">{hint}</span>}
    </div>
  );
}
