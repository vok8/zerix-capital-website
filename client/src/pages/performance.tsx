import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import PerformanceChart, {
  PerformanceChart2,
} from "@/components/PerformanceChart";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { ChevronRight, Info } from "lucide-react";
import type { PerformanceDataPoint } from "@shared/schema";

interface PerformanceResponse {
  data: PerformanceDataPoint[];
  source: "spanner" | "mock";
}

export default function Performance() {
  const { data: performanceResponse, isLoading: isLoadingPerformance } =
    useQuery<PerformanceResponse>({
      queryKey: ["/api/performance"],
    });

  const performanceData = performanceResponse?.data || [];

  return (
    <div className="min-h-screen bg-background" id="top">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* <nav
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            data-testid="breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Performance</span>
          </nav> */}

          <div className="mb-12">
            <h1
              className="text-4xl font-bold text-foreground mb-4"
              data-testid="text-page-title"
            >
              Performance
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Track our investment strategies' performance over time. All
              figures represent net returns after fees. Past performance does
              not guarantee future results.
            </p>

            <Card className="bg-muted/50 mt-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">
                      Important Disclosures
                    </p>
                    <p>
                      Performance data shown is net of all fees and expenses. Past
                      performance is not indicative of future results. Investment
                      involves risk of loss. The benchmark used is the Nifty 50
                      Index Return.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-16">
            <section>
              <PerformanceChart2 />
            </section>

            <section>
              <PerformanceChart />
            </section>
          </div>

          {/* <Card className="bg-muted/50 mt-16">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    Important Disclosures
                  </p>
                  <p>
                    Performance data shown is net of all fees and expenses. Past
                    performance is not indicative of future results. Investment
                    involves risk of loss. The benchmark used is the Nifty 50
                    Index Return.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
