"use client";

import { useEffect } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

const features = [
  { icon: 'fas fa-link', title: 'Custom Domains', description: 'Connect your own domain for a fully branded experience.' },
  { icon: 'fas fa-edit', title: 'Real-Time Editor', description: 'See your changes live as you make them.' },
  { icon: 'fas fa-hand-pointer', title: 'Drag & Drop Blocks', description: 'Easily customize your page layout with intuitive controls.' },
  { icon: 'fas fa-palette', title: 'Themes & Templates', description: 'Choose from a variety of pre-designed themes to get started quickly.' },
  { icon: 'fas fa-chart-line', title: 'Analytics Dashboard', description: 'Track your link performance and gain insights into your audience.' },
  { icon: 'fas fa-rocket', title: 'Performance & CDN', description: 'Blazing fast load times with our global content delivery network.' },
  { icon: 'fas fa-shield-alt', title: 'Security', description: 'All pages are secured with 256-bit SSL encryption.' },
];

const FeaturesPageContent = () => {
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

  return (
        <div className="bg-background">

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why LinkNest? Everything You Need to Convert Clicks.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              A powerful suite of tools designed to help you grow your audience and business.
            </p>
          </div>
        </section>

        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="feature-card bg-card border rounded-2xl shadow-sm p-8 text-center transition-all duration-500 hover:scale-105">
                  <i className={`${feature.icon} text-4xl text-primary mb-4`}></i>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <FeaturesPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
