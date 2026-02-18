# InsightGrid — Analytics Dashboard

> A comprehensive, interactive analytics dashboard with real-time data visualization, KPI tracking, and data management.

## Brand Identity

- **Personality**: Professional, data-driven, modern, clean
- **Primary Colors**: Amber (#FB923C), Sky Blue (#38BDF8), Fresh Green (#4ADE80)
- **Background (Dark)**: Warm charcoal (#1C1917) — earthy brown-tinted, not pure black
- **Background (Light)**: Warm sand (#F5F0EB)
- **Fonts**: Sora (headings) + Plus Jakarta Sans (body text)
- **Style**: Glassmorphism header, rounded cards, gradient accents

## Pages

- **Dashboard** (`/`) — Main analytics dashboard with KPIs, charts, and data table

## Components

### Sidebar (`components/dashboard/Sidebar.tsx`)
- Collapsible navigation (260px expanded, 72px collapsed)
- Navigation items: Dashboard, Analytics, Customers, Products, Orders, Settings
- Badge indicators for new items and counts
- Tooltip labels when collapsed
- User profile section at bottom
- Mobile-responsive with overlay mode

### KPI Cards (`components/dashboard/KPICard.tsx`)
- 4 metric cards: Total Revenue, Active Users, Total Orders, Conversion Rate
- Sparkline mini-charts inside each card
- Trend indicators with up/down arrows and percentages
- Hover effects with scale animation
- Real-time value fluctuations (simulated)

### Revenue Overview (`components/dashboard/AreaChartWidget.tsx`)
- Area chart showing Revenue, Expenses, and Profit over 12 months
- Toggle individual metrics on/off
- Custom styled tooltips
- Gradient fills under each area
- Interactive data points on hover

### Sales by Category (`components/dashboard/BarChartWidget.tsx`)
- Bar chart with 6 product categories
- Toggle between Revenue and Orders view
- Individual bar highlighting on hover
- Color-coded bars per category
- Download button

### Traffic Sources (`components/dashboard/DonutChartWidget.tsx`)
- Donut/pie chart showing 5 traffic sources
- Center label shows total or hovered segment value
- Interactive legend — hover to highlight segments
- Percentage breakdown per source

### Conversion Funnel (`components/dashboard/FunnelWidget.tsx`)
- 5-stage funnel: Page Views → Sign Ups → Activated → Subscribed → Converted
- Proportional bar widths
- Drop-off percentage between stages
- Hover effects with glow shadows
- Overall conversion rate summary

### Data Table (`components/dashboard/DataTable.tsx`)
- 25 transaction records with full details
- **Search**: Filter by ID, customer name, email, or product
- **Sort**: Click any column header to sort ascending/descending
- **Filter**: Filter by status (Completed, Pending, Failed, Refunded)
- **Pagination**: 5, 10, or 25 items per page with page navigation
- **Selection**: Checkbox to select individual or all rows
- **Actions**: View, Copy ID, Delete per row (3-dot menu)
- **Export**: Download as CSV or JSON

### Date Range Picker (`components/dashboard/DateRangePicker.tsx`)
- Presets: Today, Last 7 days, Last 30 days, Last 90 days, This year
- Custom date range with start/end date inputs
- Dropdown with checkmark on active selection

### Header (inline in `app/page.tsx`)
- Live visitor count with animated pulse indicator
- Global search bar
- Date range picker
- Notification bell with dropdown (4 notifications, unread badges)
- Dark/light mode toggle
- Refresh button with spin animation
- User avatar

## Features

- **Dark Mode & Light Mode**: Toggle between deep navy and warm cream themes — all chart colors adapt automatically
- **Real-time Simulation**: Live visitor count updates every 3 seconds, KPI values fluctuate every 5 seconds
- **Responsive**: Works on mobile (sidebar becomes overlay), tablet (2 columns), and desktop (full layout)
- **CSV/JSON Export**: Functional download for transaction data
- **Fully Interactive**: Every visible element responds to hover, click, or both

## Tech Stack

- Next.js 14+ with App Router
- React 19
- Tailwind CSS v4
- Recharts (charts)
- Lucide React (icons)
- Sora + Plus Jakarta Sans (Google Fonts)

## How to Customize

- **Change colors**: Edit the CSS variables in `app/globals.css` — both `:root` (dark) and `.light-mode` sections
- **Change fonts**: Update the font imports in `app/layout.tsx`
- **Edit mock data**: All data lives in `lib/data.ts` — change values, add rows, or modify categories
- **Add a chart**: Create a new component in `components/dashboard/`, import it in `app/page.tsx`
- **Change sidebar items**: Edit the `navItems` array in `components/dashboard/Sidebar.tsx`
- **Adjust KPIs**: Modify the `kpiMetrics` array in `lib/data.ts`

## Recent Changes

- Feb 18, 2026: Initial build — Complete analytics dashboard with all components, dark/light mode, responsive layout, and real-time data simulation
- Feb 18, 2026: Color scheme — Warm Charcoal theme. Dark mode uses warm brown-charcoal (#1C1917) with amber (#FB923C) primary, sky blue (#38BDF8) secondary. Light mode uses warm sand (#F5F0EB) with burnt orange (#EA580C) accents. Cozy, modern, earthy feel.
