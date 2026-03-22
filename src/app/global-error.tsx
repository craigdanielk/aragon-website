"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Error - A.R.A.G.O.N.</title>
      </head>
      <body
        style={{
          background: "#0a0a0a",
          color: "#d4d4d4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>
            Something went wrong
          </h2>
          <button
            onClick={() => reset()}
            style={{
              fontSize: "0.875rem",
              color: "#a3a3a3",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
