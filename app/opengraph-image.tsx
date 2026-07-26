import { ImageResponse } from "next/og";

export const alt = "Rajin Sakha - Front-end Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 32, color: "#a1a1aa", marginBottom: 16 }}>
          Hi, I&apos;m
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Rajin Sakha
          <span style={{ color: "#e2503f" }}>.</span>
        </div>
        <div style={{ fontSize: 44, color: "#e2503f", marginTop: 8 }}>
          Front-end Developer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Building modern, responsive web applications with React.js & Next.js
        </div>
      </div>
    ),
    { ...size }
  );
}
