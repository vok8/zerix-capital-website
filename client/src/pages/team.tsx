import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ChevronRight,
  ArrowRight,
  Users,
  Award,
  GraduationCap,
} from "lucide-react";

// const handleClick = () => {
//   const element = document.getElementById("top");
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// };

export default function Team() {
  const stats = [
    { icon: Users, value: "45+", label: "Team Members" },
    { icon: Award, value: "4+ Years", label: "Experience" },
    { icon: GraduationCap, value: "12", label: "PhD Holders" },
  ];

  return (
    <div className="min-h-screen bg-background" id="top">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            data-testid="breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Team</span>
          </nav>

          <div className="text-center mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-foreground"
              data-testid="text-page-title"
            >
              Our Team
            </h1>
            {/* <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Meet the experts behind Zerix Capital. Our team combines world-class 
              expertise in quantitative finance, technology, and investment management.
            </p> */}

            {/* 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} data-testid={`stat-team-${index}`}>
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            */}
          </div>
        </div>

        <TeamSection />

        {/* 
        <section className="py-16 bg-card">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Join Our Team
            </h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for exceptional talent to join our growing team. 
              If you're passionate about quantitative finance and technology, we'd love to hear from you.
            </p>
            <Link href="/#contact">
              <Button data-testid="button-careers">
                View Open Positions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
        */}
      </main>

      <Footer />
    </div>
  );
}
