import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { PreviewShowcase } from "@/components/landing/PreviewShowcase";
import { Footer } from "@/components/layout/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <HowItWorks />
      <FeatureGrid />
      <PreviewShowcase />
      <Footer />
    </>
  );
}
