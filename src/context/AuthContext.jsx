// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { auth, db } from "../config/firebase";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Signup
//   const signup = async (email, password, displayName) => {
//     try {
//       setLoading(true);
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await updateProfile(userCredential.user, {
//         displayName: displayName,
//         photoURL: null,
//       });

//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         uid: userCredential.user.uid,
//         email: email,
//         displayName: displayName,
//         photoURL: null,
//         bio: "Hey there! I'm using NeonChat",
//         createdAt: serverTimestamp(),
//         isOnline: true,
//         lastSeen: serverTimestamp(),
//         friends: [],
//         pendingRequests: [],
//         sentRequests: [],
//         blockedUsers: [],
//       });

//       return userCredential.user;
//     } catch (error) {
//       console.error("Signup error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login
//   const login = async (email, password) => {
//     try {
//       setLoading(true);
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Update online status
//       await updateDoc(doc(db, "users", userCredential.user.uid), {
//         isOnline: true,
//         lastSeen: serverTimestamp(),
//       });

//       return userCredential.user;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout
//   const logout = async () => {
//     try {
//       if (currentUser) {
//         await updateDoc(doc(db, "users", currentUser.uid), {
//           isOnline: false,
//           lastSeen: serverTimestamp(),
//         });
//       }
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout error:", error);
//       throw error;
//     }
//   };

//   // Listen to auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // Get user data from Firestore
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setCurrentUser({
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName || userData.displayName,
//             photoURL: user.photoURL || userData.photoURL,
//             bio: userData.bio,
//           });
//         } else {
//           setCurrentUser(user);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   // Update online status on window close
//   useEffect(() => {
//     const handleBeforeUnload = async () => {
//       if (currentUser) {
//         await updateDoc(doc(db, "users", currentUser.uid), {
//           isOnline: false,
//           lastSeen: serverTimestamp(),
//         });
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [currentUser]);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email/password
  const signup = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, { displayName });

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName,
        photoURL: result.user.photoURL || null,
        createdAt: serverTimestamp(),
        isOnline: true,
        lastSeen: serverTimestamp(),
        blockedUsers: [],
      });

      toast.success("Account created successfully!");
      return result.user;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Set user as online
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
        lastSeen: serverTimestamp(),
      });

      toast.success("Logged in successfully!");
      return result.user;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Login with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userDoc = await getDoc(doc(db, "users", result.user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: serverTimestamp(),
          isOnline: true,
          lastSeen: serverTimestamp(),
          blockedUsers: [],
        });
      } else {
        await updateDoc(doc(db, "users", result.user.uid), {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      }

      toast.success("Signed in with Google!");
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          isOnline: false,
          lastSeen: serverTimestamp(),
        });
      }
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Set user as online when they authenticate
        try {
          await updateDoc(doc(db, "users", user.uid), {
            isOnline: true,
            lastSeen: serverTimestamp(),
          });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time presence tracking
  useEffect(() => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);

    // Set user as online
    const setOnline = async () => {
      try {
        await updateDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error setting online:", error);
      }
    };

    // Set user as offline
    const setOffline = async () => {
      try {
        await updateDoc(userRef, {
          isOnline: false,
          lastSeen: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error setting offline:", error);
      }
    };

    setOnline();

    // Update lastSeen every 30 seconds while user is active
    const interval = setInterval(async () => {
      try {
        await updateDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error updating lastSeen:", error);
      }
    }, 30000);

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOffline();
      } else {
        setOnline();
      }
    };

    // Handle page close/refresh
    const handleBeforeUnload = () => {
      setOffline();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      setOffline();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
