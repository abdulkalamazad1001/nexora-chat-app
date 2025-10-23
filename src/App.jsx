// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import { ChatProvider } from "./context/ChatContext";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import ChatList from "./components/Chat/ChatList";
// import ChatWindow from "./components/Chat/ChatWindow";
// import LoadingScreen from "./components/UI/LoadingScreen";
// import "./App.css";

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { currentUser, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-cyan)] border-t-transparent"></div>
//       </div>
//     );
//   }

//   return currentUser ? children : <Navigate to="/login" />;
// };

// // Public Route Component
// const PublicRoute = ({ children }) => {
//   const { currentUser, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-cyan)] border-t-transparent"></div>
//       </div>
//     );
//   }

//   return currentUser ? <Navigate to="/chat" /> : children;
// };

// // Chat Page Component
// const ChatPage = () => {
//   return (
//     <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
//       <ChatList />
//       <ChatWindow />
//     </div>
//   );
// };

// function AppContent() {
//   return (
//     <>
//       {/* Toast Notifications */}
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: "var(--bg-secondary)",
//             color: "var(--text-primary)",
//             border: "1px solid var(--border-color)",
//             borderRadius: "12px",
//             padding: "16px",
//           },
//           success: {
//             iconTheme: {
//               primary: "var(--accent-cyan)",
//               secondary: "white",
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: "#ef4444",
//               secondary: "white",
//             },
//           },
//         }}
//       />

//       {/* Routes */}
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <Signup />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/chat"
//           element={
//             <ProtectedRoute>
//               <ChatPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<Navigate to="/chat" />} />
//         <Route path="*" element={<Navigate to="/chat" />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   const handleLoadComplete = () => {
//     setIsLoading(false);
//   };

//   return (
//     <Router>
//       <AuthProvider>
//         <ThemeProvider>
//           <ChatProvider>
//             {/* Loading Screen */}
//             {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

//             {/* Main App Content */}
//             {!isLoading && <AppContent />}
//           </ChatProvider>
//         </ThemeProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatProvider } from "./context/ChatContext";
import { CustomizationProvider } from "./context/CustomizationContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ChatList from "./components/Chat/ChatList";
import ChatWindow from "./components/Chat/ChatWindow";
import LoadingScreen from "./components/UI/LoadingScreen";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-cyan)] border-t-transparent"></div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-cyan)] border-t-transparent"></div>
      </div>
    );
  }

  return currentUser ? <Navigate to="/chat" /> : children;
};

// Chat Page Component
const ChatPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      <ChatList />
      <ChatWindow />
    </div>
  );
};

function AppContent() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "var(--accent-cyan)",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <CustomizationProvider>
            <ChatProvider>
              {/* Loading Screen */}
              {isLoading && (
                <LoadingScreen onLoadComplete={handleLoadComplete} />
              )}

              {/* Main App Content */}
              {!isLoading && <AppContent />}
            </ChatProvider>
          </CustomizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
