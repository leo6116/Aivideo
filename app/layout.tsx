import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { PageTransition } from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SceneForge AI — Cinematic AI Video Scripts & Prompts",
  description:
    "Turn a single topic or reference image into a fully structured video script, broken into a perfectly paced timeline of cinematic, copy-paste-ready AI video prompts.",
  openGraph: {
    title: "SceneForge AI — Cinematic AI Video Scripts & Prompts",
    description:
      "From idea to cinematic, copy-paste-ready AI video prompts — broken into a perfectly paced timeline, in under a minute.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ToastProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <div className="grain-overlay" aria-hidden />
            <Navbar />
            <PageTransition>
              <main className="pt-16">{children}</main>
            </PageTransition>
          </SmoothScrollProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
