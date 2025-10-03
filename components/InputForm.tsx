
import React from 'react';
import { FormData, MARKETING_GOALS, PLATFORMS, TONES, VISUAL_STYLES } from '../types';

interface InputFormProps {
  formData: FormData;
  isLoading: boolean;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputField: React.FC<{ label: string; id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = ({ label, id, name, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
            {label}
        </label>
        <input
            type="text"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
            required
        />
    </div>
);

const TextareaField: React.FC<{ label: string; id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string }> = ({ label, id, name, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
            required
        />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ label, id, name, value, onChange, options }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
            {label}
        </label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
        >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);


const InputForm: React.FC<InputFormProps> = ({ formData, isLoading, onFormChange, onFormSubmit }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
      <form onSubmit={onFormSubmit} className="space-y-6">
        <InputField 
            label="Product / Company Name"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={onFormChange}
            placeholder="e.g., Artisan Coffee Roasters"
        />
        
        <TextareaField
            label="Describe Your Target Audience"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={onFormChange}
            placeholder="e.g., Young professionals, aged 25-35, who appreciate quality and sustainability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField 
                label="Marketing Goal"
                id="marketingGoal"
                name="marketingGoal"
                value={formData.marketingGoal}
                onChange={onFormChange}
                options={MARKETING_GOALS}
            />
            <SelectField
                label="Social Media Platform"
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={onFormChange}
                options={PLATFORMS}
            />
             <SelectField
                label="Tone of Voice"
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={onFormChange}
                options={TONES}
            />
             <SelectField
                label="Visual Style"
                id="visualStyle"
                name="visualStyle"
                value={formData.visualStyle}
                onChange={onFormChange}
                options={VISUAL_STYLES}
            />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-500 font-bold rounded-lg text-md px-5 py-3 text-center transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Ideas'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
