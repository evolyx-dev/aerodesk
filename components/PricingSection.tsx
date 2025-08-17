
import React from 'react';

interface PricingSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const PricingSection: React.FC<PricingSectionProps> = ({ title, icon, children }) => {
  return (
    <section>
      <div className="flex items-center justify-center mb-6">
        <div className="text-blue-400 mr-3">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default PricingSection;
