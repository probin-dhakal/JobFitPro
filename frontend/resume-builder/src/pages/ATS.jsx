import React, { useState, useEffect } from "react";

const ATS = ({ analysisResult, onBack }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const parseATSResult = (resultText) => {
    const lines = resultText.split('\n');
    let score = 0;
    let issues = [];
    let suggestions = [];
    let currentSection = '';
    
    for (let line of lines) {
      line = line.trim();
      
      if (line.startsWith('ATS Score:')) {
        const scoreMatch = line.match(/(\d+)\/100/);
        if (scoreMatch) {
          score = parseInt(scoreMatch[1]);
        }
      } else if (line.startsWith('Issues Identified:')) {
        currentSection = 'issues';
      } else if (line.startsWith('Suggestions to Improve:')) {
        currentSection = 'suggestions';
      } else if (line.startsWith('- **') && currentSection === 'issues') {
        const cleanedIssue = line.replace(/^- \*\*(.*?)\*\*: /, '').replace(/- \*\*(.*?)\*\*/, '$1');
        const title = line.match(/\*\*(.*?)\*\*/)?.[1] || '';
        issues.push({
          title: title,
          description: cleanedIssue
        });
      } else if (line.match(/^\d+\./) && currentSection === 'suggestions') {
        const cleanedSuggestion = line.replace(/^\d+\.\s*\*\*(.*?)\*\*: /, '').replace(/^\d+\.\s*\*\*(.*?)\*\*/, '$1');
        const title = line.match(/\*\*(.*?)\*\*/)?.[1] || '';
        suggestions.push({
          title: title,
          description: cleanedSuggestion
        });
      }
    }
    
    return { score, issues, suggestions };
  };

  const { score, issues, suggestions } = parseATSResult(analysisResult.result);

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
      setShowDetails(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  // Helper functions
  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-green-600';
    if (score >= 60) return 'from-amber-400 to-orange-500';
    return 'from-red-400 to-rose-600';
  };

  const getScoreCategory = (score) => {
    if (score >= 80) return { 
      label: 'Excellent', 
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      icon: '🎯',
      message: 'Your resume is well-optimized for ATS systems!'
    };
    if (score >= 60) return { 
      label: 'Good', 
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      icon: '📈',
      message: 'Good foundation, but room for improvement.'
    };
    return { 
      label: 'Needs Work', 
      color: 'text-red-600',
      bg: 'bg-red-50',
      icon: '⚡',
      message: 'Focus on the suggestions below to boost your score.'
    };
  };

  const scoreCategory = getScoreCategory(score);
  const gradient = getScoreGradient(score);

  // Enhanced pie chart with gradient
  const PieChart = ({ score, gradient }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
      <div className="relative w-40 h-40 mx-auto">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={gradient.split(' ')[0].replace('from-', 'stop-')} />
              <stop offset="100%" className={gradient.split(' ')[1].replace('to-', 'stop-')} />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {animatedScore}
          </span>
          <span className="text-xs text-gray-500 font-medium">ATS Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              ATS Analysis Complete
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've analyzed your resume against modern ATS requirements. Here's how to make it even better.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Score Overview Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <span className="text-2xl">{scoreCategory.icon}</span>
                  <span className="text-white font-semibold">{scoreCategory.label}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Your Resume Scores {score}/100
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {scoreCategory.message}
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <PieChart score={score} gradient={gradient} />
                  <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="px-6 py-6 text-center">
              <div className="text-2xl font-bold text-red-500">{issues.length}</div>
              <div className="text-sm text-gray-600 font-medium">Issues Found</div>
            </div>
            <div className="px-6 py-6 text-center">
              <div className="text-2xl font-bold text-green-500">{suggestions.length}</div>
              <div className="text-sm text-gray-600 font-medium">Improvements</div>
            </div>
            <div className="px-6 py-6 text-center">
              <div className="text-2xl font-bold text-blue-500">{Math.round((score/100) * 5 * 10) / 10}</div>
              <div className="text-sm text-gray-600 font-medium">Star Rating</div>
            </div>
          </div>
        </div>

        {/* Issues & Suggestions Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Issues Section */}
          {showDetails && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Issues to Fix</h3>
                  <p className="text-gray-600">Critical problems affecting your ATS score</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-red-100 hover:border-red-200 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: showDetails ? 'slideInLeft 0.6s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                          {issue.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          {showDetails && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Recommended Actions</h3>
                  <p className="text-gray-600">Steps to improve your ATS compatibility</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-green-100 hover:border-green-200 transition-all duration-300"
                    style={{
                      animationDelay: `${(index + issues.length) * 150}ms`,
                      animation: showDetails ? 'slideInRight 0.6s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {suggestion.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Optimize Your Resume?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Implement these suggestions to boost your ATS score and increase your chances of landing interviews.
          </p>
          <button 
            onClick={onBack}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Upload New Resume
          </button>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default ATS;