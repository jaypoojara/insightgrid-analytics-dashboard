# InsightGrid — Analytics Dashboard

> A comprehensive, interactive analytics dashboard with real-time data visualization, KPI tracking, and data management.

## Brand Identity

- **Personality**: Professional, data-driven, modern, clean
- **Primary Colors**: Amber (#FB923C), Sky Blue (#38BDF8), Fresh Green (#4ADE80)
- **Background (Dark)**: Warm charcoal (#1C1917) — earthy brown-tinted, not pure black
- **Background (Light)**: Warm sand (#F5F0EB)
- **Fonts**: Instrument Sans (headings) + Geist Sans (body text)
- **Style**: Glassmorphism header, rounded cards, gradient accents

## Pages

All pages are accessible via the sidebar navigation. Clicking a sidebar item switches the content area.

- **Dashboard** — Main overview with KPIs, charts, and transaction table
- **Analytics** — Detailed traffic analytics with hourly traffic chart, user growth chart, top pages, device breakdown, and top countries
- **Customers** — Customer management with segment breakdown, search/filter, status badges, and a full customer table
- **Products** — Product catalog with performance chart, grid/list toggle, sorting by revenue/sold/rating, and stock status indicators
- **Orders** — Order management with status pipeline, expandable order details, delivery timeline, and copy-to-clipboard
- **Settings** — Account settings with tabs for Profile, Notifications, Security, Billing, and Appearance

## Components

### Sidebar (`components/dashboard/Sidebar.tsx`)
- Collapsible navigation (260px expanded, 72px collapsed)
- Navigation items: Dashboard, Analytics, Customers, Products, Orders, Settings
- Clicking a sidebar item now switches the main content panel
- Badge indicators for new items and counts
- Tooltip labels when collapsed
- User profile section at bottom
- Mobile-responsive with overlay mode (closes on navigation)

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

### Analytics Content (`components/dashboard/AnalyticsContent.tsx`)
- 4 KPI cards: Total Sessions, Avg. Session Duration, Bounce Rate, Pages per Session
- Hourly traffic area chart (switchable to User Growth chart via tabs)
- Top pages list with visual bar indicators and hover highlights
- Device breakdown with progress bars (Desktop, Mobile, Tablet)
- Top countries ranked list with session counts

### Customers Content (`components/dashboard/CustomersContent.tsx`)
- Summary cards: Total Customers, Active, Total Revenue, Avg. Spend
- Customer segment breakdown (Enterprise, Business, Pro, Starter) with revenue
- Search bar and status filter dropdown (All, Active, Inactive, Churned)
- Customer table with avatar, plan badge, status indicator, spend, location
- Click a row to highlight it, "Add Customer" button

### Products Content (`components/dashboard/ProductsContent.tsx`)
- Summary cards: Total Revenue, Units Sold, Low/Out of Stock count
- Product performance stacked bar chart (Subscriptions, Add-ons, Services)
- Toolbar: search, sort by revenue/sold/rating, grid/list view toggle
- Grid view: product cards with status badge, star ratings, revenue
- List view: sortable table with all product details

### Orders Content (`components/dashboard/OrdersContent.tsx`)
- Summary cards: Total Orders, Revenue, Avg. Order Value
- Order pipeline: clickable status buttons (Processing, Shipped, Delivered, Cancelled, Returned)
- Search + status filter
- Expandable order cards with details: customer, payment, tracking, Copy ID button
- Delivery timeline stepper for shipped/delivered orders

### Settings Content (`components/dashboard/SettingsContent.tsx`)
- Tab navigation: Profile, Notifications, Security, Billing, Appearance
- **Profile**: Avatar, editable fields (name, email, phone, role), timezone/language preferences
- **Notifications**: Toggle switches for 6 notification types
- **Security**: Change password form, 2FA setup, active sessions management
- **Billing**: Current plan display, payment method, invoice history
- **Appearance**: Theme preview cards for dark/light mode

### Header (inline in `app/page.tsx`)
- Dynamic title that updates based on active sidebar item
- Live visitor count (shown only on Dashboard page)
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
- Feb 18, 2026: Switched fonts from Sora + Plus Jakarta Sans to Instrument Sans + Geist Sans for a sharper, more premium feel
- Feb 18, 2026: Added interactive pages for all sidebar items — Analytics (traffic & user growth charts, top pages, device/geo breakdown), Customers (segment breakdown, searchable table with status filters), Products (performance chart, grid/list views, sort options), Orders (status pipeline, expandable cards with delivery timeline), Settings (profile, notifications, security, billing, appearance tabs). Sidebar now switches content on click. Header title updates dynamically.
