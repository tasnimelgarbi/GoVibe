import React from 'react';
import { Sparkles, Users, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';


const Why = () => {
  const features = [
    {
      icon: Sparkles,
      title: "رحلات معمولة على مزاجك",
      description: "رحلات معمولالك على مزاجك… رايقة ومنسّقة صح علشان تعيش أحسن تجربة سفر بطريقتك.",
      color: "from-orange-400 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: Users,
      title: "مرشدين من قلب المكان",
      description: "هتقابل ناس من قلب البلد… يعرفوك على الأماكن السرّيّة اللي محدش بيحكيلك عنها.",
      color: "from-cyan-400 to-cyan-600",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600"
    },
    {
      icon: Clock,
      title: "دعم 24 ساعة… وإحنا معاك",
      description: "ولا تشيل هم… في أي وقت وأي مكان هتلاقينا جنبك. سفر من غير قلق!",
      color: "from-pink-400 to-pink-600",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600"
    },
    {
      icon: Calendar,
      title: "حجز مرن على مزاجك",
      description: "خططك اتغيرت؟ ولا يهمك… قدّامك كل المرونة إنك تعدّل براحتك.",
      color: "from-purple-400 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 text-white overflow-hidden">

      {/* عناصر الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* الهيدر */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                ليه جوڤايب؟
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              مع GoVibe… هنحوّل سفريتك من مجرد رحلة لذكريات تعيش معاك طول العمر.
            </p>
          </div>

          {/* المميزات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`${feature.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>

                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-24`}></div>
              </div>
            ))}
          </div>

          {/* CTA */}
       <div className="flex justify-center mt-16">
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-xl w-full text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              جاهز تبدأ الرحلة؟
            </h3>
            <Link
              to="/book"
              className="mt-6 inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 px-10 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
            >
              يلا نكتشف
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
