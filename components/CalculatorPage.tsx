import React from 'react';
import { CalculatorIcon } from './Icons';
import PricingSection from './PricingSection';
import CostCalculator from './CostCalculator';

const CalculatorPage: React.FC = () => {
    return (
        <div className="space-y-16">
             <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100">Cost Calculator</h2>
                <p className="text-lg text-gray-400 mt-2">Estimate your usage costs by providing your data below.</p>
            </div>
            <PricingSection title="Interactive Calculator" icon={<CalculatorIcon />}>
                <CostCalculator />
            </PricingSection>
        </div>
    );
};

export default CalculatorPage;
