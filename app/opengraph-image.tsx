import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Photolio — Portfolio photographe en ligne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* ── Panneau gauche : texte ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            flex: 1,
            padding: "72px 40px 72px 80px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "#558b8b",
              marginBottom: 28,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#558b8b",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 20,
              display: "flex",
            }}
          >
            Photolio.fr
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#f5f5f0",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              display: "flex",
            }}
          >
            Votre portfolio
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 500,
                fontStyle: "italic",
                color: "#558b8b",
                letterSpacing: "-1.5px",
                display: "flex",
              }}
            >
              photographe
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#f5f5f0",
                letterSpacing: "-1.5px",
                display: "flex",
              }}
            >
              en ligne.
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(245,245,240,0.38)",
              fontWeight: 400,
              display: "flex",
            }}
          >
            Site vitrine · Galeries privées · Portfolio personnalisé
          </div>
        </div>

        {/* ── Panneau droit : cadres photo avec images ── */}
        <div
          style={{
            width: "380px",
            height: "630px",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Cadre arrière gauche — paysage */}
          <div
            style={{
              position: "absolute",
              width: "178px",
              height: "238px",
              borderRadius: "12px",
              overflow: "hidden",
              transform: "rotate(-9deg) translateX(-58px) translateY(10px)",
              display: "flex",
              opacity: 0.5,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
              style={{ width: "178px", height: "238px", objectFit: "cover" }}
            />
          </div>

          {/* Cadre arrière droit — portrait */}
          <div
            style={{
              position: "absolute",
              width: "178px",
              height: "238px",
              borderRadius: "12px",
              overflow: "hidden",
              transform: "rotate(6deg) translateX(56px) translateY(-8px)",
              display: "flex",
              opacity: 0.45,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80"
              style={{ width: "178px", height: "238px", objectFit: "cover" }}
            />
          </div>

          {/* Cadre avant (centre) — street */}
          <div
            style={{
              position: "absolute",
              width: "198px",
              height: "264px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "2px solid rgba(85,139,139,0.6)",
              display: "flex",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80"
              style={{ width: "198px", height: "264px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
