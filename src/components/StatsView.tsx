import React from 'react';
import { BarChart3, Trophy, Target, Recycle, AlertCircle, XCircle, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { UserStats } from '../types';

interface StatsViewProps {
  stats: UserStats;
  onBack: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ stats, onBack }) => {
  const statCards = [
    {
      title: "مجموع النقاط",
      value: stats.points,
      icon: <Trophy className="text-yellow-500" />,
      desc: "نقطة واحدة لكل عملية تسميد ناجحة"
    },
    {
      title: "إجمالي التحليلات",
      value: stats.totalAnalyses,
      icon: <BarChart3 className="text-blue-500" />,
      desc: "عدد المرات التي استخدمت فيها التطبيق"
    }
  ];

  const distribution = [
    { label: "صالحة", count: stats.compostableCount, color: "bg-eco-500", icon: <Recycle size={16} /> },
    { label: "تحتاج تحسين", count: stats.needsImprovementCount, color: "bg-yellow-500", icon: <AlertCircle size={16} /> },
    { label: "غير صالحة", count: stats.notCompostableCount, color: "bg-red-500", icon: <XCircle size={16} /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-eco-600 font-medium hover:underline"
        >
          <ChevronLeft size={20} />
          العودة للرئيسية
        </button>
        <div className="flex items-center gap-2 text-eco-800">
          <BarChart3 size={24} className="text-eco-600" />
          <h2 className="text-2xl font-bold">إحصائياتي</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl flex items-center gap-4 border-b-4 border-eco-100">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="glass-card p-6 rounded-3xl space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Target size={20} className="text-eco-600" />
          توزيع النتائج
        </h3>
        
        <div className="space-y-4">
          {distribution.map((item, idx) => {
            const percentage = stats.totalAnalyses > 0 
              ? (item.count / stats.totalAnalyses) * 100 
              : 0;
            
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span>{item.count} ({Math.round(percentage)}%)</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="p-6 bg-eco-50 rounded-3xl border border-eco-100 text-center space-y-2">
        <p className="text-eco-800 font-medium">
          {stats.points >= 10 ? "أنت بطل بيئي حقيقي! استمر في العمل الرائع." : "كل خطوة صغيرة تصنع فرقاً كبيراً لكوكبنا."}
        </p>
        <p className="text-sm text-eco-600">
          استمر في تحليل نفاياتك لزيادة نقاطك وتحسين مهاراتك في التسميد.
        </p>
      </div>
    </motion.div>
  );
};
