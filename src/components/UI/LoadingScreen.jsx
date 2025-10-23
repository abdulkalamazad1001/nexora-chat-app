import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade out after reaching 100%
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0A0E1A] via-[#141B2D] to-[#1E2A42] transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Animated Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center animate-fadeIn">
        {/* Nexora Logo */}
        <div className="relative mb-8 inline-block">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto animate-float">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>

            {/* Hexagon Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-2xl"
                >
                  <defs>
                    <linearGradient
                      id="hexGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#00E5FF", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#A855F7", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#EC4899", stopOpacity: 1 }}
                      />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <polygon
                    points="50,5 90,25 90,75 50,95 10,75 10,25"
                    fill="url(#hexGradient)"
                    className="animate-pulse-slow"
                    filter="url(#glow)"
                  />
                </svg>

                {/* Center Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="text-5xl sm:text-6xl font-black text-white drop-shadow-2xl animate-pulse-slow"
                      style={{
                        textShadow:
                          "0 0 30px rgba(0, 229, 255, 0.8), 0 0 60px rgba(168, 85, 247, 0.6)",
                      }}
                    >
                      ✕
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce-slow">
                      ⚡
                    </div>
                  </div>
                </div>

                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl animate-spin-slow"></div>
              </div>
            </div>

            {/* Pulsing Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
            <div
              className="absolute inset-4 rounded-full border border-purple-400/20 animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
          Nexora
        </h1>

        <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-8">
          Welcome to the future by AK
        </p>

        {/* Loading Bar */}
        <div className="max-w-xs mx-auto mb-4 px-4">
          <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
              }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-[var(--text-tertiary)] text-xs animate-pulse">
          Loading {progress}%
        </p>

        {/* Decorative Dots */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-pink-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
