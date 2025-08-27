export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  // For use inside the app with Tailwind
  styles: {
    background: string;
    container: string;
    text: {
      primary: string;
      secondary: string;
    };
    button: {
      primary: string;
      hover: string;
    };
    avatar: {
      border: string;
      background: string;
    };
  };
  // For raw CSS export
  exportStyles: {
    background: string;
    text: {
      primary: string;
      secondary: string;
    };
    button: {
      primary: string;
    };
    css: string;
    mobileCss: string;
  };
}

// IMPORTANT: Do NOT import new-themes at module top-level to avoid bundling all heavy themes
// import { newThemes } from './new-themes'  <-- removed to enable lazy loading

export const themeConfigs: Record<string, ThemeConfig> = {
  anime: {
    id: "anime",
    name: "Anime",
    description: "Vibrant anime-inspired design",
    styles: {
      background: "bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600",
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-white/80"
      },
      button: {
        primary: "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300"
      },
      avatar: {
        border: "border-white/30",
        background: "bg-white/20"
      }
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #f9a8d4, #a78bfa, #4f46e5)",
      text: { primary: "#ffffff", secondary: "#e5e7eb" },
      button: { primary: "rgba(255, 255, 255, 0.2)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #f9a8d4, #a78bfa, #4f46e5); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: #e5e7eb; font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  krishna: {
    id: "krishna",
    name: "Krishna / Spiritual",
    description: "Peaceful spiritual vibes",
    styles: {
      background: "bg-gradient-to-br from-orange-300 via-yellow-400 to-amber-500",
      container: "bg-white/20 backdrop-blur-md border border-orange-200/30",
      text: {
        primary: "text-orange-900 font-semibold",
        secondary: "text-orange-800/80"
      },
      button: {
        primary: "bg-white/30 hover:bg-white/40 text-orange-900 border border-orange-300/40 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300"
      },
      avatar: {
        border: "border-orange-300/40",
        background: "bg-white/30"
      }
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #fdba74, #facc15, #f59e0b)",
      text: { primary: "#9a3412", secondary: "#b45309" },
      button: { primary: "rgba(255, 255, 255, 0.3)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #fdba74, #facc15, #f59e0b); color: #9a3412; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,197,128,0.3); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,197,128,0.4); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.3); color: #9a3412; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,197,128,0.4); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: #b45309; font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  minimal: {
    id: "minimal",
    name: "Minimal / Dark",
    description: "Clean and modern",
    styles: {
      background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
      container: "bg-gray-800/50 backdrop-blur-md border border-gray-700/50",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-gray-300"
      },
      button: {
        primary: "bg-gray-700/50 hover:bg-gray-600/60 text-white border border-gray-600/50 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300"
      },
      avatar: {
        border: "border-gray-600/50",
        background: "bg-gray-700/50"
      }
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #111827, #1f2937, #000000)",
      text: { primary: "#ffffff", secondary: "#d1d5db" },
      button: { primary: "rgba(55, 65, 81, 0.5)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #111827, #1f2937, #000000); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(31,41,55,0.5); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(55,65,81,0.5); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(55,65,81,0.5); }
        .link { display: block; background-color: rgba(55, 65, 81, 0.5); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(55,65,81,0.5); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: #d1d5db; font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design",
    styles: {
      background: "bg-gradient-to-br from-blue-500 to-purple-600",
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-white/80",
      },
      button: {
        primary:
          "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-white/30",
        background: "bg-white/20",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
      text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.2)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #3b82f6, #8b5cf6); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(255, 255, 255, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  nature: {
    id: "nature",
    name: "Nature",
    description: "Fresh and organic feel",
    styles: {
      background: "bg-gradient-to-br from-green-400 to-blue-500",
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-white/80",
      },
      button: {
        primary:
          "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-white/30",
        background: "bg-white/20",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #4ade80, #3b82f6)",
      text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.2)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #4ade80, #3b82f6); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(255, 255, 255, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    description: "Warm and vibrant colors",
    styles: {
      background: "bg-gradient-to-br from-pink-500 to-red-500",
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-white/80",
      },
      button: {
        primary:
          "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-white/30",
        background: "bg-white/20",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #ec4899, #ef4444)",
      text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.2)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #ec4899, #ef4444); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(255, 255, 255, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  dark: {
    id: "dark",
    name: "Dark",
    description: "Sleek and modern dark theme",
    styles: {
      background: "bg-gradient-to-br from-gray-800 to-gray-900",
      container: "bg-gray-800/50 backdrop-blur-md border border-gray-700/50",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-gray-300",
      },
      button: {
        primary:
          "bg-gray-700/50 hover:bg-gray-600/60 text-white border border-gray-600/50 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-gray-600/50",
        background: "bg-gray-700/50",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #374151, #111827)",
      text: { primary: "#ffffff", secondary: "#d1d5db" },
      button: { primary: "rgba(55, 65, 81, 0.5)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #374151, #111827); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(31,41,55,0.5); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(55,65,81,0.5); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(55,65,81,0.5); }
        .link { display: block; background-color: rgba(55, 65, 81, 0.5); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(55,65,81,0.5); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: #d1d5db; font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  "ocean-breeze": {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Cool and refreshing like a sea breeze",
    styles: {
      background: "bg-gradient-to-br from-cyan-200 to-blue-400",
      container: "bg-white/20 backdrop-blur-md border border-cyan-200/30",
      text: {
        primary: "text-cyan-900 font-semibold",
        secondary: "text-cyan-800/80",
      },
      button: {
        primary:
          "bg-white/30 hover:bg-white/40 text-cyan-900 border border-cyan-300/40 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-cyan-300/40",
        background: "bg-white/30",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #a5f3fc, #60a5fa)",
      text: { primary: "#164e63", secondary: "rgba(22, 78, 99, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.3)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #a5f3fc, #60a5fa); color: #164e63; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(165,243,252,0.3); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(165,243,252,0.4); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.3); color: #164e63; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(165,243,252,0.4); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(22, 78, 99, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  "sunset-glow": {
    id: "sunset-glow",
    name: "Sunset Glow",
    description: "Warm and inviting, like a sunset",
    styles: {
      background: "bg-gradient-to-br from-red-400 to-orange-500",
      container: "bg-white/20 backdrop-blur-md border border-red-200/30",
      text: {
        primary: "text-red-900 font-semibold",
        secondary: "text-red-800/80",
      },
      button: {
        primary:
          "bg-white/30 hover:bg-white/40 text-red-900 border border-red-300/40 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-red-300/40",
        background: "bg-white/30",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #f87171, #f97316)",
      text: { primary: "#7f1d1d", secondary: "rgba(127, 29, 29, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.3)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #f87171, #f97316); color: #7f1d1d; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(252,165,165,0.3); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(252,165,165,0.4); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.3); color: #7f1d1d; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(252,165,165,0.4); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(127, 29, 29, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  "forest-hike": {
    id: "forest-hike",
    name: "Forest Hike",
    description: "Earthy and natural tones",
    styles: {
      background: "bg-gradient-to-br from-green-400 to-teal-600",
      container: "bg-white/20 backdrop-blur-md border border-green-200/30",
      text: {
        primary: "text-green-900 font-semibold",
        secondary: "text-green-800/80",
      },
      button: {
        primary:
          "bg-white/30 hover:bg-white/40 text-green-900 border border-green-300/40 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300",
      },
      avatar: {
        border: "border-green-300/40",
        background: "bg-white/30",
      },
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #4ade80, #14b8a6)",
      text: { primary: "#14532d", secondary: "rgba(20, 83, 45, 0.8)" },
      button: { primary: "rgba(255, 255, 255, 0.3)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #4ade80, #14b8a6); color: #14532d; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(107,235,162,0.3); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(107,235,162,0.4); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.3); color: #14532d; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(107,235,162,0.4); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(20, 83, 45, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  },
  // DO NOT spread newThemes to prevent eager import. The heavy themes are now referenced via lazy loader helpers.
};

themeConfigs['minimal-glassmorphism'] = {
  id: "minimal-glassmorphism",
  name: "Minimal Glassmorphism",
  description: "Minimal glassmorphism design",
  styles: {
    background: "bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500",
    container: "bg-white/10 backdrop-blur-md border border-white/20",
    text: {
      primary: "text-white font-semibold",
      secondary: "text-white/80"
    },
    button: {
      primary: "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
      hover: "hover:scale-105 transition-all duration-300"
    },
    avatar: {
      border: "border-white/30",
      background: "bg-white/20"
    }
  },
  exportStyles: {
    background: "linear-gradient(to bottom right, #a855f7, #d946ef, #3b82f6)",
    text: { primary: "#ffffff", secondary: "#e5e7eb" },
    button: { primary: "rgba(255, 255, 255, 0.2)" },
    css: `
      html, body { margin: 0; min-height: 100vh; }
      body { font-family: sans-serif; background: linear-gradient(to bottom right, #a855f7, #d946ef, #3b82f6); color: #ffffff; }
      .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
      .profile-header { text-align: center; margin-bottom: 40px; }
      .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
      .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
      .link:hover { transform: scale(1.05); }
      .social-links { text-align: center; margin-top: 20px; }
      .social-icon { margin: 0 10px; text-decoration: none; color: rgba(255, 255, 255, 0.8); font-size: 24px; }
    `,
    mobileCss: ""
  }
};

export const getThemeConfig = (themeId: string): ThemeConfig => {
  return themeConfigs[themeId] || themeConfigs.minimal;
};

// BEGIN: single async loader definitions (remove any duplicates below)
// END: single async loader definitions

/**
 * Async loader registry for heavy themes (single declaration).
 * We declare it once to avoid duplicate identifier errors.
 */
/* Removed duplicate async loader block (kept the one at lines ~442-453) */

type ThemeLoader = () => Promise<ThemeConfig>;
const themeLoaders: Record<string, ThemeLoader> = {
'geometric-constellation': async () => (await import('./new-themes')).newThemes['geometric-constellation'],
'paper-craft-origami': async () => (await import('./new-themes')).newThemes['paper-craft-origami'],
'liquid-morphing-blobs': async () => (await import('./new-themes')).newThemes['liquid-morphing-blobs'],
'isometric-world': async () => (await import('./new-themes')).newThemes['isometric-world'],
'glassmorphism-professional': async () => (await import('./new-themes')).newThemes['glassmorphism-professional'],
'neon-cyberpunk': async () => (await import('./new-themes')).newThemes['neon-cyberpunk'],
'minimalist-luxury': async () => (await import('./new-themes')).newThemes['minimalist-luxury'],
'retro-gaming': async () => (await import('./new-themes')).newThemes['retro-gaming'],
'creative-portfolio': async () => (await import('./new-themes')).newThemes['creative-portfolio'],
};


themeLoaders['minimal-glassmorphism'] = async () => {
  // Return the theme config for minimal-glassmorphism
  return {
    id: "minimal-glassmorphism",
    name: "Minimal Glassmorphism",
    description: "Minimal glassmorphism design",
    styles: {
      background: "bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500",
      container: "bg-white/10 backdrop-blur-md border border-white/20",
      text: {
        primary: "text-white font-semibold",
        secondary: "text-white/80"
      },
      button: {
        primary: "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm",
        hover: "hover:scale-105 transition-all duration-300"
      },
      avatar: {
        border: "border-white/30",
        background: "bg-white/20"
      }
    },
    exportStyles: {
      background: "linear-gradient(to bottom right, #a855f7, #d946ef, #3b82f6)",
      text: { primary: "#ffffff", secondary: "#e5e7eb" },
      button: { primary: "rgba(255, 255, 255, 0.2)" },
      css: `
        html, body { margin: 0; min-height: 100vh; }
        body { font-family: sans-serif; background: linear-gradient(to bottom right, #a855f7, #d946ef, #3b82f6); color: #ffffff; }
        .container { max-width: 680px; margin: 40px auto; padding: 20px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .profile-header { text-align: center; margin-bottom: 40px; }
        .profile-image { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid rgba(255,255,255,0.3); }
        .link { display: block; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 15px 20px; margin-bottom: 15px; text-align: center; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }
        .link:hover { transform: scale(1.05); }
        .social-links { text-align: center; margin-top: 20px; }
        .social-icon { margin: 0 10px; text-decoration: none; color: rgba(255, 255, 255, 0.8); font-size: 24px; }
      `,
      mobileCss: ""
    }
  };
};

/**
 * Async getter to fetch a single theme lazily (single declaration).
 */
export const getThemeConfigAsync = async (themeId: string): Promise<ThemeConfig> => {
  // Use in-file/light theme if exists
  if (themeConfigs[themeId]) return themeConfigs[themeId];
  const loader = themeLoaders[themeId];
  if (loader) {
    try {
      return await loader();
    } catch {
      return themeConfigs.minimal;
    }
  }
  return themeConfigs.minimal;
};

// Single async loader registry (ensure only one declaration exists)
/* Removed duplicate async loader block (kept the one starting at line 442) */

// Single async getter (ensure only one declaration exists)
/* Removed duplicate getThemeConfigAsync (kept the one at line 458) */
