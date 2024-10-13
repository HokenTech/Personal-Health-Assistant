import React, { useState } from 'react';
import { Activity, Brain, MessageCircle } from 'lucide-react';
import SymptomChecker from './components/SymptomChecker';
import Recommendations from './components/Recommendations';
import VirtualHealthCoach from './components/VirtualHealthCoach';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symptom' | 'recommendations' | 'coach'>('symptom');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Personal Health Assistant</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            {['symptom', 'recommendations', 'coach'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 px-6 text-center transition-colors duration-200 ${
                  activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab === 'symptom' && <Activity className="inline-block mr-2" />}
                {tab === 'recommendations' && <Brain className="inline-block mr-2" />}
                {tab === 'coach' && <MessageCircle className="inline-block mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'symptom' && <SymptomChecker />}
            {activeTab === 'recommendations' && <Recommendations />}
            {activeTab === 'coach' && <VirtualHealthCoach />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;