import React, { useState } from 'react';
import { ChevronRight, Info, Target, Briefcase, Zap } from 'lucide-react';

const MOCK_DB = {
  "Software Engineer": {
    "CTO": [
      { name: "Management Path", color: "blue", steps: [
        { role: "Engineering Manager", skills: ["Team Leadership", "Budgeting"], detail: "Focus on people and delivery." },
        { role: "Director of Eng", skills: ["Strategy", "Cross-functional"], detail: "Managing multiple teams." },
        { role: "VP of Engineering", skills: ["Hiring Strategy", "Operations"], detail: "Scale the org." }
      ]},
      { name: "Technical Path", color: "purple", steps: [
        { role: "Senior Engineer", skills: ["System Design", "Mentorship"], detail: "Mastering the craft." },
        { role: "Software Architect", skills: ["Cloud Infrastructure", "Security"], detail: "High-level technical vision." },
        { role: "Distinguished Engineer", skills: ["Innovation", "R&D"], detail: "Industry-level impact." }
      ]}
    ]
  }
};

export default function CareerApp() {
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [paths, setPaths] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  const handleGenerate = () => {
    // Basic logic: if match exists in DB, show it, otherwise show generic path
    const data = MOCK_DB[current]?.[target] || [
      { name: "Standard Growth", color: "green", steps: [
        { role: `Senior ${current}`, skills: ["Advanced Tooling"], detail: "Deepen current expertise." },
        { role: `Lead ${current}`, skills: ["Project Mgmt"], detail: "Take ownership of outcomes." },
        { role: target, skills: ["Strategic Planning"], detail: "The final milestone." }
      ]}
    ];
    setPaths(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      {/* Header & Input */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Zap className="text-yellow-500" /> PathFinder AI
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            className="border p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none"
            placeholder="Current Role (e.g. Software Engineer)"
            onChange={(e) => setCurrent(e.target.value)}
          />
          <input 
            className="border p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none"
            placeholder="Target Role (e.g. CTO)"
            onChange={(e) => setTarget(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95"
          >
            Generate My Paths
          </button>
        </div>
      </div>

      {/* Visual Flow Area */}
      <div className="max-w-6xl mx-auto space-y-12">
        {paths.map((path, pIdx) => (
          <div key={pIdx} className="relative">
            <h2 className={`text-sm font-black uppercase tracking-widest mb-4 text-${path.color}-600`}>
              Option {pIdx + 1}: {path.name}
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-4 overflow-x-auto pb-4">
              {/* Start Node */}
              <div className="flex-shrink-0 w-48 p-4 bg-slate-800 text-white rounded-xl text-center shadow-lg">
                <p className="text-xs opacity-70">Start</p>
                <p className="font-bold uppercase tracking-tight">{current || "Current"}</p>
              </div>

              {path.steps.map((step, sIdx) => (
                <React.Fragment key={sIdx}>
                  <ChevronRight className="hidden md:block text-slate-300" />
                  <div 
                    onClick={() => setSelectedStep(step)}
                    className="flex-shrink-0 w-56 p-4 bg-white border-2 border-dashed border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer rounded-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">STEP {sIdx + 1}</span>
                      <Info size={14} className="text-slate-300 group-hover:text-blue-500" />
                    </div>
                    <p className="font-bold text-slate-800">{step.role}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {step.skills.slice(0, 2).map(s => (
                        <span key={s} className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full border border-blue-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <ChevronRight className="hidden md:block text-slate-300" />
              {/* Goal Node */}
              <div className="flex-shrink-0 w-48 p-4 bg-green-500 text-white rounded-xl text-center shadow-lg">
                <Target size={16} className="mx-auto mb-1" />
                <p className="font-bold uppercase tracking-tight">{target || "Goal"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedStep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedStep.role}</h3>
            <p className="text-slate-600 mb-6 italic">"{selectedStep.detail}"</p>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase text-slate-400 tracking-wider">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStep.skills.map(skill => (
                  <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setSelectedStep(null)}
              className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}