export const revenueData = [
  { month: "Jan", revenue: 42500, expenses: 28400, profit: 14100 },
  { month: "Feb", revenue: 47800, expenses: 31200, profit: 16600 },
  { month: "Mar", revenue: 51200, expenses: 29800, profit: 21400 },
  { month: "Apr", revenue: 48900, expenses: 33100, profit: 15800 },
  { month: "May", revenue: 55600, expenses: 35400, profit: 20200 },
  { month: "Jun", revenue: 62300, expenses: 38200, profit: 24100 },
  { month: "Jul", revenue: 58100, expenses: 36700, profit: 21400 },
  { month: "Aug", revenue: 64800, expenses: 39100, profit: 25700 },
  { month: "Sep", revenue: 71200, expenses: 42300, profit: 28900 },
  { month: "Oct", revenue: 68500, expenses: 40800, profit: 27700 },
  { month: "Nov", revenue: 74300, expenses: 43600, profit: 30700 },
  { month: "Dec", revenue: 82100, expenses: 47200, profit: 34900 },
];

export const userGrowthData = [
  { month: "Jan", totalUsers: 8420, newUsers: 1250, activeUsers: 5830 },
  { month: "Feb", totalUsers: 9180, newUsers: 1340, activeUsers: 6410 },
  { month: "Mar", totalUsers: 10200, newUsers: 1520, activeUsers: 7150 },
  { month: "Apr", totalUsers: 11050, newUsers: 1380, activeUsers: 7820 },
  { month: "May", totalUsers: 12300, newUsers: 1680, activeUsers: 8640 },
  { month: "Jun", totalUsers: 13800, newUsers: 1950, activeUsers: 9720 },
  { month: "Jul", totalUsers: 14900, newUsers: 1720, activeUsers: 10480 },
  { month: "Aug", totalUsers: 16200, newUsers: 1860, activeUsers: 11350 },
  { month: "Sep", totalUsers: 17800, newUsers: 2100, activeUsers: 12480 },
  { month: "Oct", totalUsers: 19100, newUsers: 1940, activeUsers: 13380 },
  { month: "Nov", totalUsers: 20500, newUsers: 2080, activeUsers: 14350 },
  { month: "Dec", totalUsers: 22300, newUsers: 2350, activeUsers: 15620 },
];

export const trafficSources = [
  { name: "Direct", value: 4520, color: "var(--chart-1)" },
  { name: "Organic Search", value: 3280, color: "var(--chart-2)" },
  { name: "Social Media", value: 2150, color: "var(--chart-3)" },
  { name: "Referral", value: 1840, color: "var(--chart-4)" },
  { name: "Email", value: 1210, color: "var(--chart-5)" },
];

export const salesByCategory = [
  { category: "Electronics", sales: 42500, orders: 856 },
  { category: "Clothing", sales: 28300, orders: 1243 },
  { category: "Home & Garden", sales: 21800, orders: 654 },
  { category: "Sports", sales: 18200, orders: 432 },
  { category: "Books", sales: 12400, orders: 1876 },
  { category: "Beauty", sales: 15600, orders: 987 },
];

export const funnelData = [
  { stage: "Page Views", value: 12500, color: "var(--chart-1)" },
  { stage: "Sign Ups", value: 8200, color: "var(--chart-2)" },
  { stage: "Activated", value: 5100, color: "var(--chart-3)" },
  { stage: "Subscribed", value: 2800, color: "var(--chart-4)" },
  { stage: "Converted", value: 1500, color: "var(--chart-5)" },
];

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
  sparklineData: number[];
  format: "currency" | "number" | "percentage";
}

export const kpiMetrics: KPIMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 284500,
    change: 12.5,
    trend: "up",
    sparklineData: [42, 48, 51, 49, 56, 62, 58, 65, 71, 69, 74, 82],
    format: "currency",
  },
  {
    id: "users",
    label: "Active Users",
    value: 15620,
    change: 8.2,
    trend: "up",
    sparklineData: [58, 64, 72, 78, 86, 97, 105, 114, 125, 134, 144, 156],
    format: "number",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: 6048,
    change: -2.4,
    trend: "down",
    sparklineData: [520, 580, 560, 510, 490, 530, 480, 510, 475, 500, 460, 480],
    format: "number",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: 3.24,
    change: 0.8,
    trend: "up",
    sparklineData: [2.8, 2.9, 3.0, 2.7, 3.1, 3.2, 3.0, 3.3, 3.4, 3.1, 3.2, 3.24],
    format: "percentage",
  },
];

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  product: string;
  paymentMethod: string;
}

export const transactionsData: Transaction[] = [
  { id: "TXN-001", customer: "Sarah Johnson", email: "sarah@example.com", amount: 245.5, status: "completed", date: "2024-12-15", product: "Pro Plan", paymentMethod: "Credit Card" },
  { id: "TXN-002", customer: "Mike Chen", email: "mike@company.io", amount: 189.0, status: "completed", date: "2024-12-14", product: "Business Plan", paymentMethod: "PayPal" },
  { id: "TXN-003", customer: "Emma Williams", email: "emma@startup.co", amount: 520.0, status: "pending", date: "2024-12-14", product: "Enterprise", paymentMethod: "Wire Transfer" },
  { id: "TXN-004", customer: "James Brown", email: "james@tech.dev", amount: 79.99, status: "completed", date: "2024-12-13", product: "Starter Plan", paymentMethod: "Credit Card" },
  { id: "TXN-005", customer: "Lisa Anderson", email: "lisa@design.co", amount: 345.0, status: "failed", date: "2024-12-13", product: "Pro Plan", paymentMethod: "Debit Card" },
  { id: "TXN-006", customer: "David Kim", email: "david@agency.com", amount: 999.0, status: "completed", date: "2024-12-12", product: "Enterprise", paymentMethod: "Credit Card" },
  { id: "TXN-007", customer: "Sophie Martin", email: "sophie@brand.io", amount: 189.0, status: "refunded", date: "2024-12-12", product: "Business Plan", paymentMethod: "PayPal" },
  { id: "TXN-008", customer: "Alex Rivera", email: "alex@studio.co", amount: 79.99, status: "completed", date: "2024-12-11", product: "Starter Plan", paymentMethod: "Credit Card" },
  { id: "TXN-009", customer: "Rachel Green", email: "rachel@media.com", amount: 245.5, status: "pending", date: "2024-12-11", product: "Pro Plan", paymentMethod: "Credit Card" },
  { id: "TXN-010", customer: "Tom Wilson", email: "tom@retail.co", amount: 520.0, status: "completed", date: "2024-12-10", product: "Enterprise", paymentMethod: "Wire Transfer" },
  { id: "TXN-011", customer: "Nina Patel", email: "nina@consulting.io", amount: 189.0, status: "completed", date: "2024-12-10", product: "Business Plan", paymentMethod: "Credit Card" },
  { id: "TXN-012", customer: "Chris Taylor", email: "chris@saas.dev", amount: 345.0, status: "completed", date: "2024-12-09", product: "Pro Plan", paymentMethod: "PayPal" },
  { id: "TXN-013", customer: "Amy Zhang", email: "amy@ecommerce.co", amount: 79.99, status: "failed", date: "2024-12-09", product: "Starter Plan", paymentMethod: "Debit Card" },
  { id: "TXN-014", customer: "Robert Davis", email: "robert@finance.com", amount: 999.0, status: "completed", date: "2024-12-08", product: "Enterprise", paymentMethod: "Wire Transfer" },
  { id: "TXN-015", customer: "Maya Gupta", email: "maya@health.io", amount: 245.5, status: "completed", date: "2024-12-08", product: "Pro Plan", paymentMethod: "Credit Card" },
  { id: "TXN-016", customer: "Kevin Lee", email: "kevin@logistics.co", amount: 189.0, status: "pending", date: "2024-12-07", product: "Business Plan", paymentMethod: "PayPal" },
  { id: "TXN-017", customer: "Diana Ross", email: "diana@music.com", amount: 520.0, status: "completed", date: "2024-12-07", product: "Enterprise", paymentMethod: "Credit Card" },
  { id: "TXN-018", customer: "Ethan Moore", email: "ethan@gaming.io", amount: 79.99, status: "refunded", date: "2024-12-06", product: "Starter Plan", paymentMethod: "Credit Card" },
  { id: "TXN-019", customer: "Olivia Clark", email: "olivia@education.co", amount: 345.0, status: "completed", date: "2024-12-06", product: "Pro Plan", paymentMethod: "Debit Card" },
  { id: "TXN-020", customer: "Marcus Johnson", email: "marcus@sports.com", amount: 189.0, status: "completed", date: "2024-12-05", product: "Business Plan", paymentMethod: "PayPal" },
  { id: "TXN-021", customer: "Isabella White", email: "isabella@art.io", amount: 999.0, status: "pending", date: "2024-12-05", product: "Enterprise", paymentMethod: "Wire Transfer" },
  { id: "TXN-022", customer: "Lucas Adams", email: "lucas@dev.co", amount: 245.5, status: "completed", date: "2024-12-04", product: "Pro Plan", paymentMethod: "Credit Card" },
  { id: "TXN-023", customer: "Hannah Baker", email: "hannah@food.com", amount: 79.99, status: "completed", date: "2024-12-04", product: "Starter Plan", paymentMethod: "PayPal" },
  { id: "TXN-024", customer: "Ryan Scott", email: "ryan@travel.io", amount: 520.0, status: "failed", date: "2024-12-03", product: "Enterprise", paymentMethod: "Credit Card" },
  { id: "TXN-025", customer: "Zoe Miller", email: "zoe@fashion.co", amount: 345.0, status: "completed", date: "2024-12-03", product: "Pro Plan", paymentMethod: "Debit Card" },
];
