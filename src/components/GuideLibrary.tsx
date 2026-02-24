import React from 'react';
import { BookOpen, CheckCircle, XCircle, Lightbulb, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface GuideLibraryProps {
  onBack: () => void;
}

export const GuideLibrary: React.FC<GuideLibraryProps> = ({ onBack }) => {
  const categories = [
    {
      title: "ماذا نضع في السماد؟",
      icon: <CheckCircle className="text-eco-500" />,
      items: [
        { name: "المواد الخضراء (نيتروجين)", details: "بقايا الخضروات، الفواكه، قصاصات العشب الأخضر، بقايا القهوة." },
        { name: "المواد البنية (كربون)", details: "أوراق الأشجار الجافة، الكرتون غير الملون، القش، نشارة الخشب النظيفة." },
        { name: "توازن 1:3", details: "يفضل وضع جزء واحد من المواد الخضراء مقابل ثلاثة أجزاء من المواد البنية." }
      ]
    },
    {
      title: "تجنب هذه المواد",
      icon: <XCircle className="text-red-500" />,
      items: [
        { name: "اللحوم والألبان", details: "تجذب القوارض وتسبب روائح كريهة جداً." },
        { name: "الزيوت والدهون", details: "تبطئ عملية التحلل وتمنع وصول الأكسجين." },
        { name: "فضلات الحيوانات الأليفة", details: "قد تحتوي على مسببات أمراض لا تموت في السماد المنزلي." }
      ]
    },
    {
      title: "تقنيات التحسين",
      icon: <Lightbulb className="text-yellow-500" />,
      items: [
        { name: "التهوية المستمرة", details: "تقليب الكومة مرة كل أسبوع يساعد الكائنات الدقيقة على التنفس." },
        { name: "الرطوبة المثالية", details: "يجب أن يكون السماد رطباً مثل الإسفنجة المعصورة، ليس جافاً ولا غارقاً." },
        { name: "تصغير الحجم", details: "تقطيع النفايات إلى قطع صغيرة يسرع عملية التحلل بشكل كبير." }
      ]
    },
    {
      title: "مشاكل وحلول",
      icon: <AlertCircle className="text-orange-500" />,
      items: [
        { name: "رائحة بيض فاسد", details: "السبب: نقص الأكسجين. الحل: قلب الكومة وأضف مواد بنية جافة." },
        { name: "الكومة لا تسخن", details: "السبب: نقص النيتروجين أو الرطوبة. الحل: أضف بقايا خضروات أو ماء." },
        { name: "وجود حشرات طائرة", details: "السبب: وجود فواكه مكشوفة. الحل: غطِ السطح بطبقة من الأوراق الجافة." }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 pb-12"
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
          <BookOpen size={24} className="text-eco-600" />
          <h2 className="text-2xl font-bold">المكتبة الإرشادية</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {categories.map((cat, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 rounded-3xl space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              {cat.icon}
              <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cat.items.map((item, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-2xl border border-gray-50 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-eco-700 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="p-6 bg-eco-600 text-white rounded-3xl shadow-lg space-y-3">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Lightbulb size={24} />
          نصيحة الخبراء
        </h3>
        <p className="leading-relaxed opacity-90">
          التسميد هو عملية حيوية طبيعية. لا تقلق إذا لم تكن النتائج مثالية في البداية. الطبيعة تعرف كيف تصلح نفسها، ودورك هو فقط توفير الظروف المناسبة للكائنات الدقيقة لتقوم بعملها.
        </p>
      </div>
    </motion.div>
  );
};
