"use client";

import React, { useEffect } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import styles from './pricing.module.css';

const CheckIcon = () => (
  <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
    buttonClass: styles.freeButton,
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
    buttonClass: styles.proButton,
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
    buttonClass: styles.creatorButton,
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
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(`.${styles.fadeIn}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div id="pricing" className={styles.pricingContainer}>
      <h1 className={styles.title}>Choose the plan that's right for you</h1>
      <p className={styles.subtitle}>
        Start for free and scale up as you grow. All plans include our core features and world-class support.
      </p>
      <div className={styles.pricingGrid}>
        {pricingPlans.map((plan) => (
          <div key={plan.name} className={`${styles.pricingCard} ${plan.isPopular ? styles.creatorPlan : ''} transition-all duration-300 hover:scale-105`} data-plan={plan.dataPlan}>
            {plan.isPopular && <div className={styles.popularBadge}>Most Popular</div>}
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.planPrice}>
              {plan.price} <span>{plan.pricePeriod}</span>
            </p>
            <p className={styles.planDescription}>{plan.description}</p>
            <ul className={styles.featureList}>
              {plan.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`${styles.ctaButton} ${plan.buttonClass}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PricingPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
