import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "post-código",
  description: "Bienvenidos a la era post-código — commit · post-código",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh font-mono antialiased">{children}</body>
    </html>
  );
}
