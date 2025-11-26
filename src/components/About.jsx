import React from 'react';
import { Users, Globe, Star, Award, Heart, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { 
      icon: Users, 
      value: '50K+', 
      label: 'مسافر سعيد',
      description: 'نصنع ذكريات لا تُنسى حول العالم',
      color: 'from-orange-400 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    { 
      icon: Globe, 
      value: '100+', 
      label: 'وجهة',
      description: 'تمتد عبر 6 قارات',
      color: 'from-cyan-400 to-cyan-600',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    },
    { 
      icon: Star, 
      value: '5★', 
      label: 'خدمة مصنفة',
      description: 'موثوق به من قبل مجتمعنا الرائع',
      color: 'from-pink-400 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'شغف السفر',
      description: 'نعيش ونتنفس السفر، ونحمل هذا الحماس في كل رحلة نخطط لها',
      color: 'text-pink-500'
    },
    {
      icon: Award,
      title: 'التميز أولاً',
      description: 'تجارب عالية الجودة مدعومة باهتمام دقيق بالتفاصيل',
      color: 'text-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'الابتكار',
      description: 'نرسم طرقاً جديدة لاكتشاف العالم وتجربته',
      color: 'text-cyan-500'
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-white via-orange-50/30 to-cyan-50/30 overflow-hidden">
      {/* عناصر الخلفية الزخرفية */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* الرأس */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                عن جوڤايب
              </span>
            </h2>
          </div>

          {/* قسم القصة */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 md:p-14 shadow-xl mb-16 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                <span className="text-orange-600 font-semibold text-lg">قصتنا</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                من الرؤية إلى الواقع
              </h3>
              
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  GoVibe بدأت في 2025 بفكرة بسيطة… السفر مش مجرد حجز وخلاص، السفر يعني لحظات تتعاش.
بدل الPlatforms اللي كل شغلها معاملات وحجز بس، إحنا جينا نركّز على التجربة، على الجو، على الذكريات… وعلى رحلات حقيقية جوّا مصر اتعملت عشان تعيش وتنبسط.              
                </p>
                <hr></hr>
                <p>
                  وعشان كده عملنا GoVibe… علشان نوصّلك بروح المكان نفسه، بالناس، بالثقافة، وبالأماكن اللي محدّش ياخدك ليها.
                إحنا بنحب نطلعك برا خط السير التقليدي… ونفصّلك مغامرات على مزاجك.
                كل مكان ليه حكايته، وإحنا موجودين علشان نساعدك تكتشف حكايتك انت.
                </p>
              </div>
            </div>
          </div>

          {/* شبكة القيم */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
              ما يدفعنا
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-50 to-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className={`w-8 h-8 ${value.color}`} strokeWidth={2} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;