import React from 'react';

interface NavigationProps {
  currentPage: 'tariffs' | 'calculator';
}

const NavLink: React.FC<{ href: string; active: boolean; children: React.ReactNode }> = ({ href, active, children }) => {
  const activeClasses = 'text-white border-b-2 border-blue-500';
  const inactiveClasses = 'text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-500';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Manually set the hash to trigger the hashchange event listener in App.tsx
    window.location.hash = href;
  };
  
  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-1 py-2 text-lg font-medium transition-colors duration-200 cursor-pointer ${active ? activeClasses : inactiveClasses}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </a>
  );
};

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  return (
    <nav className="flex justify-center mt-4 sm:mt-0">
      <div className="flex space-x-6 md:space-x-8">
        <NavLink href="#/tariffs" active={currentPage === 'tariffs'}>
          Tariff Plans
        </NavLink>
        <NavLink href="#/calculator" active={currentPage === 'calculator'}>
          Cost Calculator
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;