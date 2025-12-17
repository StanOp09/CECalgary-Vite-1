import { useEffect, useState } from "react";

export default function DonorDashboard({ customerId }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/subscriptions/${customerId}`)
      .then(res => res.json())
      .then(data => setSubscriptions(data))
      .finally(() => setLoading(false));
  }, [customerId]);

  const handleCancel = async (subId) => {
    await fetch(`http://localhost:3000/cancel-subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: subId })
    });
    // Refresh subscriptions
    setSubscriptions(prev => prev.filter(sub => sub.id !== subId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 grid gap-6">
      {subscriptions.map(sub => (
        <div key={sub.id} className="p-4 border rounded shadow">
          <h3>{sub.items.data[0].price.product.name}</h3>
          <p>Amount: ${(sub.items.data[0].price.unit_amount / 100).toFixed(2)} CAD</p>
          <p>Interval: {sub.items.data[0].price.recurring.interval}</p>
          <p>Status: {sub.status}</p>
          <button
            onClick={() => handleCancel(sub.id)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
