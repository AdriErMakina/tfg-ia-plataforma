import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext.jsx';

function ResultCard({ result, onSaveToFavorites }) {
  const { translations } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const resultRef = useRef(null);

  // Copy to clipboard function
  const handleCopyToClipboard = () => {
    const content = `
${result.name}

${result.description}

${result.brief || ''}
    `.trim();
    
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Save to favorites function
  const handleSaveToFavorites = () => {
    onSaveToFavorites();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Download as text file function
  const handleDownload = () => {
    const content = `
# ${result.name}

## Description
${result.description}

${result.brief ? `## Technical Brief\n${result.brief}` : ''}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.name.replace(/\s+/g, '-').toLowerCase()}-concept.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={resultRef} className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {translations.resultTitle}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopyToClipboard}
            className={`p-2 rounded-full ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition duration-150`}
            title={translations.copyToClipboard}
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={handleSaveToFavorites}
            className={`p-2 rounded-full ${saved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition duration-150`}
            title={translations.saveToFavorites}
          >
            {saved ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414 4.95 4.95z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-150"
            title={translations.download}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">
          {result.name}
        </h3>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {result.description}
        </p>
      </div>

      {result.brief && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {translations.technicalBrief}
          </h4>
          <p className="text-gray-700 whitespace-pre-line">
            {result.brief}
          </p>
        </div>
      )}

      {result.imageUrl && (
        <div className="rounded-xl overflow-hidden mb-6">
          <img 
            src={result.imageUrl} 
            alt={result.name}
            className="w-full h-auto object-cover"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            {translations.aiGeneratedImage}
          </p>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition duration-200"
        >
          {translations.newConcept}
        </button>
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  result: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    brief: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired,
  onSaveToFavorites: PropTypes.func.isRequired
};

export default ResultCard;