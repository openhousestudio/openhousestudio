import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Proof } from "@/components/sections/proof";
import { Pillars } from "@/components/sections/pillars";
import { Features } from "@/components/sections/features";
import { Formats } from "@/components/sections/formats";
import { How } from "@/components/sections/how";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { CommunityStrip } from "@/components/sections/community-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Pillars />
        <Features />
        <Formats />
        <How />
        <Pricing />
        <CommunityStrip />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
