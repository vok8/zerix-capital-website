import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";
import heroImage from "@assets/stock_images/financial_markets_ab_22cb8322.jpg";
// import React, { useRef } from "react";

// const topRef = useRef<HTMLDivElement>(null);
// const scrollToTop = () => {
//   topRef.current?.scrollIntoView({ behavior: "smooth" });
// }

const handleClick = () => {
  const element = document.getElementById("top");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
      id="top"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <BarChart3 className="w-4 h-4 text-white" />
            <span className="text-sm text-white/90 font-medium">
              Data-Driven Investment Strategies
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            data-testid="text-hero-title"
          >
            Zerix Capital
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto"
            data-testid="text-hero-tagline"
          >
            Turning data into direction
          </p>

          <p className="text-lg text-white/70 max-w-xl mx-auto">
            We leverage advanced quantitative analysis and machine learning to
            identify high-probability investment opportunities across global
            markets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/performance#top" onClick={handleClick}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 border-0 px-8"
                data-testid="button-view-performance"
              >
                View Performance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
