"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { useRouter } from 'next/navigation';

import { themeConfigs } from "@/lib/themes/theme-mappings";

const templates = Object.values(themeConfigs).map((theme) => ({
  ...theme,
  category: "All",
}));

const TemplatesPageContent = () => {
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  const filteredTemplates =
    filter === "All"
      ? templates
      : templates.filter((t) => t.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.fade-in').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const useTemplate = useCallback((themeId: string) => {
    try {
      // Persist for builder consumption as fallback
      localStorage.setItem('selected-theme', themeId);
    } catch {}
    router.push(`/builder?theme=${encodeURIComponent(themeId)}`);
  }, [router]);

  return (
        <div className="bg-gray-50">

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pick a Look That Suits You
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Choose from our professionally designed templates to get started in seconds.
            </p>
            <div className="flex justify-center space-x-4">
              {['All', 'Minimal', 'Dark', 'Bold', 'Personal'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <div key={index} className="template-card group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <div
                      className={`w-full h-64 ${template.styles.background}`}
                    />
                    <div className="preview-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="bg-white text-gray-900 py-2 px-4 rounded-lg font-medium"
                        onClick={() => useTemplate(template.id)}
                      >
                        Use This Template
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

const TemplatesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <TemplatesPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default TemplatesPage;
