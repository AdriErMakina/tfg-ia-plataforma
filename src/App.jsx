import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import DesignInput from './components/DesignInput.jsx';
import ResultCard from './components/ResultCard.jsx';
import Footer from './components/Footer.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

function App() {
  const [designIdea, setDesignIdea] = useState("");
  const [generatedResult, setGeneratedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("designFavorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("designHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites and history to localStorage when they change
  useEffect(() => {
    localStorage.setItem("designFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("designHistory", JSON.stringify(history));
  }, [history]);

  const clearForm = () => {
    setDesignIdea("");
    setGeneratedResult(null);
  };

  const handleSaveToFavorites = () => {
    if (generatedResult) {
      setFavorites(prev => [
        { ...generatedResult, id: Date.now().toString() },
        ...prev
      ].slice(0, 20)); // Limit to 20 items
    }
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <DesignInput 
                designIdea={designIdea}
                setDesignIdea={setDesignIdea}
                clearForm={clearForm}
                setGeneratedResult={setGeneratedResult}
                setIsLoading={setIsLoading}
                setHistory={setHistory}
              />
            </div>

            {isLoading && (
              <div className="bg-white rounded-2xl shadow-xl p-6 my-8 flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
                  <p className="mt-4 text-gray-600 font-medium">Generating your design concept...</p>
                </div>
              </div>
            )}

            {generatedResult && !isLoading && (
              <div className="bg-white rounded-2xl shadow-xl p-6 my-8">
                <ResultCard 
                  result={generatedResult} 
                  onSaveToFavorites={handleSaveToFavorites}
                />
              </div>
            )}

            {/* History & Favorites Sections (minimized by default) */}
            {(history.length > 0 || favorites.length > 0) && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
                {/* User would be able to expand these sections */}
                <details className="mb-4">
                  <summary className="font-semibold text-lg cursor-pointer text-indigo-700 hover:text-indigo-500">
                    Recent Design History ({history.length})
                  </summary>
                  <div className="mt-4 space-y-4">
                    {history.slice(0, 5).map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <details>
                  <summary className="font-semibold text-lg cursor-pointer text-indigo-700 hover:text-indigo-500">
                    Saved Favorites ({favorites.length})
                  </summary>
                  <div className="mt-4 space-y-4">
                    {favorites.map((item) => (
                      <div key={item.id} className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{item.description}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromFavorites(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <span className="sr-only">Remove</span>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;