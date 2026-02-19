import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}