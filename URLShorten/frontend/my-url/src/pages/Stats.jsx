import { useEffect, useState } from "react";
import { getStats } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function Stats() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getStats(code);
    setStats(data);
  }

  if (!stats) return <p>Loading…</p>;

  return (
    <div className="card max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Stats for: {code}</h1>

      <p>
        <strong>Long URL:</strong> {stats.longUrl}
      </p>

      <p>
        <strong>Total Clicks:</strong> {stats.clicks}
      </p>

      <button onClick={() => navigate("/")} className="btn-primary">
        Back to Dashboard
      </button>
    </div>
  );
}
