import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import privacyContent from './content/privacy.md?raw'
import termsContent from './content/terms.md?raw'
import readmeContent from './content/readme.md?raw'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderContent = () => {
    switch (currentPage) {
      case 'privacy':
        return <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{privacyContent}</ReactMarkdown>
      case 'terms':
        return <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{termsContent}</ReactMarkdown>
      case 'home':
      default:
        return <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{readmeContent}</ReactMarkdown>
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => setCurrentPage('home')}>
            ✈️ Aerodesk
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <button
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${currentPage === 'privacy' ? 'active' : ''}`}
                onClick={() => setCurrentPage('privacy')}
              >
                Privacy Policy
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${currentPage === 'terms' ? 'active' : ''}`}
                onClick={() => setCurrentPage('terms')}
              >
                Terms of Use
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {renderContent()}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Aerodesk Development Team. All rights reserved.</p>
      </footer>
    </div>
  )
}
