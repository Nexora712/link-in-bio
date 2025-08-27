// Utility functions for performance monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`Performance Entry: ${entry.name}`, entry);
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
    
    // Measure page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          console.log('Page Load Metrics:', {
            DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
            TCP: perfData.connectEnd - perfData.connectStart,
            Request: perfData.responseStart - perfData.requestStart,
            Response: perfData.responseEnd - perfData.responseStart,
            DOM: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            Load: perfData.loadEventEnd - perfData.loadEventStart,
            Total: perfData.loadEventEnd - perfData.startTime
          });
        }
      }, 0);
    });
  }
};

// Utility to preload critical resources
export const preloadResources = () => {
  if (typeof document !== 'undefined') {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    // Add your font URLs here if needed
    
    // Preload critical images
    // Add your critical image URLs here if needed
  }
};

// Utility to optimize images
export const optimizeImage = (src: string, width?: number, quality = 75) => {
  // If using Next.js Image component, this would be handled automatically
  // But we can still provide utility functions for manual optimization
  return src; // In a real implementation, you might add query parameters for optimization
};

interface AnalyticsData {
  profileViews: number;
  linkClicks: number;
  lastUpdated: any; // Use 'any' for serverTimestamp()
}
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

const getAnalyticsDocRef = (userId: string, date: string) => {
  return doc(db, `users/${userId}/analytics/${date}`, "data");
};

export const trackProfileView = async (userId: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const analyticsDocRef = getAnalyticsDocRef(userId, today);

  try {
    const data: AnalyticsData = {
      profileViews: 1,
      linkClicks: 0,
      lastUpdated: serverTimestamp(),
    };
    await setDoc(analyticsDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error tracking profile view:", error);
  }
};

export const trackLinkClick = async (userId: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const analyticsDocRef = getAnalyticsDocRef(userId, today);

  try {
    const data: AnalyticsData = {
      profileViews: 0,
      linkClicks: 1,
      lastUpdated: serverTimestamp(),
    };
    await setDoc(analyticsDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error tracking link click:", error);
  }
};