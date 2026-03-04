import { Toaster } from "@/components/ui/sonner";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import Navigation from "./components/Navigation";
import ReservationsSection from "./components/ReservationsSection";

export default function App() {
  return (
    <div className="min-h-screen font-inter">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.022 160)",
            color: "oklch(0.96 0.010 150)",
            border: "1px solid oklch(0.52 0.10 155)",
          },
        }}
      />
      <Navigation />
      <main>
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <ReservationsSection />
      </main>
      <Footer />
    </div>
  );
}
