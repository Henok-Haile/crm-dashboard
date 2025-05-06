import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { format } from "date-fns";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    recent: 0,
    latestDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("customers")
        .select("created_at")
        .order("created_at", { ascending: false });

      if (error || !data) {
        setStats({ total: 0, recent: 0, latestDate: "N/A" });
        setLoading(false);
        return;
      }

      const total = data.length;

      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const recent = data.filter((cust) => {
        return new Date(cust.created_at) > last7Days;
      }).length;

      const latestDate = data[0]?.created_at
        ? format(new Date(data[0].created_at), "MMMM do, yyyy")
        : "N/A";

      setStats({ total, recent, latestDate });
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatBox label="🧮 Total Customers" value={loading ? "..." : stats.total} />
      <StatBox label="🆕 New This Week" value={loading ? "..." : stats.recent} />
      <StatBox label="🗓️ Latest Entry" value={loading ? "..." : stats.latestDate} />
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
