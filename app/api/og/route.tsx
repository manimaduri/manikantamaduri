import { ImageResponse } from "next/og";
import { profile } from "@/content/data/profile";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? profile.name;
  const subtitle =
    searchParams.get("subtitle") ?? profile.headline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(900px 600px at 85% 0%, rgba(139,92,246,0.45), transparent), radial-gradient(700px 500px at 0% 100%, rgba(236,72,153,0.35), transparent), #08080c",
          color: "#ececf4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#c084fc",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(90deg,#8b5cf6,#ec4899)",
            }}
          />
          {profile.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: "#9a9ab0",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6a6a82" }}>
          Full-Stack · Gen AI / LLM · React Native
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
