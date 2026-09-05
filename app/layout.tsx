import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProjectForge AI — Project Reality Engine",
  description: "Investigate, challenge, improve and validate your final-year project.",
  applicationName: "ProjectForge AI",
  keywords: ["final-year project", "AI mentor", "hackathon", "project validation"],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
