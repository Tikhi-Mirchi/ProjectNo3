import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/platform/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Framify — Premium Next.js Landing Page Templates",
  description:
    "Discover stunning, production-ready Next.js landing page templates. Customize with a live editor, export clean code, and launch in minutes. Free and open.",
  keywords: [
    "Next.js templates",
    "landing page templates",
    "React templates",
    "website templates",
    "Tailwind CSS",
    "premium templates",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
