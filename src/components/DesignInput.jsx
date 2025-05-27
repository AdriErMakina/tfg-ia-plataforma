import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { generateDesignConcept } from '../utils/aiService.jsx';

function DesignInput({ 
  designIdea,
  setDesignIdea,
  clearForm,
  setGeneratedResult,
  setIsLoading,
  setHistory
}) {
  const { translations } = useLanguage();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (designIdea.trim().length < 5) {
      setError(translations.inputTooShort);
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await generateDesignConcept(designIdea);
      
      setGeneratedResult(result);
      
      // Add to history
      setHistory(prev => [result, ...prev].slice(0, 20)); // Limit to 20 items
    } catch (err) {
      console.error('Error generating design concept:', err);
      setError(translations.generationError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {translations.inputTitle}
      </h2>
      
      <p className="text-gray-600 text-center mb-6">
        {translations.inputDescription}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="designIdea" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {translations.designIdeaLabel}
          </label>
          <textarea
            id="designIdea"
            value={designIdea}
            onChange={(e) => setDesignIdea(e.target.value)}
            placeholder={translations.designIdeaPlaceholder}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 resize-none transition duration-200"
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={clearForm}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition duration-200"
          >
            {translations.clearButton}
          </button>
          
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition duration-200 flex items-center justify-center"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            {translations.generateButton}
          </button>
        </div>
      </form>
    </div>
  );
}

DesignInput.propTypes = {
  designIdea: PropTypes.string.isRequired,
  setDesignIdea: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  setGeneratedResult: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired
};

export default DesignInput;