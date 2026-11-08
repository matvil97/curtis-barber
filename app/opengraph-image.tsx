import { ImageResponse } from "next/og";

export const alt = "Curtis Barber — Barbershop Lyon 6e";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          background: "#FAF8F5",
          color: "#121014",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#6E625A", textTransform: "uppercase" }}>
            Barbershop · Lyon 6e · Brotteaux
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>Curtis</div>
            <div style={{ fontSize: 130, fontStyle: "italic", color: "#6D28D9", lineHeight: 1 }}>barber</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#2A262C" }}>39 rue Molière · 4,9/5 sur Planity</div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 486,
            borderRadius: "999px 999px 28px 28px",
            border: "6px solid #8B5CF6",
            boxShadow: "0 0 60px rgba(139,92,246,0.55)",
            background: "#EDE9FE",
          }}
        />
      </div>
    ),
    size,
  );
}
