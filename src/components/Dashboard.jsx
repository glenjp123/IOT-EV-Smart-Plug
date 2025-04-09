import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import AnimatedTitle from "./Animated";

const Dashboard = () => {
  const [data, setData] = useState({
    ir: "-",
    current: "-",
    voltage: "-",
    power: "-",
    status: "Idle",
  });

  const [status, setStatus] = useState("Connecting...");
  const [timer, setTimer] = useState("");

  const [chargingData, setChargingData] = useState({
    startTime: null,
    voltage: 0,
    current: 0,
  });
  
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.79.205/data");
      if (response.ok) {
        const json = await response.json();
        setData(json);
        setStatus("Connected");
      } else {
        setStatus("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("Disconnected");
    }
  };

  // const startCharging = async () => {
  //   if (!timer || isNaN(timer)) {
  //     alert("Please enter a valid time in seconds.");
  //     return;
  //   }
  
  //   if (data.ir !== 0) {
  //     alert("EV not detected. Please connect the vehicle first.");
  //     return;
  //   }
  
  //   try {
  //     const res = await fetch(`http://192.168.79.205/start?duration=${timer}`);
  //     if (res.ok) {
  //       const now = Date.now(); // timestamp in ms
  //       setChargingData({
  //         startTime: now,
  //         voltage: parseFloat(data.voltage),
  //         current: parseFloat(data.current),
  //         duration: parseInt(timer),
  //       });
  
  //       setData((prev) => ({ ...prev, status: "Charging..." }));
  //     } else {
  //       alert("Failed to start charging.");
  //     }
  //   } catch (error) {
  //     alert("Error starting charging: " + error.message);
  //   }
  // };
  

  const startCharging = async () => {
    // Ensure timer is valid
    if (!timer || isNaN(timer)) {
      alert("Please enter a valid time in seconds.");
      return;
    }
  
    // Check if EV is connected
    if (parseInt(data.ir) !== 0) {
      alert("EV not detected. Please ensure the vehicle is connected before starting charging.");
      return;
    }
  
    try {
      const res = await fetch(`http://192.168.79.205/start?duration=${timer}`);
      if (res.ok) {
        setData((prev) => ({ ...prev, status: "Charging..." }));
        setTimeout(() => {
          setData((prev) => ({ ...prev, status: "Charging Completed" }));
          setTimer("");
        }, parseInt(timer) * 1000);
      } else {
        alert("Failed to start charging.");
      }
    } catch (error) {
      alert("Error starting charging: " + error.message);
    }
  };
  

  useEffect(() => {
    if (data.status === "Charging completed") {
      const { voltage, current, duration } = chargingData;
      const power = (voltage * current) / 1000; // in watts
      const energy = (power * duration) / 3600; // in watt-seconds → kWh
  
      const confirmed = window.confirm("Charging completed! View bill?");
      if (confirmed) {
        navigate("/bill", { state: { energy } });
      }
    }
  }, [data.status]);
  
  
  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true") {
      navigate("/");
    }

    const interval = setInterval(fetchData, 1000); // Poll every 2s
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center bg-cover bg-center bg-[url('https://img.freepik.com/premium-photo/futuristic-white-electric-car-charging-sleek-station-minimalist-icy-blue-setting-symbolizing-cuttingedge-ecofriendly-technology-sustainable-energy-innovation_1006475-6212.jpg?w=1800')]"
    >
      <AnimatedTitle />
      {/* <div className="text-2xl text-blue-800 text-center mt-2">Status: {status}</div> */}

      <div className="text-2xl font-bold text-center mt-2">
        <span className="text-blue-800">ESP32 Status: </span>
        <span className={status === "Connected" ? "text-green-500" : "text-red-500"}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <SensorCard title="IR Sensor" value={data.ir==0?"EV Detected":"Disconnected"} color="text-green-400" delay={0.3} />
        <SensorCard title="Current" value={`${data.current} mA`} delay={0.5} />
        <SensorCard title="Voltage" value={`${data.voltage} V`} delay={0.7} />
        <SensorCard title="Power" value={`${data.power} W`} delay={0.9} />
        <SensorCard title="System Status" value={data.status} color="text-yellow-300" delay={1.1} />
      </div>

      <div className="flex gap-4 mt-6">
        <input
          type="number"
          placeholder="Enter time (sec)"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          className="bg-white text-black px-4 py-2 rounded"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startCharging}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Start Charging
        </motion.button>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startCharging}
          className={`px-4 py-2 rounded ${
            data.ir === 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={data.ir !== 0}
        >
          Start Charging
        </motion.button> */}


        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.removeItem("authenticated");
            navigate("/");
          }}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

const SensorCard = ({ title, value, color = "text-white", delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </motion.div>
);

export default Dashboard;
