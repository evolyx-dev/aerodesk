import React from 'react';
import { ChipIcon, SupportIcon, TableIcon } from './Icons';
import PricingSection from './PricingSection';
import TariffCard from './TariffCard';
import SupportCard from './SupportCard';
import UsageExampleTable from './UsageExampleTable';
import type { UsageData } from '../types';

const usageData: UsageData[] = [
  { date: '2025-08-13', duration: 35010, cost: 1015.29 },
  { date: '2025-08-14', duration: 53505, cost: 1551.65 },
  { date: '2025-08-15', duration: 135783, cost: 3937.71 },
];

const TariffPage: React.FC = () => {
    return (
        <div className="space-y-16">
            <div>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-100">Tariff Plans</h2>
                    <p className="text-lg text-gray-400 mt-2">Choose the plan that's right for you.</p>
                </div>
                <div className="space-y-12">
                    <PricingSection title="Worker Usage Tariff" icon={<ChipIcon />}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TariffCard
                            title="Standard Rate"
                            price="0.029"
                            currency="NPR"
                            unit="/ second / worker"
                        />
                        <TariffCard
                            title="AeroDesk Special Tariff"
                            price="0.029"
                            currency="NPR"
                            unit="/ second"
                            description="For the primary device, with unlimited workers."
                            highlight={true}
                        />
                        <TariffCard
                            title="Additional Devices"
                            price="0.029"
                            currency="NPR"
                            unit="/ second / worker"
                            description="For devices beyond the primary one under the AeroDesk Special plan."
                        />
                        </div>
                        <p className="text-center text-gray-400 mt-8 text-sm italic">
                        Note: As the number of devices increases within an organization, the effective per-worker cost decreases due to volume scaling.
                        </p>
                    </PricingSection>

                    <PricingSection title="Support Tariff" icon={<SupportIcon />}>
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        <SupportCard
                            title="Incident-Based Support"
                            price="2,100"
                            currency="NPR"
                            unit="/ hour / developer"
                            features={[
                            "Pay-as-you-go model",
                            "Typical resolution: 4-6 hours",
                            "Usually involves 1-2 developers",
                            "Invoiced post-resolution"
                            ]}
                        />
                        <SupportCard
                            title="Unlimited Monthly Support"
                            price="17,000"
                            currency="NPR"
                            unit="/ month"
                            features={[
                            "Flat monthly fee",
                            "Unlimited incidents covered",
                            "Unlimited fixes included",
                            "Unlimited developer hours"
                            ]}
                            highlight={true}
                        />
                        </div>
                    </PricingSection>
                </div>
            </div>
          
            <div className="border-t border-gray-700/50 my-4"></div>

            <PricingSection title="Example Usage (AeroDesk Special Device)" icon={<TableIcon />}>
                <UsageExampleTable data={usageData} />
            </PricingSection>
        </div>
    );
};

export default TariffPage;