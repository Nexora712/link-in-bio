"use client";

import React, { useEffect } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import styles from './pricing.module.css';

const CheckIcon = () => (
  <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const pricingPlans = [
  {
    name: 'Free',
    price: '₹0',
    pricePeriod: '/month',
    description: 'For individuals getting started.',
    features: [
      '1 active link-in-bio page',
      '3–5 templates',
      'Basic analytics (clicks only)',
      'LinkNest branding (footer)',
    ],
    cta: 'Start Free',
    dataPlan: 'free',
  },
  {
    name: 'Pro',
    price: '₹199',
    pricePeriod: '/month',
    description: 'For creators ready to level up.',
    features: [
      'Unlimited pages',
      'All templates unlocked',
      'No branding',
      'Advanced analytics (clicks, geo, device)',
      'Export to HTML',
      'Early access to new features',
    ],
    cta: 'Upgrade to Pro',
    dataPlan: 'pro',
  },
  {
    name: 'Creator',
    price: '₹499',
    pricePeriod: '/month',
    description: 'For power users and businesses.',
    features: [
      'All Pro features',
      'Custom domain support',
      'AI-based template generator',
      'Link scheduling & conditional logic',
      'Priority support',
    ],
    cta: 'Become a Creator',
    dataPlan: 'creator',
    isPopular: true,
  },
];

const PricingPageContent = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.fadeIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div id="pricing" className="bg-background">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">Choose the plan that's right for you</h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        Start for free and scale up as you grow. All plans include our core features and world-class support.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-4">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border bg-card text-card-foreground shadow-sm p-6 transition-all duration-300 hover:shadow-md ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}
            data-plan={plan.dataPlan}
          >
            {plan.isPopular && (
              <div className="inline-block mb-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-semibold text-foreground">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {plan.price} <span className="text-base font-normal text-muted-foreground">{plan.pricePeriod}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <PricingPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
