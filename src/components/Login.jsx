import { useState } from "react";
import { useNavigate } from "react-router";
import AnimatedTitle from "./Animated";
import { motion } from "framer-motion";
import InfiniteLoopText from "./InfinteLoopText";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Temporary dev shortcut:
    localStorage.setItem("authenticated", "true");
    navigate("/dashboard");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await fetch("http://192.168.174.205/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: new URLSearchParams({ user: username, pass: password }),
  //     });

  //     const result = await response.json();
  //     if (result.status === "success") {
  //       localStorage.setItem("authenticated", "true");
  //       navigate("/dashboard");
  //     } else {
  //       setError("Invalid username or password");
  //     }
  //   } catch (err) {
  //     setError("Failed to connect to ESP32. Check network and try again.");
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}  // Start fully invisible & slightly zoomed
      animate={{ opacity: 1, scale: 1 }}    // Fade in and return to normal scale
      transition={{ duration: 1 }}          // Animation duration
      className="flex flex-col justify-center items-center h-screen bg-gray-900 bg-cover bg-center"
      style={{ backgroundImage: `url('/bg_img.avif')`}}
    >
      <div className="w-full flex justify-center mb-6">
        <AnimatedTitle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-8 rounded-lg shadow-lg w-80 bg-opacity-30 backdrop-blur-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-blue-700 text-3xl font-bold mb-4 text-center"
        >
          Login
        </motion.h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <motion.input
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-2 rounded bg-gray-700 text-white outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <motion.input
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-2 rounded bg-gray-700 text-white outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-blue-600 rounded text-white hover:bg-blue-700"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </motion.div>

      {/* <InfiniteLoopText /> */}
    </motion.div>
  );
};

export default Login;
