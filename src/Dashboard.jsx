import { useEffect } from "react";
import supabase from "./supabase-client";

export default function Dashboard() {
  useEffect(() => {
    async function fetchMetrics() {
      const { data, error } = await supabase
        .from("sales_deals")
        .select(
          `
          name,
          value.sum()
          `
        )
        .order("value", { ascending: false })
        .limit(1);
    }

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
}
