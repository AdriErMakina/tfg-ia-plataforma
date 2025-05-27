import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function Header() {
  const { language, setLanguage, translations } = useLanguage();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {translations.appName}
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>{translations.language}:</span>
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  language === "en"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  language === "es"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setLanguage("es")}
              >
                ES
              </button>
            </div>
          </div>

          <a
            href="#about"
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            {translations.about}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden w-full mt-4">
            <nav className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span>{translations.language}:</span>
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${
                      language === "en"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${
                      language === "es"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setLanguage("es")}
                  >
                    ES
                  </button>
                </div>
              </div>

              <a
                href="#about"
                className="text-gray-600 hover:text-indigo-600 font-medium text-center py-2 border-b"
              >
                {translations.about}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 font-medium text-center py-2 border-b"
              >
                GitHub
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;