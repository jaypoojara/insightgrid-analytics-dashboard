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

// --- Analytics page data ---

export const pageViewsData = [
  { page: "/home", views: 24500, uniqueVisitors: 18200, avgTime: "2m 34s", bounceRate: 32 },
  { page: "/products", views: 18300, uniqueVisitors: 14100, avgTime: "3m 12s", bounceRate: 24 },
  { page: "/pricing", views: 12800, uniqueVisitors: 9600, avgTime: "4m 08s", bounceRate: 18 },
  { page: "/blog", views: 9400, uniqueVisitors: 7800, avgTime: "5m 45s", bounceRate: 42 },
  { page: "/about", views: 6200, uniqueVisitors: 5100, avgTime: "1m 52s", bounceRate: 55 },
  { page: "/contact", views: 4100, uniqueVisitors: 3400, avgTime: "2m 20s", bounceRate: 38 },
];

export const sessionsByDevice = [
  { name: "Desktop", value: 58, color: "var(--chart-1)" },
  { name: "Mobile", value: 32, color: "var(--chart-2)" },
  { name: "Tablet", value: 10, color: "var(--chart-3)" },
];

export const sessionsByCountry = [
  { country: "United States", sessions: 8420, percentage: 38.2 },
  { country: "United Kingdom", sessions: 3180, percentage: 14.4 },
  { country: "Germany", sessions: 2640, percentage: 12.0 },
  { country: "Canada", sessions: 2100, percentage: 9.5 },
  { country: "France", sessions: 1850, percentage: 8.4 },
  { country: "Australia", sessions: 1520, percentage: 6.9 },
  { country: "Japan", sessions: 1280, percentage: 5.8 },
  { country: "India", sessions: 1050, percentage: 4.8 },
];

export const hourlyTrafficData = [
  { hour: "12am", visitors: 120 }, { hour: "2am", visitors: 80 }, { hour: "4am", visitors: 65 },
  { hour: "6am", visitors: 180 }, { hour: "8am", visitors: 420 }, { hour: "10am", visitors: 680 },
  { hour: "12pm", visitors: 750 }, { hour: "2pm", visitors: 820 }, { hour: "4pm", visitors: 780 },
  { hour: "6pm", visitors: 640 }, { hour: "8pm", visitors: 520 }, { hour: "10pm", visitors: 280 },
];

// --- Customers page data ---

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: "Starter" | "Pro" | "Business" | "Enterprise";
  status: "active" | "inactive" | "churned";
  spent: number;
  orders: number;
  joinDate: string;
  lastActive: string;
  location: string;
}

export const customersData: Customer[] = [
  { id: "CUS-001", name: "Sarah Johnson", email: "sarah@example.com", avatar: "SJ", plan: "Pro", status: "active", spent: 2450, orders: 12, joinDate: "2024-03-15", lastActive: "2 hours ago", location: "New York, US" },
  { id: "CUS-002", name: "Mike Chen", email: "mike@company.io", avatar: "MC", plan: "Business", status: "active", spent: 5680, orders: 28, joinDate: "2024-01-08", lastActive: "5 min ago", location: "San Francisco, US" },
  { id: "CUS-003", name: "Emma Williams", email: "emma@startup.co", avatar: "EW", plan: "Enterprise", status: "active", spent: 12400, orders: 45, joinDate: "2023-11-22", lastActive: "1 hour ago", location: "London, UK" },
  { id: "CUS-004", name: "James Brown", email: "james@tech.dev", avatar: "JB", plan: "Starter", status: "inactive", spent: 320, orders: 4, joinDate: "2024-08-10", lastActive: "2 weeks ago", location: "Berlin, DE" },
  { id: "CUS-005", name: "Lisa Anderson", email: "lisa@design.co", avatar: "LA", plan: "Pro", status: "active", spent: 3890, orders: 19, joinDate: "2024-02-28", lastActive: "30 min ago", location: "Toronto, CA" },
  { id: "CUS-006", name: "David Kim", email: "david@agency.com", avatar: "DK", plan: "Enterprise", status: "active", spent: 18200, orders: 62, joinDate: "2023-09-14", lastActive: "Just now", location: "Seoul, KR" },
  { id: "CUS-007", name: "Sophie Martin", email: "sophie@brand.io", avatar: "SM", plan: "Business", status: "churned", spent: 1890, orders: 8, joinDate: "2024-04-05", lastActive: "1 month ago", location: "Paris, FR" },
  { id: "CUS-008", name: "Alex Rivera", email: "alex@studio.co", avatar: "AR", plan: "Pro", status: "active", spent: 4200, orders: 22, joinDate: "2024-01-20", lastActive: "3 hours ago", location: "Miami, US" },
  { id: "CUS-009", name: "Rachel Green", email: "rachel@media.com", avatar: "RG", plan: "Business", status: "active", spent: 6750, orders: 31, joinDate: "2023-12-03", lastActive: "15 min ago", location: "Sydney, AU" },
  { id: "CUS-010", name: "Tom Wilson", email: "tom@retail.co", avatar: "TW", plan: "Enterprise", status: "active", spent: 22100, orders: 78, joinDate: "2023-08-17", lastActive: "45 min ago", location: "Chicago, US" },
];

export const customerSegments = [
  { segment: "Enterprise", count: 24, revenue: 480000, color: "var(--chart-1)" },
  { segment: "Business", count: 86, revenue: 320000, color: "var(--chart-2)" },
  { segment: "Pro", count: 210, revenue: 185000, color: "var(--chart-3)" },
  { segment: "Starter", count: 445, revenue: 62000, color: "var(--chart-4)" },
];

// --- Products page data ---

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  rating: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
}

export const productsData: Product[] = [
  { id: "PRD-001", name: "Pro Plan — Annual", category: "Subscription", price: 245.50, stock: 999, sold: 1240, revenue: 304420, rating: 4.8, status: "in_stock" },
  { id: "PRD-002", name: "Business Plan — Annual", category: "Subscription", price: 189.00, stock: 999, sold: 860, revenue: 162540, rating: 4.6, status: "in_stock" },
  { id: "PRD-003", name: "Enterprise Suite", category: "Subscription", price: 999.00, stock: 999, sold: 320, revenue: 319680, rating: 4.9, status: "in_stock" },
  { id: "PRD-004", name: "Starter Plan — Monthly", category: "Subscription", price: 9.99, stock: 999, sold: 4200, revenue: 41958, rating: 4.3, status: "in_stock" },
  { id: "PRD-005", name: "Analytics Add-on", category: "Add-on", price: 49.00, stock: 999, sold: 680, revenue: 33320, rating: 4.5, status: "in_stock" },
  { id: "PRD-006", name: "API Access Pack", category: "Add-on", price: 79.00, stock: 150, sold: 420, revenue: 33180, rating: 4.7, status: "low_stock" },
  { id: "PRD-007", name: "Custom Dashboard", category: "Service", price: 2500.00, stock: 10, sold: 45, revenue: 112500, rating: 4.9, status: "low_stock" },
  { id: "PRD-008", name: "Data Migration", category: "Service", price: 1200.00, stock: 0, sold: 28, revenue: 33600, rating: 4.4, status: "out_of_stock" },
  { id: "PRD-009", name: "White-label License", category: "License", price: 4999.00, stock: 5, sold: 12, revenue: 59988, rating: 5.0, status: "low_stock" },
  { id: "PRD-010", name: "Training Workshop", category: "Service", price: 350.00, stock: 20, sold: 95, revenue: 33250, rating: 4.6, status: "in_stock" },
];

export const productPerformance = [
  { month: "Jan", subscriptions: 380, addons: 120, services: 18 },
  { month: "Feb", subscriptions: 420, addons: 145, services: 22 },
  { month: "Mar", subscriptions: 460, addons: 160, services: 15 },
  { month: "Apr", subscriptions: 410, addons: 138, services: 25 },
  { month: "May", subscriptions: 490, addons: 175, services: 20 },
  { month: "Jun", subscriptions: 530, addons: 190, services: 28 },
  { month: "Jul", subscriptions: 505, addons: 180, services: 32 },
  { month: "Aug", subscriptions: 560, addons: 205, services: 24 },
  { month: "Sep", subscriptions: 610, addons: 220, services: 30 },
  { month: "Oct", subscriptions: 580, addons: 210, services: 26 },
  { month: "Nov", subscriptions: 640, addons: 235, services: 35 },
  { month: "Dec", subscriptions: 700, addons: 260, services: 38 },
];

// --- Orders page data ---

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  date: string;
  paymentMethod: string;
  trackingId: string | null;
}

export const ordersData: Order[] = [
  { id: "ORD-2048", customer: "Sarah Johnson", items: 2, total: 491.00, status: "delivered", date: "2024-12-15", paymentMethod: "Credit Card", trackingId: "TRK-98234" },
  { id: "ORD-2047", customer: "Mike Chen", items: 1, total: 189.00, status: "shipped", date: "2024-12-14", paymentMethod: "PayPal", trackingId: "TRK-98233" },
  { id: "ORD-2046", customer: "Emma Williams", items: 3, total: 1568.00, status: "processing", date: "2024-12-14", paymentMethod: "Wire Transfer", trackingId: null },
  { id: "ORD-2045", customer: "James Brown", items: 1, total: 9.99, status: "delivered", date: "2024-12-13", paymentMethod: "Credit Card", trackingId: "TRK-98230" },
  { id: "ORD-2044", customer: "Lisa Anderson", items: 2, total: 294.50, status: "cancelled", date: "2024-12-13", paymentMethod: "Debit Card", trackingId: null },
  { id: "ORD-2043", customer: "David Kim", items: 4, total: 3827.00, status: "delivered", date: "2024-12-12", paymentMethod: "Credit Card", trackingId: "TRK-98228" },
  { id: "ORD-2042", customer: "Sophie Martin", items: 1, total: 189.00, status: "returned", date: "2024-12-12", paymentMethod: "PayPal", trackingId: "TRK-98227" },
  { id: "ORD-2041", customer: "Alex Rivera", items: 2, total: 328.00, status: "delivered", date: "2024-12-11", paymentMethod: "Credit Card", trackingId: "TRK-98225" },
  { id: "ORD-2040", customer: "Rachel Green", items: 1, total: 245.50, status: "shipped", date: "2024-12-11", paymentMethod: "Credit Card", trackingId: "TRK-98224" },
  { id: "ORD-2039", customer: "Tom Wilson", items: 5, total: 6245.00, status: "processing", date: "2024-12-10", paymentMethod: "Wire Transfer", trackingId: null },
  { id: "ORD-2038", customer: "Nina Patel", items: 1, total: 189.00, status: "delivered", date: "2024-12-10", paymentMethod: "Credit Card", trackingId: "TRK-98222" },
  { id: "ORD-2037", customer: "Chris Taylor", items: 2, total: 394.50, status: "delivered", date: "2024-12-09", paymentMethod: "PayPal", trackingId: "TRK-98220" },
];

export const orderStatusSummary = [
  { status: "Processing", count: 12, color: "var(--chart-2)" },
  { status: "Shipped", count: 8, color: "var(--chart-1)" },
  { status: "Delivered", count: 156, color: "var(--chart-3)" },
  { status: "Cancelled", count: 5, color: "var(--chart-4)" },
  { status: "Returned", count: 3, color: "var(--chart-5)" },
];
