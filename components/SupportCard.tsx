
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface SupportCardProps {
  title: string;
  price: string;
  currency: string;
  unit: string;
  features: string[];
  highlight?: boolean;
}

const SupportCard: React.FC<SupportCardProps> = ({ title, price, currency, unit, features, highlight = false }) => {
  const cardClasses = `
    bg-gray-800 rounded-lg p-6 flex flex-col 
    transform hover:scale-105 transition-transform duration-300
    ${highlight ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/20' : 'border border-gray-700'}
  `;

  return (
    <div className={cardClasses}>
      <h3 className="text-xl font-semibold text-center text-gray-200">{title}</h3>
      <div className="my-4 text-center">
        <span className="text-4xl font-bold text-purple-400">{price}</span>
        <span className="text-lg text-gray-400 ml-1">{currency}</span>
        <p className="text-gray-400 font-medium">{unit}</p>
      </div>
      <ul className="space-y-3 mt-4 text-gray-300">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 text-purple-400 pt-1">
              <CheckCircleIcon />
            </div>
            <span className="ml-3">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportCard;
