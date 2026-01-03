# Zerix Capital Website

## Overview
A professional corporate website for Zerix Capital, a data-driven investment firm. The site showcases investment strategies, performance data, and team information.

**Tagline:** "Turning data into direction"

## Recent Changes
- **December 2024:** Initial build with landing page, performance dashboard, and team page
- Added Google Cloud Spanner integration for performance data (with mock fallback)
- Implemented contact form with backend validation
- Created responsive design following professional financial services aesthetic

## Architecture

### Frontend (React + Vite)
- **Pages:** Home (`/`), Performance (`/performance`), Team (`/team`)
- **Key Components:**
  - `Navbar` - Fixed navigation with transparent mode for hero
  - `Hero` - Landing hero with tagline and CTAs
  - `PerformanceChart` - Interactive Recharts line graph with strategy toggles
  - `TeamSection` - Team member grid with headshots
  - `Contact` - Contact form with validation
  - `Footer` - Site-wide footer

### Backend (Express)
- **API Endpoints:**
  - `GET /api/performance` - Returns year-over-year returns by strategy
  - `GET /api/strategies` - Returns strategy metadata (Sharpe, drawdown, inception)
  - `POST /api/contact` - Submits contact form with Zod validation
  - `GET /api/health` - Health check including Spanner connection status

### Data Layer
- **Cloud Spanner Integration** (`server/spanner.ts`):
  - Connects to Google Cloud Spanner when env vars are configured
  - Falls back to mock data when not configured
  - Required env vars: `SPANNER_PROJECT_ID`, `SPANNER_INSTANCE_ID`, `SPANNER_DATABASE_ID`

### Shared Types
Located in `shared/schema.ts`:
- `PerformanceDataPoint` - Year + strategy returns + benchmark
- `Strategy` - Strategy metadata
- `ContactSubmission` - Contact form data
- Zod schemas for API validation

## Environment Variables

### Required for Cloud Spanner (optional - falls back to mock data)
- `SPANNER_PROJECT_ID` - Google Cloud project ID
- `SPANNER_INSTANCE_ID` - Spanner instance ID  
- `SPANNER_DATABASE_ID` - Spanner database ID

### Expected Spanner Table Schema
```sql
-- performance_data table
CREATE TABLE performance_data (
  year STRING(4),
  strategy_id STRING(20),
  strategy_name STRING(100),
  return_percentage FLOAT64
);

-- strategies table
CREATE TABLE strategies (
  strategy_id STRING(20) PRIMARY KEY,
  strategy_name STRING(100),
  description STRING(500),
  sharpe_ratio FLOAT64,
  max_drawdown STRING(10),
  inception_date STRING(4),
  color STRING(30)
);
```

## User Preferences
- Professional, data-focused design aesthetic
- DM Sans font family
- Blue primary color scheme
- Clean, minimal interface
- Mobile-responsive layout

## Development

### Running Locally
```bash
npm run dev
```
Starts Express backend + Vite frontend on port 5000.

### File Structure
```
client/src/
  components/     # Reusable UI components
  pages/          # Route pages (home, performance, team)
  lib/            # Utilities and query client
server/
  routes.ts       # API endpoints
  spanner.ts      # Cloud Spanner integration
  storage.ts      # In-memory storage for contact forms
shared/
  schema.ts       # Shared types and Zod schemas
```
