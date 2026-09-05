import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectForge AI — Project Reality Engine",
  description: "Investigate, challenge, improve and validate your final-year project.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
