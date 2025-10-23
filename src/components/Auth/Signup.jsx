// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     displayName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     if (formData.password.length < 6) {
//       return setError("Password must be at least 6 characters");
//     }

//     if (formData.displayName.length < 3) {
//       return setError("Name must be at least 3 characters");
//     }

//     setLoading(true);

//     try {
//       await signup(formData.email, formData.password, formData.displayName);
//       navigate("/chat");
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         setError("Email is already registered");
//       } else if (error.code === "auth/invalid-email") {
//         setError("Invalid email address");
//       } else if (error.code === "auth/weak-password") {
//         setError("Password is too weak");
//       } else {
//         setError("Failed to create account. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neon-darker flex items-center justify-center p-4">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow -top-20 -right-20"></div>
//         <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow -bottom-20 -left-20"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-6xl font-bold neon-text mb-2">NeonChat</h1>
//           <p className="text-neon-purple text-lg">Join the Future</p>
//         </div>

//         <div className="glass-effect rounded-2xl p-8 shadow-neon">
//           <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

//           {error && (
//             <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-neon-purple text-sm font-medium mb-2">
//                 Display Name
//               </label>
//               <div className="relative">
//                 <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-purple" />
//                 <input
//                   type="text"
//                   name="displayName"
//                   value={formData.displayName}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-purple/30 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-neon transition-all"
//                   placeholder="Enter your name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-neon-purple text-sm font-medium mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-purple" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-purple/30 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-neon transition-all"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-neon-purple text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-purple" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-purple/30 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-neon transition-all"
//                   placeholder="Create a password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-blue transition-colors"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-neon-purple text-sm font-medium mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-purple" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-neon-dark/50 border border-neon-purple/30 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-neon transition-all"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-blue transition-colors"
//                 >
//                   {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-neon-strong text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Creating account...
//                 </span>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-400">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-neon-purple hover:text-neon-blue font-semibold transition-colors"
//               >
//                 Login
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, displayName);
      toast.success("Welcome to Nexora!");
      navigate("/chat");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else {
        toast.error(error.message || "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-[#0A0E1A] via-[#141B2D] to-[#1E2A42] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Glass Card - with max height and scroll */}
      <div className="glass-effect rounded-2xl sm:rounded-3xl w-full max-w-md max-h-[95vh] overflow-y-auto p-5 sm:p-8 md:p-10 animate-fadeIn relative z-10 shadow-neon-strong card-hover">
        {/* Title - more compact */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2 animate-fadeIn">
            <span className="neon-text">Nexora</span>
            <span className="text-white"> Chat</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Join the future of messaging by AK
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 pr-10 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-[var(--text-primary)] text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)]/50 focus:border-[var(--accent-cyan)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 pr-10 text-sm sm:text-base text-[var(--text-primary)] focus:outline-none focus:neon-glow transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] transition-all duration-200 hover:scale-110"
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? (
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
            className="w-full gradient-btn btn-3d text-white font-bold py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg hover:shadow-neon-strong mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">
                  Creating account...
                </span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="mt-4 sm:mt-5 text-center">
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="neon-text font-semibold hover:underline transition-all duration-200 hover:brightness-125"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
