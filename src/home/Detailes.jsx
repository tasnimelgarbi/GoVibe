import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // تأكدي انك عامله import صح

const Detailes = () => {
  const location = useLocation();
  const tripId = location.state?.id; // هنفترض إننا جايين من صفحة الرحلات وبعتنا id
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripId) {
      const fetchTrip = async () => {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .single();
        if (error) {
          console.error(error);
        } else {
          setTrip(data);
        }
      };
      fetchTrip();
    }
  }, [tripId]);

  if (!trip) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>جاري تحميل بيانات الرحلة...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* الهيدر */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-b-[40px]">
        <img
          src={trip.photo}
          alt={trip.name}
          className="w-full h-full object-cover brightness-75"
        />
        <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-bold text-white text-center drop-shadow-xl">
          {trip.name}
        </h1>
      </div>

      {/* تفاصيل الرحلة */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-10 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">وصف الرحلة</h2>
         <p className="text-gray-600 leading-relaxed">
            {trip.details}
          </p>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">تاريخ الرحلة:</span>
              <span className="text-gray-600">{trip.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">مكان التجمع</span>
              <span className="text-gray-600">{trip.city}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">السعر:</span>
              <span className="text-gray-600">{trip.price}</span>
            </div>
          </div>

          <Link
            to="/book"
            state={{ tripId: trip.id }} // نرسل id الرحلة لصفحة الحجز
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 flex justify-center"
          >
            احجز الرحلة الآن
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Detailes;
