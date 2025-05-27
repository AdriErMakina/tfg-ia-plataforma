import { useLanguage } from '../contexts/LanguageContext.jsx';

function Footer() {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                &copy; {currentYear} {translations.footerCopyright}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {translations.footerDisclaimer}
              </p>
            </div>

            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                {translations.privacyPolicy}
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                {translations.termsOfService}
              </a>
              <a 
                href="#about" 
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                {translations.about}
              </a>
            </div>
          </div>

          <div id="about" className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {translations.aboutTitle}
            </h3>
            <p className="text-gray-600">
              {translations.aboutDescription}
            </p>
            <p className="text-gray-600 mt-3">
              {translations.aboutEducational}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;