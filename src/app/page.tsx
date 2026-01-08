import { Accommodations } from "@/components/Accommodations";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Accommodations />
      <FAQ />
      <Footer />
    </main>
  );
}
