import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TariffPage from './components/TariffPage';
import CalculatorPage from './components/CalculatorPage';

type Page = 'tariffs' | 'calculator';

const getCurrentPage = (): Page => {
    const hash = window.location.hash.replace('#/', '');
    if (hash === 'calculator') {
        return 'calculator';
    }
    return 'tariffs'; // Default page
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getCurrentPage());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-4 border-b border-gray-700/50">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center sm:text-left">
              AeroDesk
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-1 text-center sm:text-left">Tariff Plan & Cost Calculator by Evolyx</p>
          </div>
          <Navigation currentPage={currentPage} />
        </header>

        <main>
          {currentPage === 'tariffs' && <TariffPage />}
          {currentPage === 'calculator' && <CalculatorPage />}
        </main>
        
        <footer className="text-center mt-16 pt-8 border-t border-gray-700/50">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Evolyx. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;