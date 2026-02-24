import React from 'react';
import { Users, Target, Globe, ChevronLeft, Leaf, Sparkles, Brain } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutUsProps {
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
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
          <Users size={24} className="text-eco-600" />
          <h2 className="text-2xl font-bold">من نحن</h2>
        </div>
      </div>

      <section className="glass-card p-8 rounded-3xl text-center space-y-4">
        <div className="w-20 h-20 bg-eco-100 text-eco-600 rounded-full flex items-center justify-center mx-auto">
          <Leaf size={40} />
        </div>
        <h3 className="text-2xl font-bold text-eco-900">سماد ذكي</h3>
        <p className="text-sm font-medium text-eco-600">بإشراف المعلمة صفاء سالم</p>
        <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
          نحن سيما رزق الله وجوري المناعسة من مدرسة منشية حسبان الثانوية الشاملة المختلطة شاركنا في مسابقة علماء الغد لحل مشكلة حقيقية وهي هدر الطعام نحن فريق شغوف بالبيئة والتقنية، نؤمن بأن الحلول الذكية يمكن أن تساهم بشكل كبير في حماية كوكبنا. تطبيق "سماد ذكي" هو ثمرة هذا الشغف، حيث نستخدم أحدث تقنيات الذكاء الاصطناعي لتسهيل عملية التدوير المنزلي.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3 border-r-4 border-eco-500">
          <div className="flex items-center gap-2 text-eco-700 font-bold">
            <Target size={20} />
            <h4>مهمتنا</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            تمكين الأفراد من تحويل نفاياتهم العضوية إلى موارد قيمة (سماد) بكل سهولة ودقة، مما يقلل من الانبعاثات الكربونية الناتجة عن النفايات في المكبات.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3 border-r-4 border-blue-500">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <Globe size={20} />
            <h4>رؤيتنا</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            أن نصبح المنصة الرائدة في العالم العربي لتعزيز ثقافة الاستدامة والتدوير الحيوي باستخدام التكنولوجيا المتقدمة.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold px-2 flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-500" />
          ما الذي يميزنا؟
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center space-y-2">
            <Brain className="mx-auto text-purple-500" size={32} />
            <h5 className="font-bold text-gray-800">ذكاء اصطناعي</h5>
            <p className="text-xs text-gray-500">تحليل دقيق للصور والنصوص والصوت</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center space-y-2">
            <Users className="mx-auto text-eco-500" size={32} />
            <h5 className="font-bold text-gray-800">سهولة الاستخدام</h5>
            <p className="text-xs text-gray-500">واجهة عربية بسيطة تناسب الجميع</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center space-y-2">
            <Target className="mx-auto text-orange-500" size={32} />
            <h5 className="font-bold text-gray-800">دقة علمية</h5>
            <p className="text-xs text-gray-500">إرشادات مبنية على أسس علمية صحيحة</p>
          </div>
        </div>
      </section>

      <section className="glass-card p-6 rounded-3xl flex flex-col items-center gap-4 text-center">
        <p className="text-xs text-gray-400">جميع الحقوق محفوظة@ لمدرسة منشية حسبان الثانوية الشاملة المختلطة © 2026</p>
      </section>
    </motion.div>
  );
};
