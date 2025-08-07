import React, { useContext, useState } from "react";
import '../pdfWorker';
import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import axios from "axios";
import ATS from "./ATS";

// Enhanced Analysis Loading Skeleton Component - Full Screen Version
const AnalysisLoadingSkeleton = ({ stage }) => {
  const stages = [
    { 
      id: 'parsing', 
      label: 'Parsing Resume', 
      description: 'Extracting text and analyzing document structure...',
      icon: '📄',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      id: 'analyzing', 
      label: 'ATS Analysis', 
      description: 'Checking compatibility with applicant tracking systems...',
      icon: '🔍',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 'complete', 
      label: 'Generating Report', 
      description: 'Compiling your personalized insights and recommendations...',
      icon: '✨',
      color: 'from-green-400 to-green-600'
    }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);
  const currentStage = stages[currentStageIndex];
  const progressPercentage = (currentStageIndex / (stages.length - 1)) * 100;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Analyzing Your Resume
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            We're carefully reviewing your resume to provide the best feedback
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 w-full">
            <div 
              className={`h-full bg-gradient-to-r ${currentStage.color} transition-all duration-1000 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            {/* Current Stage Indicator */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${currentStage.color} text-white shadow-lg`}>
                {currentStage?.icon}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  STEP {currentStageIndex + 1} OF {stages.length}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {currentStage?.label}
                </h2>
                <p className="text-gray-600 sm:text-lg">
                  {currentStage?.description}
                </p>
              </div>
            </div>

            {/* Animated Visualization */}
            <div className="relative mb-8">
              <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                {/* Document simulation */}
                <div className="absolute inset-4 sm:inset-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Document header */}
                  <div className="h-4 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Document content animation */}
                  <div className="p-4">
                    {stage === 'parsing' && (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-8 bg-gray-100 rounded mt-4 w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    )}
                    
                    {stage === 'analyzing' && (
                      <div className="grid grid-cols-3 gap-4 animate-pulse">
                        <div className="space-y-2">
                          <div className="h-3 bg-blue-100 rounded w-full"></div>
                          <div className="h-3 bg-blue-100 rounded w-3/4"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-purple-100 rounded w-full"></div>
                          <div className="h-3 bg-purple-100 rounded w-1/2"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-green-100 rounded w-full"></div>
                          <div className="h-3 bg-green-100 rounded w-5/6"></div>
                        </div>
                        <div className="col-span-3 h-16 bg-gray-100 rounded-lg mt-2"></div>
                        <div className="col-span-2 h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    )}
                    
                    {stage === 'complete' && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="relative">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="absolute -inset-2 border-4 border-green-200 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-center">
                          <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Floating elements */}
                {stage === 'parsing' && (
                  <>
                    <div className="absolute top-8 right-8 w-8 h-8 bg-blue-100 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-12 left-10 w-6 h-6 bg-blue-50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </>
                )}
                
                {stage === 'analyzing' && (
                  <>
                    <div className="absolute top-10 left-1/2 w-12 h-12 bg-purple-100 rounded-lg animate-pulse opacity-80"></div>
                    <div className="absolute bottom-8 right-8 w-10 h-10 bg-purple-50 rounded-full animate-ping"></div>
                  </>
                )}
              </div>
            </div>

            {/* Stage Timeline */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                {stages.map((stageItem, index) => {
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  const isUpcoming = index > currentStageIndex;
                  
                  return (
                    <div key={stageItem.id} className="flex flex-col items-center relative z-10 w-1/3 px-2">
                      {/* Connector line */}
                      {index > 0 && (
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                          <div 
                            className={`h-full bg-gradient-to-r ${stages[index-1].color} transition-all duration-1000 ease-out`}
                            style={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                          ></div>
                        </div>
                      )}
                      
                      {/* Step indicator */}
                      <div className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3
                        border-3 transition-all duration-300
                        ${isCompleted 
                          ? `bg-gradient-to-br ${stageItem.color} text-white scale-110 shadow-md`
                          : isCurrent
                          ? `bg-white border-4 ${stageItem.color.replace('to', 'border-to').replace('from', 'border-from')} scale-110 shadow-lg`
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                        }
                      `}>
                        {isCompleted ? (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-sm sm:text-base font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Step label */}
                      <div className={`text-center transition-all duration-300 ${
                        isCurrent ? 'opacity-100' : 'opacity-60'
                      }`}>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                          {stageItem.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Message */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className={`w-5 h-5 ${currentStage.color.replace('to', 'text-to').replace('from', 'text-from')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm sm:text-base text-gray-700">
                    {stage === 'parsing' && 'Extracting text content and identifying sections...'}
                    {stage === 'analyzing' && 'Comparing your resume against thousands of job descriptions...'}
                    {stage === 'complete' && 'Finalizing your personalized recommendations...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className={`w-12 h-12 border-4 border-transparent border-t-${currentStage.color.split(' ')[1]} rounded-full animate-spin`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-4 h-4 bg-${currentStage.color.split(' ')[1]} rounded-full animate-pulse`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This usually takes less than a minute. Please don't close this window.</p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-opacity {
          animation: pulse-opacity 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const LandingPage = () => {
  const BASE_URL = "http://localhost:8000";
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openATSModal, setOpenATSModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [isPDFParsed, setIsPDFParsed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parseError, setParseError] = useState("");
  
  // New states for ATS results
  const [showATSResults, setShowATSResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisStage, setAnalysisStage] = useState('');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const handleATSCheck = () => {
    setOpenATSModal(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // PDF parsing function using PDF.js
  const parsePDFText = async (file) => {
    try {
      setIsParsingPDF(true);
      setParseError("");
      
      // Dynamically import PDF.js
      const pdfjsLib = await import('pdfjs-dist/webpack');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      let fullText = '';
      
      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      if (fullText.trim().length === 0) {
        throw new Error('No text found in PDF. The PDF might be image-based or corrupted.');
      }
      
      setResumeText(fullText.trim());
      setIsPDFParsed(true);
      
    } catch (error) {
      console.error('PDF parsing error:', error);
      setParseError(error.message || 'Failed to parse PDF. Please try again with a different file.');
      setIsPDFParsed(false);
      setResumeText("");
    } finally {
      setIsParsingPDF(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        setIsPDFParsed(false);
        setResumeText("");
        setParseError("");
        await parsePDFText(file);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsPDFParsed(false);
      setResumeText("");
      setParseError("");
      await parsePDFText(file);
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleATSAnalysis = async () => {
    if (!uploadedFile || !isPDFParsed || !resumeText) {
      alert('Please upload and wait for resume parsing to complete.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisStage('parsing');

      // Simulate parsing stage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAnalysisStage('analyzing');

      const response = await axios.post(`${BASE_URL}/api/ats/ats-score`, {
        resumeText: resumeText,
      });

      // console.log('ATS Analysis Result:', response.data);
      
      setAnalysisResult(response.data);
      setAnalysisStage('complete');
      
      // Show results page after a brief delay
      setTimeout(() => {
        setShowATSResults(true);
        setOpenATSModal(false);
      }, 1000);

    } catch (error) {
      console.error('ATS Analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
      setAnalysisStage('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackFromResults = () => {
    setShowATSResults(false);
    setAnalysisResult(null);
    setAnalysisStage('');
    resetATSModal();
  };

  const resetATSModal = () => {
    setOpenATSModal(false);
    setUploadedFile(null);
    setDragOver(false);
    setResumeText("");
    setIsPDFParsed(false);
    setIsParsingPDF(false);
    setParseError("");
    setIsAnalyzing(false);
    setAnalysisStage('');
  };

  const removeFile = () => {
    setUploadedFile(null);
    setResumeText("");
    setIsPDFParsed(false);
    setParseError("");
  };

  // If showing ATS results, render the ATS component
  if (showATSResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ATS 
          analysisResult={analysisResult} 
          onBack={handleBackFromResults} 
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header - Mobile Optimized */}
        <header className="flex justify-between items-center mb-12 sm:mb-20">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            JobFitPro
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-white text-xs sm:text-sm font-semibold text-gray-700 px-4 sm:px-8 py-2 sm:py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
              onClick={() => setOpenAuthModal(true)}
            >
              <span className="hidden sm:inline">Login / Sign Up</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}
        </header>

        {/* Hero Content - Mobile Responsive */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          <div className="w-full lg:w-1/2 mb-4 sm:mb-8 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight text-gray-900">
              <span className="block mb-1 sm:mb-2">Build Your</span>
              <span className="block text-gray-800">
                Perfect Resume
              </span>
              <span className="block text-lg sm:text-xl lg:text-2xl font-normal mt-3 sm:mt-4 text-gray-600">
                Professional. Fast. Effective.
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Create professional resumes that get noticed by hiring managers. 
              Clean design, smart formatting, instant results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <button
                className="bg-gray-900 text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={handleCTA}
              >
                Get Started Free
              </button>
              <button
                className="bg-blue-600 text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={handleATSCheck}
              >
                Check ATS
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 max-w-md sm:max-w-lg lg:max-w-none">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features Section - Mobile Optimized */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Features That Make You Stand Out
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need to create a resume that gets results
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">Smart Editing</h3>
              <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                Edit with confidence using our intelligent editor with live preview 
                and instant formatting suggestions.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 5l4 4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">Professional Templates</h3>
              <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                Choose from professionally crafted templates designed to 
                impress recruiters and hiring managers.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center sm:text-left">Instant Export</h3>
              <p className="text-gray-600 leading-relaxed text-center sm:text-left">
                Download your polished resume as a high-quality PDF with 
                perfect formatting in just one click.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-200 text-gray-600 text-center py-6 sm:py-8 mt-16 sm:mt-24">
        <p className="text-xs sm:text-sm font-medium">
          Made with <span className="text-red-500">❤️</span> by Probin
        </p>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="max-h-[90vh] overflow-y-auto">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>

      {/* Enhanced ATS Check Modal */}
      <Modal
        isOpen={openATSModal}
        onClose={resetATSModal}
        hideHeader={true}
        className="max-w-2xl"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 sm:px-8 py-6 sm:py-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-white opacity-5 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">ATS Resume Checker</h2>
                    <p className="text-blue-100 text-sm mt-1">Get instant feedback on your resume</p>
                  </div>
                </div>
                <button
                  onClick={resetATSModal}
                  className="text-white hover:text-blue-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <span>Professional Insights</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Upload Section */}
            <div
              className={`
                relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center 
                transition-all duration-300 transform hover:scale-[1.02] cursor-pointer
                ${dragOver
                  ? 'border-blue-400 bg-blue-50 shadow-lg scale-105'
                  : uploadedFile && isPDFParsed
                  ? 'border-green-400 bg-green-50 shadow-md'
                  : uploadedFile && isParsingPDF
                  ? 'border-yellow-400 bg-yellow-50 shadow-md'
                  : uploadedFile && parseError
                  ? 'border-red-400 bg-red-50 shadow-md'
                  : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !uploadedFile && document.getElementById('resume-upload').click()}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-30 rounded-2xl"></div>
              
              {uploadedFile ? (
                <div className="relative z-10">
                  {isParsingPDF ? (
                    <div className="animate-fadeIn">
                      <div className="relative inline-block mb-6">
                        <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Processing Your Resume
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Please wait while we extract and analyze your resume content...
                      </p>
                      <div className="max-w-xs mx-auto">
                        <p className="text-sm text-gray-500 truncate bg-white px-3 py-2 rounded-lg border">
                          📄 {uploadedFile.name}
                        </p>
                      </div>
                    </div>
                  ) : isPDFParsed ? (
                    <div className="animate-fadeIn">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-3">
                        Resume Successfully Processed! ✨
                      </h3>
                      <div className="bg-white border border-green-200 rounded-xl p-4 mb-4 max-w-sm mx-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900 text-sm truncate max-w-40">
                                {uploadedFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={removeFile}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 max-w-md mx-auto">
                        <p className="text-sm text-green-700 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {resumeText.length.toLocaleString()} characters extracted successfully
                        </p>
                      </div>
                    </div>
                  ) : parseError ? (
                    <div className="animate-fadeIn">
                      <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-red-800 mb-3">
                        Processing Failed
                      </h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 max-w-md mx-auto">
                        <p className="text-sm text-red-700">
                          {parseError}
                        </p>
                      </div>
                      <button
                        onClick={removeFile}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Try Another File
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-6 transform hover:scale-110 transition-transform">
                    {dragOver ? (
                      <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {dragOver ? 'Drop your resume here!' : 'Upload Your Resume'}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                        {dragOver 
                          ? 'Release to upload your PDF resume'
                          : 'Drag & drop your PDF resume or click to browse files'
                        }
                      </p>
                    </div>

                    {!dragOver && (
                      <div className="space-y-4">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="resume-upload"
                        />
                        <button
                          type="button"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Choose PDF File
                        </button>
                        
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Secure & Private</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Instant Analysis</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Floating upload hints */}
              {!uploadedFile && !dragOver && (
                <div className="absolute top-4 right-4 opacity-60">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={resetATSModal}
                disabled={isAnalyzing}
                className={`flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 ${
                  isAnalyzing 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-105'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleATSAnalysis}
                disabled={!uploadedFile || !isPDFParsed || isParsingPDF || isAnalyzing}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
                  uploadedFile && isPDFParsed && !isParsingPDF && !isAnalyzing
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>Start ATS Analysis</span>
                  </>
                )}
              </button>
            </div>

            {/* Show analysis progress */}
            {isAnalyzing && analysisStage && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <AnalysisLoadingSkeleton stage={analysisStage} />
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
          0%, 100% { transform: translateX(-100%); opacity: 0.3; }
          50% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slideIn {
          animation: slideIn 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;