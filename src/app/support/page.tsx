"use client";

import { useEffect } from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

const faqs = {
  'Getting Started': [
    { q: 'How do I create my first page?', a: 'Simply sign up, choose a template, and start adding your links and content with our drag-and-drop editor.' },
    { q: 'Can I use LinkNest for free?', a: 'Yes, our free plan allows you to create and export your page. Hosting and custom domains are available on our paid plans.' },
  ],
  'Domain Setup': [
    { q: 'How do I connect my custom domain?', a: 'In your dashboard, go to Settings > Domains and follow the instructions to add your domain.' },
    { q: 'Do you provide a domain?', a: 'We provide a `yourname.linknest.io` subdomain on the Basic plan. You can connect your own domain on the Pro plan.' },
  ],
  'Billing & Pricing': [
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards through our secure payment processor, Stripe.' },
    { q: 'How do I upgrade my plan?', a: 'You can upgrade your plan at any time from your account dashboard. The change will be effective immediately.' },
  ],
};

const SupportPageContent = () => {
  useEffect(() => {
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
      acc.addEventListener('click', () => {
        const content = acc.nextElementSibling;
        const icon = acc.querySelector('i');
        if (content && icon) {
          content.classList.toggle('hidden');
          icon.classList.toggle('fa-plus');
          icon.classList.toggle('fa-minus');
        }
      });
    });
  }, []);

  return (
        <div className="bg-background">

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Need Help? We've Got You.
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Find answers to common questions or get in touch with our support team.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {Object.entries(faqs).map(([category, questions]) => (
              <div key={category} className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{category}</h3>
                <div className="space-y-4">
                  {questions.map((faq, index) => (
                    <div key={index} className="bg-card border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="accordion-header flex justify-between items-center p-6 cursor-pointer">
                        <h4 className="font-semibold text-foreground">{faq.q}</h4>
                        <i className="fas fa-plus text-muted-foreground"></i>
                      </div>
                      <div className="accordion-content hidden p-6 border-t border-border">
                        <p className="text-muted-foreground">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        </div>
  );
};

const SupportPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SupportPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
