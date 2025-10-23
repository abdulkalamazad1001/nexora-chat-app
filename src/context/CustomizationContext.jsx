import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const CustomizationContext = createContext();

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error(
      "useCustomization must be used within CustomizationProvider"
    );
  }
  return context;
};

// 🎨 All Available Themes
export const colorThemes = {
  1: {
    name: "Deep Blue",
    gradient: "from-[#1E3A8A] via-[#3B82F6] to-[#6366F1]",
    text: "#F5F3FF",
    time: "rgba(224, 231, 255, 0.8)",
    check: "#E0E7FF",
    lock: "text-[#E0E7FF]/70",
    shadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
    icon: "#3B82F6",
  },
  2: {
    name: "Teal Emerald",
    gradient: "from-[#0D9488] via-[#14B8A6] to-[#10B981]",
    text: "#F0FDFA",
    time: "rgba(204, 251, 241, 0.75)",
    check: "#CCFBF1",
    lock: "text-[#CCFBF1]/70",
    shadow: "0 4px 16px rgba(20, 184, 166, 0.25)",
    icon: "#14B8A6",
  },
  3: {
    name: "Purple Magenta",
    gradient: "from-[#7C3AED] via-[#A855F7] to-[#EC4899]",
    text: "#FFF7ED",
    time: "rgba(254, 243, 199, 0.8)",
    check: "#FEF3C7",
    lock: "text-[#FEF3C7]/70",
    shadow: "0 4px 16px rgba(168, 85, 247, 0.3)",
    icon: "#A855F7",
  },
  4: {
    name: "Sunset Orange",
    gradient: "from-[#EA580C] via-[#F97316] to-[#FB923C]",
    text: "#FFF7ED",
    time: "rgba(255, 237, 213, 0.8)",
    check: "#FFEDD5",
    lock: "text-[#FFEDD5]/70",
    shadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
    icon: "#F97316",
  },
  5: {
    name: "Rose Gold",
    gradient: "from-[#BE185D] via-[#EC4899] to-[#F472B6]",
    text: "#FDF2F8",
    time: "rgba(252, 231, 243, 0.8)",
    check: "#FCE7F3",
    lock: "text-[#FCE7F3]/70",
    shadow: "0 4px 16px rgba(236, 72, 153, 0.3)",
    icon: "#EC4899",
  },
  6: {
    name: "Forest Green",
    gradient: "from-[#047857] via-[#059669] to-[#10B981]",
    text: "#F0FDF4",
    time: "rgba(209, 250, 229, 0.8)",
    check: "#D1FAE5",
    lock: "text-[#D1FAE5]/70",
    shadow: "0 4px 16px rgba(5, 150, 105, 0.25)",
    icon: "#059669",
  },
  7: {
    name: "Electric Purple",
    gradient: "from-[#6B21A8] via-[#9333EA] to-[#A855F7]",
    text: "#FAF5FF",
    time: "rgba(243, 232, 255, 0.8)",
    check: "#F3E8FF",
    lock: "text-[#F3E8FF]/70",
    shadow: "0 4px 16px rgba(147, 51, 234, 0.35)",
    icon: "#9333EA",
  },
  8: {
    name: "Midnight Blue",
    gradient: "from-[#0C4A6E] via-[#0369A1] to-[#0284C7]",
    text: "#F0F9FF",
    time: "rgba(224, 242, 254, 0.8)",
    check: "#E0F2FE",
    lock: "text-[#E0F2FE]/70",
    shadow: "0 4px 16px rgba(3, 105, 161, 0.3)",
    icon: "#0369A1",
  },
};

// 🖼️ Background Options
export const backgrounds = {
  default: {
    name: "Default Dark",
    type: "solid",
    value: "linear-gradient(135deg, #0A0E1A 0%, #141B2D 50%, #1E2A42 100%)",
  },
  geometric: {
    name: "Geometric",
    type: "pattern",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4FF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), linear-gradient(135deg, #0A0E1A 0%, #141B2D 100%)",
  },
  dots: {
    name: "Dots",
    type: "pattern",
    value:
      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300D4FF' fill-opacity='0.08' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\"), linear-gradient(135deg, #0A0E1A 0%, #1E2A42 100%)",
  },
  waves: {
    name: "Waves",
    type: "pattern",
    value:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50' stroke='%2300D4FF' stroke-opacity='0.1' stroke-width='2' fill='none'/%3E%3Cpath d='M0 70 Q 25 50, 50 70 T 100 70' stroke='%237B2FF7' stroke-opacity='0.08' stroke-width='2' fill='none'/%3E%3C/svg%3E\"), linear-gradient(135deg, #0A0E1A 0%, #1E2A42 100%)",
  },
  gradient1: {
    name: "Cyan Purple",
    type: "gradient",
    value:
      "linear-gradient(135deg, #0A1929 0%, #1A2332 25%, #2D1B69 75%, #4C1D95 100%)",
  },
  gradient2: {
    name: "Blue Navy",
    type: "gradient",
    value: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
  },
  gradient3: {
    name: "Teal Dark",
    type: "gradient",
    value: "linear-gradient(135deg, #042F2E 0%, #134E4A 50%, #115E59 100%)",
  },
  custom: {
    name: "Custom Photo",
    type: "custom",
    value: null, // Will be set dynamically
  },
};

export const CustomizationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [chatTheme, setChatTheme] = useState(7);
  const [chatBackground, setChatBackground] = useState("default");
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user preferences from Firebase
  useEffect(() => {
    const loadPreferences = async () => {
      if (!currentUser) return;

      try {
        const docRef = doc(db, "userPreferences", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setChatTheme(data.chatTheme || 7);
          setChatBackground(data.chatBackground || "default");
          setCustomBackgroundUrl(data.customBackgroundUrl || null);
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [currentUser]);

  // Save preferences to Firebase
  const savePreferences = async (theme, background, customUrl = null) => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, "userPreferences", currentUser.uid);
      await setDoc(
        docRef,
        {
          chatTheme: theme,
          chatBackground: background,
          customBackgroundUrl: customUrl,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const updateTheme = (themeId) => {
    setChatTheme(themeId);
    savePreferences(themeId, chatBackground, customBackgroundUrl);
  };

  const updateBackground = (backgroundId) => {
    setChatBackground(backgroundId);
    savePreferences(chatTheme, backgroundId, customBackgroundUrl);
  };

  const updateCustomBackground = (url) => {
    setCustomBackgroundUrl(url);
    setChatBackground("custom");
    savePreferences(chatTheme, "custom", url);
  };

  const deleteCustomBackground = () => {
    setCustomBackgroundUrl(null);
    setChatBackground("default");
    savePreferences(chatTheme, "default", null);
  };

  const value = {
    chatTheme,
    chatBackground,
    customBackgroundUrl,
    updateTheme,
    updateBackground,
    updateCustomBackground,
    deleteCustomBackground,
    loading,
    colorThemes,
    backgrounds,
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
};
