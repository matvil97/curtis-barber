import { topBannerItems } from "@/data/site";

function Items() {
  return (
    <div className="flex shrink-0 gap-10 pl-10">
      {topBannerItems.map((item) => (
        <span key={item} className="flex gap-10">
          <span>{item}</span>
          <span className="text-violet-glow">✦</span>
        </span>
      ))}
    </div>
  );
}

/** Bandeau défilant (48s). */
export function TopBanner() {
  return (
    <div className="overflow-hidden bg-ink py-2.5 text-[12px] font-bold tracking-[0.16em] whitespace-nowrap text-white uppercase">
      <p className="sr-only">{topBannerItems.join(" · ")}</p>
      <div className="cb-marquee" style={{ "--marquee-duration": "48s" } as React.CSSProperties} aria-hidden="true">
        <Items />
        <Items />
      </div>
    </div>
  );
}
