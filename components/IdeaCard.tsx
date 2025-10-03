import React, { useState } from 'react';
import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  index: number;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Handles copying the post caption and hashtags to the clipboard
  const handleCopy = () => {
    if (isCopied) return;

    const textToCopy = `${idea.caption}\n\n${idea.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Show confirmation for 2 seconds
    }).catch(err => {
        console.error("Failed to copy text:", err);
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative h-48 w-full">
        {idea.imageUrl ? (
          <img src={idea.imageUrl} alt={idea.visualSuggestion} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center p-4">
              <p className="text-gray-400 text-center italic">{idea.visualSuggestion}</p>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{idea.ideaTitle}</h3>
        <p className="text-gray-300 mb-4 flex-grow whitespace-pre-wrap text-sm">{idea.caption}</p>
        
        {/* Container for actions at the bottom of the card */}
        <div className="mt-auto">
            <button
              onClick={handleCopy}
              disabled={isCopied}
              className={`w-full text-sm font-bold py-2 px-4 rounded-lg transition-all duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                isCopied
                  ? 'bg-green-600 text-white cursor-default'
                  : 'bg-pink-600 hover:bg-pink-700 text-white focus:ring-pink-500'
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy Post Text'}
            </button>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
              {idea.hashtags.map((tag, i) => (
                <span key={`${tag}-${i}`} className="bg-pink-900/50 text-pink-300 text-xs font-medium px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
