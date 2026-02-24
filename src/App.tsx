import React, { useState } from 'react';
import { Leaf, RefreshCw, Info, History, Settings, ChevronLeft, Loader2, Sparkles, BookOpen, Users, BarChart3 } from 'lucide-react';
import { WasteAnalysisInput, AnalysisResult, WasteType, WasteColor, WasteSmell, UserStats } from './types';
import { analyzeWaste } from './services/geminiService';
import { ImageCapture } from './components/ImageCapture';
import { VoiceRecorder } from './components/VoiceRecorder';
import { AnalysisResultView } from './components/AnalysisResultView';
import { GuideLibrary } from './components/GuideLibrary';
import { AboutUs } from './components/AboutUs';
import { StatsView } from './components/StatsView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'analysis' | 'library' | 'about' | 'stats'>('analysis');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('smart_compost_stats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      totalAnalyses: 0,
      compostableCount: 0,
      needsImprovementCount: 0,
      notCompostableCount: 0
    };
  });
  const [input, setInput] = useState<WasteAnalysisInput>({
    type: 'vegetables',
    color: 'green',
    smell: 'natural',
    days: 0,
    image: '',
    voiceDescription: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeWaste(input);
      setResult(analysisResult);
      
      // Update stats
      const newStats = {
        ...stats,
        totalAnalyses: stats.totalAnalyses + 1,
        points: analysisResult.status === 'compostable' ? stats.points + 1 : stats.points,
        compostableCount: analysisResult.status === 'compostable' ? stats.compostableCount + 1 : stats.compostableCount,
        needsImprovementCount: analysisResult.status === 'needs_improvement' ? stats.needsImprovementCount + 1 : stats.needsImprovementCount,
        notCompostableCount: analysisResult.status === 'not_compostable' ? stats.notCompostableCount + 1 : stats.notCompostableCount,
      };
      setStats(newStats);
      localStorage.setItem('smart_compost_stats', JSON.stringify(newStats));
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("عذراً، حدث خطأ أثناء التحليل. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setInput({
      type: 'vegetables',
      color: 'green',
      smell: 'natural',
      days: 0,
      image: '',
      voiceDescription: ''
    });
  };

  return (
    <div className="min-h-screen pb-12 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-eco-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-eco-500 rounded-xl text-white">
              <Leaf size={24} />
            </div>
            <h1 className="text-xl font-bold text-eco-900">سماد ذكي</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('library')}
              className={`p-2 rounded-full transition-colors flex items-center gap-2 ${view === 'library' ? 'bg-eco-500 text-white' : 'text-eco-600 hover:bg-eco-50'}`}
              title="المكتبة الإرشادية"
            >
              <BookOpen size={20} />
              <span className="text-sm font-bold hidden sm:inline">المكتبة</span>
            </button>
            <button 
              onClick={() => setView('about')}
              className={`p-2 rounded-full transition-colors flex items-center gap-2 ${view === 'about' ? 'bg-eco-500 text-white' : 'text-eco-600 hover:bg-eco-50'}`}
              title="من نحن"
            >
              <Users size={20} />
              <span className="text-sm font-bold hidden sm:inline">من نحن</span>
            </button>
            <button 
              onClick={() => setView('stats')}
              className={`p-2 rounded-full transition-colors flex items-center gap-2 ${view === 'stats' ? 'bg-eco-500 text-white' : 'text-eco-600 hover:bg-eco-50'}`}
              title="الإحصائيات"
            >
              <BarChart3 size={20} />
              <span className="text-sm font-bold hidden sm:inline">الإحصائيات</span>
            </button>
            <button className="p-2 text-eco-600 hover:bg-eco-50 rounded-full transition-colors">
              <Info size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {view === 'library' ? (
            <GuideLibrary key="library" onBack={() => setView('analysis')} />
          ) : view === 'about' ? (
            <AboutUs key="about" onBack={() => setView('analysis')} />
          ) : view === 'stats' ? (
            <StatsView key="stats" stats={stats} onBack={() => setView('analysis')} />
          ) : !result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <section className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">حلل نفاياتك العضوية</h2>
                <p className="text-gray-600">ساعد البيئة وحول بقايا طعامك إلى ذهب أسود (سماد عضوي)</p>
              </section>

              {/* Form Section */}
              <div className="glass-card p-6 rounded-3xl shadow-xl shadow-eco-900/5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Waste Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">نوع النفايات</label>
                    <select
                      value={input.type}
                      onChange={(e) => setInput({ ...input, type: e.target.value as WasteType })}
                      className="w-full p-3 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-eco-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="vegetables">خضروات</option>
                      <option value="fruits">فواكه</option>
                      <option value="cooked">بقايا طعام مطبوخ</option>
                      <option value="leaves">أوراق أشجار</option>
                      <option value="coffee">بقايا قهوة/شاي</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">اللون الحالي</label>
                    <select
                      value={input.color}
                      onChange={(e) => setInput({ ...input, color: e.target.value as WasteColor })}
                      className="w-full p-3 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-eco-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="green">أخضر</option>
                      <option value="brown">بني</option>
                      <option value="yellow">أصفر</option>
                      <option value="black">أسود</option>
                      <option value="white">أبيض/عفن</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  {/* Smell */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">الرائحة</label>
                    <select
                      value={input.smell}
                      onChange={(e) => setInput({ ...input, smell: e.target.value as WasteSmell })}
                      className="w-full p-3 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-eco-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="natural">طبيعية (ترابية)</option>
                      <option value="sour">حامضة</option>
                      <option value="bad">كريهة جداً</option>
                    </select>
                  </div>

                  {/* Days */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">عدد الأيام</label>
                    <input
                      type="number"
                      min="0"
                      value={input.days}
                      onChange={(e) => setInput({ ...input, days: parseInt(e.target.value) || 0 })}
                      className="w-full p-3 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-eco-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Media Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-bold text-gray-800">التحليل المتعدد الوسائط</h3>
                  
                  <ImageCapture onImageCaptured={(img) => setInput({ ...input, image: img })} />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 mr-1">وصف صوتي (اختياري)</label>
                    <VoiceRecorder onTranscription={(text) => setInput({ ...input, voiceDescription: text })} />
                    {input.voiceDescription && (
                      <div className="p-3 bg-eco-50 rounded-xl border border-eco-100 text-sm text-eco-800 italic">
                        "{input.voiceDescription}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-4 bg-eco-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-eco-600/20 hover:bg-eco-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin" />
                      جاري التحليل الذكي...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      ابدأ التحليل الآن
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button
                onClick={reset}
                className="flex items-center gap-2 text-eco-600 font-medium hover:underline"
              >
                <ChevronLeft size={20} />
                العودة للتحليل الجديد
              </button>
              
              <AnalysisResultView result={result} />
              
              <button
                onClick={reset}
                className="w-full py-4 border-2 border-eco-500 text-eco-600 rounded-2xl font-bold hover:bg-eco-50 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                تحليل نفايات أخرى
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="max-w-2xl mx-auto px-4 mt-12 text-center space-y-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-100 text-sm text-gray-500">
          <p>دائماً تأكد من تهوية السماد والحفاظ على توازن المواد الخضراء والبنية.</p>
          <p className="mt-4 pt-4 border-t border-gray-50 text-xs">جميع الحقوق محفوظة@ لمدرسة منشية حسبان الثانوية الشاملة المختلطة © 2026</p>
        </div>
      </footer >
    </div>
  );
}
