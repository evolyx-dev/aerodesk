import React, { useState, useEffect, useCallback } from 'react';
import { UploadIcon } from './Icons';

type Tariff = 'standard' | 'himalayan';

const CostCalculator: React.FC = () => {
  const [tariff, setTariff] = useState<Tariff>('himalayan');
  const [duration, setDuration] = useState<number>(0);
  const [workers, setWorkers] = useState<number>(1);
  const [additionalDevices, setAdditionalDevices] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [fileError, setFileError] = useState<string>('');

  const RATE = 0.029;

  const calculateCost = useCallback(() => {
    let totalCost = 0;
    if (duration > 0) {
      if (tariff === 'standard') {
        totalCost = duration * workers * RATE;
      } else if (tariff === 'himalayan') {
        // 1 primary device + additional devices (assuming 1 worker stream per device for calculation)
        const totalDeviceStreams = 1 + additionalDevices;
        totalCost = duration * totalDeviceStreams * RATE;
      }
    }
    setCost(totalCost);
  }, [duration, workers, additionalDevices, tariff]);

  useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError('');
    if (!file) return;

    if (file.type !== 'text/csv') {
      setFileError('Please upload a valid .csv file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.trim().split(/\r?\n/).slice(1); // Split by line and remove header
        let totalDuration = 0;
        
        if (lines.length === 0) {
          setFileError('CSV file is empty or has no data rows.');
          return;
        }

        lines.forEach((line, index) => {
          const columns = line.split(',');
          // Assuming duration is the second column (index 1)
          if (columns.length > 1) {
            const durationValue = parseInt(columns[1], 10);
            if (!isNaN(durationValue)) {
              totalDuration += durationValue;
            } else {
              throw new Error(`Invalid duration value on row ${index + 2}.`);
            }
          }
        });
        setDuration(totalDuration);
      } catch (error) {
        if(error instanceof Error) {
           setFileError(`Error parsing CSV: ${error.message}`);
        } else {
           setFileError('An unknown error occurred while parsing the file.');
        }
        setDuration(0);
      }
    };
    reader.onerror = () => {
        setFileError('Failed to read the file.');
    };
    reader.readAsText(file);
    // Reset the file input so the same file can be re-uploaded
    event.target.value = '';
  };

  const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );

  const InputField: React.FC<{ label: string; value: number; onChange: (val: number) => void; min?: number }> = ({ label, value, onChange, min = 0 }) => (
      <div>
          <label htmlFor={label} className="block text-sm font-medium text-gray-400">{label}</label>
          <input
              type="number"
              id={label}
              value={value}
              onChange={(e) => onChange(Math.max(min, parseInt(e.target.value, 10) || 0))}
              min={min}
              className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
      </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="text-xl font-semibold text-gray-100 mb-4 sm:mb-0">Estimate Your Cost</h3>
          <div className="flex space-x-2 p-1 bg-gray-900 rounded-lg">
              <TabButton active={tariff === 'standard'} onClick={() => setTariff('standard')}>Standard</TabButton>
              <TabButton active={tariff === 'himalayan'} onClick={() => setTariff('himalayan')}>AeroDesk Special</TabButton>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
              <h4 className="text-lg font-medium text-blue-400">Manual Input</h4>
              <InputField label="Total Duration (seconds)" value={duration} onChange={setDuration} />
              {tariff === 'standard' && (
                  <InputField label="Number of Workers" value={workers} onChange={setWorkers} min={1}/>
              )}
              {tariff === 'himalayan' && (
                  <InputField label="Number of Additional Devices" value={additionalDevices} onChange={setAdditionalDevices}/>
              )}
          </div>
          <div className="space-y-4">
               <h4 className="text-lg font-medium text-purple-400">Upload Usage Log</h4>
              <div>
                  <label htmlFor="csv-upload" className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors">
                      <UploadIcon />
                      <span>Upload .csv</span>
                  </label>
                  <input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                  <p className="text-xs text-gray-500 mt-2">
                      CSV format: one record per line, with duration in the second column (e.g., `2025-08-13,35010`). Header will be skipped.
                  </p>
                  {fileError && <p className="text-xs text-red-400 mt-2">{fileError}</p>}
              </div>
          </div>
      </div>
      
      <div className="border-t border-gray-700 my-6"></div>

      <div className="bg-gray-900/50 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-lg font-medium text-gray-300 mb-2 md:mb-0">Estimated Cost</p>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {cost.toLocaleString('en-US', { style: 'currency', currency: 'NPR', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
      </div>
    </div>
  );
};

export default CostCalculator;