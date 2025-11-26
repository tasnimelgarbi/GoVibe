import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../header/Navbar';
import About from '../components/About';
import Why from '../components/Why';
import Footer from '../footer/Footer';
import { supabase } from '../supabaseClient'; // لو عندك ملف supabaseClient.js

// مكون بطاقة الرحلة
const TripCard = ({ trip }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">

      {/* صورة الرحلة */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={trip.photo} 
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 font-medium">{trip.duration}</span>

          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            {trip.name}
          </span>
        </div>

        {/* زر التفاصيل */}
        <Link
          to="/details"
          state={{ id: trip.id }}
          className="w-full block bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 text-center"
        >
          عرض التفاصيل
        </Link>
      </div>

    </div>
  );
};

// المكون الرئيسي للصفحة الرئيسية
const Home = () => {
    const [featuredTrips, setFeaturedTrips] = useState([]);
    React.useEffect(() => {
      const fetchTrips = async () => {
        const { data, error } = await supabase
          .from('trips')
          .select('*');
        if (error) {
          console.error("Error fetching trips:", error);
        } else {
          setFeaturedTrips(data);
        }
      };

      fetchTrips();
    }, []);

  const [searchForm, setSearchForm] = useState({
    destination: '',
    date: '',
    travelers: ''
  });

  return (
    <>
      <div className="min-h-screen">
        {/* قسم الرأس */}
        <header className="relative bg-[url('https://i.ibb.co/pj33M4Hg/back.png')] text-white py-24 overflow-hidden">
          {/* عناصر الخلفية الزخرفية */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* الشارة */}
              <div className="inline-block mb-10 mt-5">
                <span className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/20 to-pink-100/20 backdrop-blur-sm text-orange-400 text-lg font-semibold border border-white/10">
                 سفريتك الجاية اكيد معانا
                </span>
              </div>
              
              {/* العنوان الرئيسي */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                 GoVibe
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                سافر واصنع ذكريات لا تُنسى
              </p>
              
              {/* نموذج البحث */}
           <div className="max-w-sm mx-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-white/20 relative flex justify-center">
              <form
                className="w-full flex justify-center"
              >
            <Link
            to="/book"
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 flex justify-center"
            >
            احجز الرحلة الآن
            </Link>
              </form>
            </div>
            </div>
          </div>
        </header>

        {/* قسم الرحلات المميزة */}
        <section id="trip" className="relative py-20 bg-gradient-to-br from-white via-orange-50/30 to-cyan-50/30 overflow-hidden">
          {/* عناصر الخلفية الزخرفية */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            {/* رأس القسم */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  رحلاتنا
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
اكتشف أحلى وأجمد رحلات، هتسيبلك ذكريات تعيش معاك علي طول              </p>
            </div>

            {/* شبكة الرحلات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Why />
      <About />
      <Footer />
    </>
  );
};

export default Home;