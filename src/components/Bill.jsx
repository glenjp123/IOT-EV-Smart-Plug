import { useLocation, useNavigate } from "react-router";

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const energy = parseFloat(location.state?.energy || 0); // fallback to 0
  const rate = 10; // Rs per kWh
  const amount = energy * rate;

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Bill Summary</h1>
      <p className="text-xl">Energy Consumed: <span className="text-green-400">{energy.toFixed(4)} kWh</span></p>
      <p className="text-xl mt-2">Amount: <span className="text-yellow-400">₹ {amount.toFixed(2)}</span></p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Bill;
