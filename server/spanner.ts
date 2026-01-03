import { Spanner } from "@google-cloud/spanner";

// Configuration from environment variables
const projectId = process.env.SPANNER_PROJECT_ID;
const instanceId = process.env.SPANNER_INSTANCE_ID;
const databaseId = process.env.SPANNER_DATABASE_ID;

let spannerClient: Spanner | null = null;
let database: any = null;

// Initialize Spanner client
export function initSpanner() {
  if (!projectId || !instanceId || !databaseId) {
    console.log(
      "Spanner environment variables not configured. Using mock data.",
    );
    return null;
  }

  try {
    spannerClient = new Spanner({
      projectId,
    });
    const instance = spannerClient.instance(instanceId);
    database = instance.database(databaseId);
    console.log("Connected to Cloud Spanner successfully");
    return database;
  } catch (error) {
    console.error("Failed to connect to Cloud Spanner:", error);
    return null;
  }
}

// Get performance data from Spanner
export async function getPerformanceData(): Promise<PerformanceRow[]> {
  if (!database) {
    return getMockPerformanceData();
  }

  try {
    const query = {
      sql: `SELECT 
              year,
              strategy_id,
              strategy_name,
              return_percentage
            FROM performance_data
            ORDER BY year ASC, strategy_id ASC`,
    };

    const [rows] = await database.run(query);

    // Transform rows into the expected format
    const dataByYear = new Map<string, PerformanceRow>();

    for (const row of rows) {
      const year = row[0].value as string;
      const strategyId = row[1].value as string;
      const returnPct = parseFloat(row[3].value);

      if (!dataByYear.has(year)) {
        dataByYear.set(year, {
          year,
          alpha: 0,
          momentum: 0,
          value: 0,
          quant: 0,
          benchmark: 0,
        });
      }

      const yearData = dataByYear.get(year)!;
      if (strategyId === "linearEdge") yearData.linearEdge = returnPct;
      else if (strategyId === "benchmark") yearData.benchmark = returnPct;
    }

    return Array.from(dataByYear.values());
  } catch (error) {
    console.error("Error fetching from Spanner:", error);
    return getMockPerformanceData();
  }
}

export async function getPerformanceData2(): Promise<PerformanceRow[]> {
  if (!database) {
    return getMockPerformanceData2();
  }

  try {
    const query = {
      sql: `SELECT 
              year,
              strategy_id,
              strategy_name,
              return_percentage
            FROM performance_data
            ORDER BY year ASC, strategy_id ASC`,
    };

    const [rows] = await database.run(query);

    // Transform rows into the expected format
    const dataByYear = new Map<string, PerformanceRow>();

    for (const row of rows) {
      const year = row[0].value as string;
      const strategyId = row[1].value as string;
      const returnPct = parseFloat(row[3].value);

      if (!dataByYear.has(year)) {
        dataByYear.set(year, {
          year,
          alpha: 0,
          momentum: 0,
          value: 0,
          quant: 0,
          benchmark: 0,
        });
      }

      const yearData = dataByYear.get(year)!;
      if (strategyId === "linearEdge") yearData.linearEdge = returnPct;
      else if (strategyId === "benchmark") yearData.benchmark = returnPct;
    }

    return Array.from(dataByYear.values());
  } catch (error) {
    console.error("Error fetching from Spanner:", error);
    return getMockPerformanceData2();
  }
}

// Get strategies metadata from Spanner
export async function getStrategies(): Promise<Strategy[]> {
  if (!database) {
    return getMockStrategies();
  }

  try {
    const query = {
      sql: `SELECT 
              strategy_id,
              strategy_name,
              description,
              sharpe_ratio,
              max_drawdown,
              inception_date,
              color
            FROM strategies
            ORDER BY strategy_id ASC`,
    };

    const [rows] = await database.run(query);

    return rows.map((row: any) => ({
      id: row[0].value as string,
      name: row[1].value as string,
      description: row[2].value as string,
      sharpe: parseFloat(row[3].value),
      maxDrawdown: row[4].value as string,
      inceptionDate: row[5].value as string,
      color: row[6].value as string,
    }));
  } catch (error) {
    console.error("Error fetching strategies from Spanner:", error);
    return getMockStrategies();
  }
}

// Transformations and type definitions
export interface PerformanceRow {
  year: string;
  linearEdge: number;
  benchmark: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  sharpe: number;
  maxDrawdown: string;
  inceptionDate: string;
  color: string;
}

// Mock data for development/fallback
function getMockPerformanceData(): PerformanceRow[] {
  return [
    { year: "2025", linearEdge: 11.52, benchmark: 1.01 },
    { year: "2026", linearEdge: 0, benchmark: 0.59 },
  ];
}

function getMockPerformanceData2(): PerformanceRow[] {
  return [
    { year: "2025", linearEdge: 11.52, benchmark: 1.01 },
    { year: "2026", linearEdge: 11.52, benchmark: 1.78 },
  ];
}

function getMockStrategies(): Strategy[] {
  return [
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
  ];
}

// Check if Spanner is connected
export function isSpannerConnected(): boolean {
  return database !== null;
}
