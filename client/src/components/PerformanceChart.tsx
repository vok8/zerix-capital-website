import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from "lucide-react";
import type { PerformanceDataPoint, Strategy } from "@shared/schema";

interface PerformanceChartProps {
  showHeader?: boolean;
  compact?: boolean;
}

interface PerformanceResponse {
  data: PerformanceDataPoint[];
  source: "spanner" | "mock";
}

interface StrategiesResponse {
  data: Strategy[];
  source: "spanner" | "mock";
}

const defaultStrategies: Strategy[] = [
  {
    id: "linearEdge",
    name: "Linear Edge Strategy",
    color: "hsl(220, 85%, 45%)",
    description: "",
    sharpe: 0,
    maxDrawdown: "",
    inceptionDate: "",
  },
];

export default function PerformanceChart({
  showHeader = true,
  compact = false,
}: PerformanceChartProps) {
  const [activeStrategies, setActiveStrategies] = useState<string[]>([
    "linearEdge",
  ]);
  const [timeRange, setTimeRange] = useState<"3Y" | "5Y" | "ALL">("ALL");

  const {
    data: performanceResponse,
    isLoading: isLoadingPerformance,
    error: performanceError,
  } = useQuery<PerformanceResponse>({
    queryKey: ["/api/performance"],
    queryFn: async () => {
        return { data: [
          { year: "2025", linearEdge: 11.52, benchmark: 1.01 },
          { year: "2026", linearEdge: -0.012, benchmark: -0.027 },
        ] };
      },
  });

  const { data: strategiesResponse } = useQuery<StrategiesResponse>({
    queryKey: ["/api/strategies"],
    queryFn: async () => {
        return { data: [
          {
            id: "linearEdge",
            name: "Linear Edge Strategy",
            description:
              "Our proprietary quantitative strategy focusing on structural market inefficiencies.",
            sharpe: 1.42,
            maxDrawdown: "-12.3%",
            inceptionDate: "2025",
            color: "hsl(220, 85%, 45%)",
          },
        ] };
      },
  });

  const performanceData = performanceResponse?.data || [];
  const strategies = strategiesResponse?.data || defaultStrategies;

  const toggleStrategy = (id: string) => {
    setActiveStrategies((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const filteredData = performanceData.slice(
    timeRange === "3Y" ? -3 : timeRange === "5Y" ? -5 : 0,
  );

  const getLatestReturn = (strategyId: string) => {
    if (performanceData.length === 0) return 0;
    const latest = performanceData[performanceData.length - 1];
    return (latest[strategyId as keyof PerformanceDataPoint] as number) || 0;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const year = label;
      const isYTD = year === "2026";
      return (
        <div className="bg-popover border border-popover-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground mb-2">
            {year} {isYTD ? "(YTD)" : ""}
          </p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span style={{ color: entry.color }}>{entry.name}</span>
              <span
                className={`font-medium ${entry.value >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {entry.value >= 0 ? "+" : ""}
                {entry.value}%
              </span>
            </div>
          ))}
          {year === "2025" && (
            <p className="text-[12px] text-foreground font-semibold mb-2">
              <br></br>9 Dec 2025 to EoY
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoadingPerformance) {
    return (
      <div
        className={compact ? "" : "space-y-6"}
        data-testid="performance-chart-loading"
      >
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        )}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-32" />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className={compact ? "h-[300px]" : "h-[400px]"} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (performanceError) {
    return (
      <Card data-testid="performance-chart-error">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to load performance data
          </h3>
          <p className="text-muted-foreground">Please try again later</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={compact ? "" : "space-y-6"} data-testid="performance-chart">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-foreground">
                Year-by-Year Returns
              </h2>
            </div>
            <p className="text-muted-foreground">
              Annual performance (last updated: 15 Feb 2026)
            </p>
          </div>
          {/* Commented out time range selection
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(["3Y", "5Y", "ALL"] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  data-testid={`button-range-${range.toLowerCase()}`}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          */}
        </div>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2">
            {strategies.map((strategy) => (
              <Badge
                key={strategy.id}
                variant={
                  activeStrategies.includes(strategy.id) ? "default" : "outline"
                }
                className="cursor-pointer"
                style={{
                  backgroundColor: activeStrategies.includes(strategy.id)
                    ? strategy.color
                    : "transparent",
                  borderColor: strategy.color,
                  color: activeStrategies.includes(strategy.id)
                    ? "white"
                    : strategy.color,
                }}
                onClick={() => toggleStrategy(strategy.id)}
                data-testid={`badge-strategy-${strategy.id}`}
              >
                {strategy.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className={compact ? "h-[300px]" : "h-[400px]"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {strategies
                  .filter((s) => activeStrategies.includes(s.id))
                  .map((strategy) => (
                    <Line
                      key={strategy.id}
                      type="monotone"
                      dataKey={strategy.id}
                      name={strategy.name}
                      stroke={strategy.color}
                      strokeWidth={3}
                      dot={{ fill: strategy.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  ))}
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  name="Benchmark (Nifty 50)"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{
                    fill: "hsl(var(--muted-foreground))",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {!compact && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {strategies.map((strategy) => {
            const latestReturn = getLatestReturn(strategy.id);
            const isPositive = latestReturn >= 0;
            return (
              <Card
                key={strategy.id}
                data-testid={`card-strategy-${strategy.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: strategy.color }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {strategy.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {isPositive ? "+" : ""}
                      {latestReturn}%
                    </span>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2026 YTD</p>
                </CardContent>
              </Card>
            );
          })}
          {/* Benchmark Card */}
          {performanceData.length > 0 && (
            <Card data-testid="card-strategy-benchmark">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Benchmark (Nifty 50)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-2xl font-bold ${performanceData[performanceData.length - 1].benchmark >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {performanceData[performanceData.length - 1].benchmark >= 0
                      ? "+"
                      : ""}
                    {performanceData[performanceData.length - 1].benchmark}%
                  </span>
                  {performanceData[performanceData.length - 1].benchmark >=
                  0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">2026 YTD</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export function PerformanceChart2({
  showHeader = true,
  compact = false,
}: PerformanceChartProps) {
  const [activeStrategies, setActiveStrategies] = useState<string[]>([
    "linearEdge",
  ]);
  const [timeRange, setTimeRange] = useState<"3Y" | "5Y" | "ALL">("ALL");

  const {
    data: performanceResponse,
    isLoading: isLoadingPerformance,
    error: performanceError,
  } = useQuery<PerformanceResponse>({
    queryKey: ["/api/performance2"],
    queryFn: async () => {
        return { data: [
          { year: "2025", linearEdge: 11.52, benchmark: 1.01 },
          { year: "2026", linearEdge: 10.18, benchmark: -0.015 },
        ] };
      },
  });

  const { data: strategiesResponse } = useQuery<StrategiesResponse>({
    queryKey: ["/api/strategies"],
    queryFn: async () => {
        return { data: [
          {
            id: "linearEdge",
            name: "Linear Edge Strategy",
            description:
              "Our proprietary quantitative strategy focusing on structural market inefficiencies.",
            sharpe: 1.42,
            maxDrawdown: "-12.3%",
            inceptionDate: "2025",
            color: "hsl(220, 85%, 45%)",
          },
        ] };
      },
  });

  const performanceData = performanceResponse?.data || [];
  const strategies = strategiesResponse?.data || defaultStrategies;

  const toggleStrategy = (id: string) => {
    setActiveStrategies((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const filteredData = performanceData.slice(
    timeRange === "3Y" ? -3 : timeRange === "5Y" ? -5 : 0,
  );

  const getLatestReturn = (strategyId: string) => {
    if (performanceData.length === 0) return 0;
    const latest = performanceData[performanceData.length - 1];
    return (latest[strategyId as keyof PerformanceDataPoint] as number) || 0;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const year = label;
      const isYTD = year === "2026";
      return (
        <div className="bg-popover border border-popover-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground mb-2">
            {year} {isYTD ? "(YTD)" : ""}
          </p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span style={{ color: entry.color }}>{entry.name}</span>
              <span
                className={`font-medium ${entry.value >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {entry.value >= 0 ? "+" : ""}
                {entry.value}%
              </span>
            </div>
          ))}
          {year === "2025" && (
            <p className="text-[12px] text-foreground font-semibold mb-2">
              <br></br>9 Dec 2025 to EoY
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoadingPerformance) {
    return (
      <div
        className={compact ? "" : "space-y-6"}
        data-testid="performance-chart-loading"
      >
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        )}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-32" />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className={compact ? "h-[300px]" : "h-[400px]"} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (performanceError) {
    return (
      <Card data-testid="performance-chart-error">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to load performance data
          </h3>
          <p className="text-muted-foreground">Please try again later</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={compact ? "" : "space-y-6"} data-testid="performance-chart">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-foreground">
                Total Returns
              </h2>
            </div>
            <p className="text-muted-foreground">
              Cumulative returns (last updated: 15 Feb 2026)
            </p>
          </div>
          {/* Commented out time range selection
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(["3Y", "5Y", "ALL"] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  data-testid={`button-range-${range.toLowerCase()}`}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          */}
        </div>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap gap-2">
            {strategies.map((strategy) => (
              <Badge
                key={strategy.id}
                variant={
                  activeStrategies.includes(strategy.id) ? "default" : "outline"
                }
                className="cursor-pointer"
                style={{
                  backgroundColor: activeStrategies.includes(strategy.id)
                    ? strategy.color
                    : "transparent",
                  borderColor: strategy.color,
                  color: activeStrategies.includes(strategy.id)
                    ? "white"
                    : strategy.color,
                }}
                onClick={() => toggleStrategy(strategy.id)}
                data-testid={`badge-strategy-${strategy.id}`}
              >
                {strategy.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className={compact ? "h-[300px]" : "h-[400px]"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {strategies
                  .filter((s) => activeStrategies.includes(s.id))
                  .map((strategy) => (
                    <Line
                      key={strategy.id}
                      type="monotone"
                      dataKey={strategy.id}
                      name={strategy.name}
                      stroke={strategy.color}
                      strokeWidth={3}
                      dot={{ fill: strategy.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  ))}
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  name="Benchmark (Nifty 50)"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{
                    fill: "hsl(var(--muted-foreground))",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {!compact && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {strategies.map((strategy) => {
            const latestReturn = getLatestReturn(strategy.id);
            const isPositive = latestReturn >= 0;
            return (
              <Card
                key={strategy.id}
                data-testid={`card-strategy-${strategy.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: strategy.color }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {strategy.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {isPositive ? "+" : ""}
                      {latestReturn}%
                    </span>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    9 Dec 2025 - Present
                  </p>
                </CardContent>
              </Card>
            );
          })}
          {/* Benchmark Card */}
          {performanceData.length > 0 && (
            <Card data-testid="card-strategy-benchmark">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Benchmark (Nifty 50)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-2xl font-bold ${performanceData[performanceData.length - 1].benchmark >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {performanceData[performanceData.length - 1].benchmark >= 0
                      ? "+"
                      : ""}
                    {performanceData[performanceData.length - 1].benchmark}%
                  </span>
                  {performanceData[performanceData.length - 1].benchmark >=
                  0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  9 Dec 2025 - Present
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
