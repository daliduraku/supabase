import { useEffect, useState } from "react";
import supabase from "./supabase-client";

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
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
        if (error) {
          throw error;
        }
        console.log(data);
        setMetrics(data);
        console.log(error);
      } catch (error) {
        console.error("Caught an error:", error);
      }
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
