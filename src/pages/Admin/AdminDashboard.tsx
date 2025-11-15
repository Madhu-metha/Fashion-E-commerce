import { Card, CardContent, Button, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";

const data = [
    { day: "1", revenue: 200 },
    { day: "5", revenue: 400 },
    { day: "10", revenue: 650 },
    { day: "15", revenue: 900 },
    { day: "20", revenue: 1100 },
    { day: "25", revenue: 1500 },
    { day: "30", revenue: 1900 },
];

export default function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between">
                <div>
                    <div className="px-6 py-6 flex items-center gap-3 border-b">
                        <Avatar alt="Admin" src="/admin.png" />
                        <h1 className="text-lg font-bold text-gray-800">Aurena Admin</h1>
                    </div>
                    <nav className="mt-6 space-y-2">
                        <SidebarItem icon={<AnalyticsIcon />} text="Dashboard" active />
                        <SidebarItem icon={<InventoryIcon />} text="Products" onClick={() => navigate("/admin/products")} />
                        <SidebarItem icon={<ShoppingCartIcon />} text="Orders" />
                        <SidebarItem icon={<PeopleAltIcon />} text="Customers" />
                        <SidebarItem icon={<AnalyticsIcon />} text="Analytics" />
                    </nav>
                </div>

                <div className="px-6 py-4 border-t">
                    <Button fullWidth variant="outlined" color="error">
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-800 mb-8"
                >
                    Dashboard Overview
                </motion.h1>

                {/* Top Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <StatCard title="Today's Sales" value="$12,480" change="+12% from yesterday" color="text-green-600" />
                    <StatCard title="Total Orders (Month)" value="1,280" change="+8% from last month" color="text-green-600" />
                    <StatCard title="New Customers" value="94" change="-2% from last month" color="text-red-600" />
                    <StatCard title="Inventory Count" value="2,453" change="12 items low stock" color="text-gray-600" />
                </motion.div>

                {/* Sales Chart & Quick Links */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <Card className="lg:col-span-2 shadow-lg">
                        <CardContent>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Revenue (Last 30 Days)</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardContent>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Links</h2>
                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        backgroundColor: "#111827",
                                        "&:hover": { backgroundColor: "#374151" },
                                    }}
                                >
                                    Add New Product
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<ShoppingCartIcon />}
                                    sx={{ borderColor: "#111827", color: "#111827", "&:hover": { borderColor: "#ec4899" } }}
                                >
                                    Process Orders
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<PeopleAltIcon />}
                                    sx={{ borderColor: "#111827", color: "#111827", "&:hover": { borderColor: "#ec4899" } }}
                                >
                                    View Customers
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Latest Orders Table */}
                <motion.div
                    className="bg-white shadow-lg rounded-xl p-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Latest Orders</h2>
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="text-gray-600 text-sm uppercase">
                                <th className="py-2">Order ID</th>
                                <th className="py-2">Customer</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <OrderRow id="#3058" name="Liam Johnson" date="12 Oct 2023" status="Shipped" total="$124.50" color="green" />
                            <OrderRow id="#3057" name="Olivia Smith" date="12 Oct 2023" status="Processing" total="$89.99" color="yellow" />
                            <OrderRow id="#3056" name="Noah Williams" date="11 Oct 2023" status="Shipped" total="$250.00" color="green" />
                            <OrderRow id="#3055" name="Emma Brown" date="10 Oct 2023" status="Canceled" total="$45.70" color="red" />
                        </tbody>
                    </table>
                </motion.div>
            </main>
        </div>
    );
}

// Sidebar item component
function SidebarItem({ icon, text, active = false, onClick,
}: {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 ${active ? "bg-gray-100 border-l-4 border-pink-500 text-pink-600" : ""
                }`}
        >
            {icon}
            <span>{text}</span>
        </div>
    );
}

// Stat Card
function StatCard({
    title,
    value,
    change,
    color,
}: {
    title: string;
    value: string;
    change: string;
    color: string;
}) {
    return (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent>
                <p className="text-gray-600 text-sm">{title}</p>
                <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
                <p className={`text-sm font-semibold ${color}`}>{change}</p>
            </CardContent>
        </Card>
    );
}

// Order Row
function OrderRow({
    id,
    name,
    date,
    status,
    total,
    color,
}: {
    id: string;
    name: string;
    date: string;
    status: string;
    total: string;
    color: string;
}) {
    const badgeColor =
        color === "green"
            ? "bg-green-100 text-green-700"
            : color === "yellow"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

    return (
        <tr className="border-t hover:bg-gray-50 transition">
            <td className="py-3">{id}</td>
            <td className="py-3">{name}</td>
            <td className="py-3">{date}</td>
            <td className="py-3">
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${badgeColor}`}>{status}</span>
            </td>
            <td className="py-3">{total}</td>
        </tr>
    );
}
