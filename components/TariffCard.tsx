
import React from 'react';

interface TariffCardProps {
  title: string;
  price: string;
  currency: string;
  unit: string;
  description?: string;
  highlight?: boolean;
}

const TariffCard: React.FC<TariffCardProps> = ({ title, price, currency, unit, description, highlight = false }) => {
  const cardClasses = `
    bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center
    transform hover:scale-105 transition-transform duration-300
    ${highlight ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20' : 'border border-gray-700'}
  `;

  return (
    <div className={cardClasses}>
      <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
      <div className="my-4">
        <span className="text-4xl font-bold text-blue-400">{price}</span>
        <span className="text-lg text-gray-400 ml-1">{currency}</span>
      </div>
      <p className="text-gray-400 font-medium">{unit}</p>
      {description && <p className="text-sm text-gray-500 mt-4 h-12">{description}</p>}
    </div>
  );
};

export default TariffCard;
