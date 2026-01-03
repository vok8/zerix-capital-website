import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import { PerformanceChart2 } from "@/components/PerformanceChart";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <Hero />

      <About />

      <section
        className="py-24 bg-card"
        data-testid="section-performance-preview"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Total Returns
              </h2>
              <p className="text-muted-foreground">
                Consistent performance across market cycles
              </p>
            </div>
            <Link href="/performance#top">
              <Button
                variant="outline"
                data-testid="button-view-all-performance"
              >
                View Full Performance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <PerformanceChart2 showHeader={false} compact />
        </div>
      </section>

      <Contact />

      <Footer />
    </div>
  );
}
