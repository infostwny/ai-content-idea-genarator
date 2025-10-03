
// FIX: Implemented the main App component to orchestrate the UI, manage state, and handle API interactions. This resolves the module and parsing errors by providing the missing application logic.
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import IdeaCard from './components/IdeaCard';
import LoadingSpinner from './components/LoadingSpinner';
import { FormData, Idea, MARKETING_GOALS, PLATFORMS, TONES, VISUAL_STYLES } from './types';
import { generateIdeas } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    targetAudience: '',
    marketingGoal: MARKETING_GOALS[0],
    platform: PLATFORMS[0],
    tone: TONES[0],
    visualStyle: VISUAL_STYLES[0],
  });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIdeas([]);

    try {
      const generatedIdeas = await generateIdeas(formData);
      setIdeas(generatedIdeas);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating ideas.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (ideas.length === 0) return;

    const escapeCSV = (str: string | undefined | null): string => {
        if (str === null || str === undefined) return '""';
        const s = String(str);
        if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
            const escapedStr = s.replace(/"/g, '""');
            return `"${escapedStr}"`;
        }
        return s;
    };

    const headers = ['Title', 'Caption', 'Hashtags', 'Visual Suggestion', 'Image URL'];
    const csvRows = [headers.join(',')];

    ideas.forEach(idea => {
        const row = [
            escapeCSV(idea.ideaTitle),
            escapeCSV(idea.caption),
            escapeCSV(idea.hashtags.join(' ')),
            escapeCSV(idea.visualSuggestion),
            escapeCSV(idea.imageUrl),
        ];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'stw-content-ideas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="mt-12">
          <InputForm
            formData={formData}
            isLoading={isLoading}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
          />

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg max-w-2xl mx-auto">
              <p className="font-bold">Oops! Something went wrong.</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!isLoading && ideas.length > 0 && (
            <section className="mt-12">
               <div className="text-center mb-8 flex flex-wrap justify-center items-center gap-4">
                  <h2 className="text-3xl font-bold tracking-tight">Your AI-Generated Content Ideas</h2>
                  <button
                    onClick={handleExportCSV}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Export as CSV
                  </button>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea, index) => (
                  <IdeaCard key={index} idea={idea} index={index} />
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
