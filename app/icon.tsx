import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          M
        </span>
      </div>
    ),
    { width: 32, height: 32 },
  );
}
