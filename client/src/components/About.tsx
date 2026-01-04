import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Target, Zap } from "lucide-react";

export default function About() {
  const stats = [
    { value: "Rs. 10L+", label: "Assets Under Management" },
    { value: "4+ Years", label: "Experience" },
  ];

  const values = [
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      description:
        "Every investment decision is backed by rigorous quantitative analysis and real-time market data.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description:
        "Sophisticated risk models ensure portfolio protection while maximizing return potential.",
    },
    {
      icon: Target,
      title: "Precision Strategies",
      description:
        "Our proprietary algorithms identify opportunities across diverse market conditions.",
    },
    {
      icon: Zap,
      title: "Rapid Execution",
      description:
        "Low-latency infrastructure enables swift position management and opportunity capture.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-background"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                data-testid="text-about-title"
              >
                About
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Zerix Capital is a research-driven investment firm focused on
                building disciplined, data-backed trading & investing
                strategies. We combine quantitative models, market insight, and
                risk-first thinking to create smarter ways of navigating
                equities, index derivatives, and global markets. Our goal is
                simple: turn clarity, research, and precision into long-term
                performance.
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team combines years of experience in financial markets with
              cutting-edge technology to deliver consistent, risk-adjusted
              returns. We believe in transparency, rigorous research, and a
              disciplined approach to capital allocation.
            </p>

            <div className="flex justify-center gap-12 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                  data-testid={`stat-${index}`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover-elevate h-full flex flex-col"
                data-testid={`card-value-${index}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
