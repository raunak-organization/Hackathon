'use client';

import React, { useState } from 'react';
import { PricingCard } from './PricingCard';

export function PaymentPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams and hobbyists.',
      price: isAnnual ? '0' : '0',
      features: [
        'Up to 3 Users',
        '1GB Storage',
        'Community Support',
        'Basic Analytics',
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Pro',
      description: 'Ideal for growing businesses and professionals.',
      price: isAnnual ? '29' : '39',
      features: [
        'Up to 10 Users',
        '50GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Domains',
      ],
      buttonText: 'Start Free Trial',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale organizations with advanced needs.',
      price: isAnnual ? '99' : '129',
      features: [
        'Unlimited Users',
        '500GB Storage',
        '24/7 Dedicated Support',
        'Custom Integrations',
        'SLA Guarantee',
      ],
      buttonText: 'Contact Sales',
      isPopular: false,
    },
  ];

  return (
    <>
      <div className="paymentContainer">
        <div className="header">
          <h1 className="title">Simple, transparent pricing</h1>
          <p className="subtitle">
            Choose the plan that fits your needs. No hidden fees, cancel
            anytime.
          </p>

          <div className="toggleContainer">
            <span className={`toggleLabel ${!isAnnual ? 'activeLabel' : ''}`}>
              Monthly
            </span>
            <button
              className="toggle"
              onClick={() => setIsAnnual(!isAnnual)}
              aria-pressed={isAnnual}
            >
              <span
                className={`toggleThumb ${isAnnual ? 'thumbAnnual' : ''}`}
              />
            </button>
            <span className={`toggleLabel ${isAnnual ? 'activeLabel' : ''}`}>
              Annually <span className="saveBadge">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="pricingGrid">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .paymentContainer {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .header {
          text-align: center;
          margin-bottom: 4rem;
          animation: slideDown 0.5s ease-out;
        }
        .title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }
        .subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }
        .toggleContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .toggleLabel {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .activeLabel {
          color: var(--text-primary);
        }
        .saveBadge {
          background-color: rgba(16, 185, 129, 0.15);
          color: var(--accent-green);
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-weight: 600;
        }
        .toggle {
          width: 60px;
          height: 32px;
          background-color: var(--bg-tertiary);
          border-radius: 100px;
          border: 1px solid var(--border);
          position: relative;
          transition: var(--transition);
          cursor: pointer;
        }
        .toggleThumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 24px;
          height: 24px;
          background-color: var(--text-primary);
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .thumbAnnual {
          transform: translateX(28px);
        }
        .pricingGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          align-items: center;
        }
        .cardWrapper {
          position: relative;
          height: 100%;
          animation: slideUp 0.6s ease-out backwards;
        }
        .cardWrapper:nth-child(2) {
          animation-delay: 0.1s;
        }
        .cardWrapper:nth-child(3) {
          animation-delay: 0.2s;
        }
        .popularWrapper {
          z-index: 10;
        }
        .popularBadge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--accent-blue), #8b5cf6);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 1rem;
          border-radius: 100px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 11;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
        }
        .pricingCard {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .popularCard {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
          transform: scale(1.03);
        }
        .planName {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }
        .planDesc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: 0 0 1.5rem 0;
          line-height: 1.5;
          min-height: 45px;
        }
        .priceContainer {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .price {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }
        .period {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .billedAnnually {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          min-height: 18px;
        }
        .planBtn {
          margin-bottom: 2.5rem;
        }
        .featuresList {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }
        .featureItem {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .checkIcon {
          color: var(--accent-green);
          flex-shrink: 0;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 1024px) {
          .popularCard {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
