// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await login(email, password);
//       navigate("/chat");
//     } catch (error) {
//       if (error.code === "auth/user-not-found") {
//         setError("No account found with this email");
//       } else if (error.code === "auth/wrong-password") {
//         setError("Incorrect password");
//       } else if (error.code === "auth/invalid-email") {
//         setError("Invalid email address");
//       } else {
//         setError("Failed to login. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neon-darker flex items-center justify-center p-4">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow -top-20 -left-20"></div>
//         <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow -bottom-20 -right-20"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-6xl font-bold neon-text mb-2">NeonChat</h1>
//           <p className="text-neon-blue text-lg">Next Level Communication</p>
//         </div>

//         <div className="glass-effect rounded-2xl p-8 shadow-neon">
//           <h2 className="text-3xl font-bold text-white mb-6">Welcome Back</h2>

//           {error && (
//             <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-neon-blue text-sm font-medium mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-blue/30 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:shadow-neon transition-all"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-neon-blue text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-blue/30 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-neon-blue focus:shadow-neon transition-all"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-blue hover:text-neon-purple transition-colors"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-neon hover:shadow-neon-strong text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Logging in...
//                 </span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-400">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="text-neon-blue hover:text-neon-purple font-semibold transition-colors"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back to Nexora!");
      navigate("/chat");
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-[#0A0E1A] via-[#141B2D] to-[#1E2A42] relative overflow-hidden">
      {/* Background Orbs - smaller on mobile */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Glass Card - responsive padding */}
      <div className="glass-effect rounded-2xl sm:rounded-3xl w-full max-w-md p-6 sm:p-10 animate-fadeIn relative z-10 shadow-neon-strong card-hover">
        {/* Title - responsive text size */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 animate-fadeIn">
            <span className="neon-text">Nexora</span>
            <span className="text-white"> Chat</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Welcome back to the future by AK
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] transition-all duration-200 hover:scale-110"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FiEyeOff size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <FiEye size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn btn-3d text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg hover:shadow-neon-strong mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Logging in...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-5 sm:mt-6 text-center">
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="neon-text font-semibold hover:underline transition-all duration-200 hover:brightness-125"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
