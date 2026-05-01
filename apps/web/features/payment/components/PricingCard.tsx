'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isAnnual?: boolean;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  buttonText,
  isPopular,
  isAnnual,
}: PricingCardProps) {
  return (
    <div className={`cardWrapper ${isPopular ? 'popularWrapper' : ''}`}>
      {isPopular && <div className="popularBadge">Most Popular</div>}

      <Card
        className={`pricingCard ${isPopular ? 'popularCard' : ''}`}
        padding="lg"
      >
        <h3 className="planName">{name}</h3>
        <p className="planDesc">{description}</p>

        <div className="priceContainer">
          <span className="currency">$</span>
          <span className="price">{price}</span>
          <span className="period">/mo</span>
        </div>

        {isAnnual && price !== '0' && (
          <div className="billedAnnually">
            Billed ${parseInt(price) * 12} yearly
          </div>
        )}

        <div className="planBtn">
          <Button
            variant={isPopular ? 'primary' : 'secondary'}
            fullWidth
            size="lg"
          >
            {buttonText}
          </Button>
        </div>

        <div className="featuresList">
          {features.map((feature, idx) => (
            <div key={idx} className="featureItem">
              <Check size={18} className="checkIcon" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
