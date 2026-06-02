import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "post-código";
const description = "Bienvenidos a la era post-código — commit · post-código";

export const metadata: Metadata = {
  title,
  description,
  // Open Graph reuses the page title/description so `<title>`/description and
  // their og counterparts share a single source of truth and cannot diverge.
  // Limited to title + description; og:image is intentionally out of scope.
  openGraph: {
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh font-mono antialiased">{children}</body>
    </html>
  );
}
