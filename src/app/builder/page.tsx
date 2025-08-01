"use client";

import { useState, useEffect, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { Smartphone, Monitor } from "lucide-react";
import Header from "@/components/common/header";
import dynamic from "next/dynamic";
import { LinkActions } from "@/components/actions/LinkActions";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from "next/navigation";
import type {
  FormData,
  LinkItem as LinkType,
  SocialLink,
} from "@/components/form/link-form";

// Defer loading of heavy preview to client and split bundle
const LinkPreview = dynamic(() => import("@/components/preview/link-preview").then(m => m.LinkPreview), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] rounded-xl border flex items-center justify-center text-sm text-gray-500">
      Loading preview...
    </div>
  ),
});

// Keep form imported normally to allow interaction ASAP
import { LinkBuilderForm } from "@/components/form/link-form";

const BuilderPageContent = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    bio: "",
    avatar: "",
    profileImage: null,
  });
  const [links, setLinks] = useState<LinkType[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [selectedTheme, setSelectedTheme] = useState("minimal");
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const searchParams = useSearchParams();

  // Apply theme from query string first, fallback to localStorage
  useEffect(() => {
    const qpTheme = searchParams?.get("theme");
    if (qpTheme) {
      setSelectedTheme(qpTheme);
      try {
        localStorage.setItem("selected-theme", qpTheme);
      } catch {}
      return;
    }
    try {
      const saved = localStorage.getItem("selected-theme");
      if (saved) setSelectedTheme(saved);
    } catch {}
  }, [searchParams]);

  // Smooth typing latency: defer values passed to preview
  const deferredFormData = useDeferredValue(formData);
  const deferredLinks = useDeferredValue(links);
  const deferredSocial = useDeferredValue(socialLinks);

  // Memoize toggle label
  const toggleLabel = useMemo(
    () => (isMobilePreview ? "Mobile" : "Desktop"),
    [isMobilePreview]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create Your Bio Page
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time preview. Real-time magic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="order-2 xl:order-1">
            <LinkBuilderForm
              formData={formData}
              setFormData={setFormData}
              links={links}
              setLinks={setLinks}
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              onThemeChange={setSelectedTheme}
            />
          </div>
          
          {/* Preview Section */}
          <div className="order-1 xl:order-2">
            <div className="sticky top-24 space-y-3">
              {/* View toggle restored */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobilePreview(false)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm ${!isMobilePreview ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
                  aria-pressed={!isMobilePreview}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobilePreview(true)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm ${isMobilePreview ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
                  aria-pressed={isMobilePreview}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>

              <LinkPreview
                formData={deferredFormData}
                links={deferredLinks}
                socialLinks={deferredSocial}
                selectedTheme={selectedTheme}
                isMobilePreview={isMobilePreview}
              />
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <LinkActions
            formData={formData}
            links={links}
            socialLinks={socialLinks}
            selectedTheme={selectedTheme}
            onCopySuccess={() => console.log("HTML copied successfully")}
            onCopyError={(error: any) => console.error("Copy failed:", error)}
          />
        </div>
      </div>
    </div>
  );
};

export default function BuilderPage() {
  return (
    <ProtectedRoute>
      <BuilderPageContent />
    </ProtectedRoute>
  );
}