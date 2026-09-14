import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { PreviewShowcase } from "@/components/landing/PreviewShowcase";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
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
