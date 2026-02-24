import React, { useEffect } from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Volume2, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result }) => {
  useEffect(() => {
    if (result.status === 'compostable') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#16a34a', '#86efac']
      });
    }
  }, [result.status]);

  const speak = () => {
    const text = `الحالة: ${getStatusText(result.status)}. ${result.explanation}. الإرشادات: ${result.instructions.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'compostable':
        return {
          icon: <CheckCircle2 className="text-eco-500" size={48} />,
          bg: 'bg-eco-50',
          border: 'border-eco-200',
          text: 'صالحة للتحويل إلى سماد',
          color: 'text-eco-700'
        };
      case 'needs_improvement':
        return {
          icon: <AlertTriangle className="text-yellow-500" size={48} />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'تحتاج إلى تحسين',
          color: 'text-yellow-700'
        };
      default:
        return {
          icon: <XCircle className="text-red-500" size={48} />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'غير صالحة',
          color: 'text-red-700'
        };
    }
  };

  const getStatusText = (status: string) => {
    if (status === 'compostable') return 'صالحة للتحويل إلى سماد';
    if (status === 'needs_improvement') return 'تحتاج إلى تحسين';
    return 'غير صالحة للتحويل إلى سماد';
  };

  const config = getStatusConfig(result.status);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-6 rounded-3xl border-2 ${config.bg} ${config.border} flex flex-col items-center text-center gap-4`}>
        {config.icon}
        <div>
          <h2 className={`text-2xl font-bold ${config.color}`}>{config.text}</h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${result.status === 'compostable' ? 'bg-eco-500' : result.status === 'needs_improvement' ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${result.score}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{result.score}%</span>
          </div>
        </div>
        <button
          onClick={speak}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-eco-600 hover:bg-eco-50 transition-colors"
        >
          <Volume2 size={18} />
          <span className="text-sm font-medium">قراءة النتيجة صوتياً</span>
        </button>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Info size={20} className="text-eco-600" />
          التحليل العلمي
        </h3>
        <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
        
        <div className="p-4 bg-eco-50/50 rounded-2xl border border-eco-100">
          <h4 className="font-semibold text-eco-800 mb-2">لماذا هذه النتيجة؟</h4>
          <p className="text-sm text-eco-700 italic">{result.scientificReasoning}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold px-2">الإرشادات والخطوات القادمة</h3>
        <ul className="space-y-2">
          {result.instructions.map((inst, i) => (
            <li key={i} className="flex gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <span className="flex-shrink-0 w-6 h-6 bg-eco-100 text-eco-600 rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-gray-700">{inst}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
