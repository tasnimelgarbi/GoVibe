import { User, Phone, CreditCard, Camera, ArrowRight, CheckCircle } from 'lucide-react';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';
import { supabase } from "../supabaseClient";
import React, { useState, useEffect } from 'react';

const Book = () => {
  const [bookingData, setBookingData] = useState({
    // المعلومات الشخصية
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    
    // معلومات الرحلة
    selectedTrip: '',
    travelDate: '',
    travelersCount: 1,
    
    // المرفقات
    idCard: null,
    paymentProof: null
  });

  const [currentStep, setCurrentStep] = useState(1);

  const [featuredTrips, setFeaturedTrips] = useState([]); // خليها بدل المصفوفة الثابتة

    useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setBookingData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };

 const [isSubmitting, setIsSubmitting] = useState(false); // ← جديد

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true); // نبدأ التحميل

  try {
    // رفع الصور على Storage
    const uploadFile = async (file, folder) => {
      if (!file) return null;
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("booking")
        .upload(`${folder}/${fileName}`, file);
      if (error) {
        console.error(error);
        return null;
      }
      const { data: urlData } = supabase.storage
        .from("booking")
        .getPublicUrl(`${folder}/${fileName}`);
      return urlData.publicUrl;
    };

    const idCardUrl = await uploadFile(bookingData.idCard, "idCards");
    const paymentUrl = await uploadFile(bookingData.paymentProof, "payments");

    // إرسال البيانات للجدول
    const { data, error } = await supabase
      .from("book")
      .insert([{
        first: bookingData.firstName,
        last: bookingData.lastName,
        phone: bookingData.phone,
        trip: bookingData.selectedTrip,
        id_card_url: idCardUrl,
        payment_proof_url: paymentUrl,
        number: bookingData.travelersCount
      }]);

    if (error) throw error;

    setCurrentStep(4);
  } catch (err) {
    console.error(err);
    alert("حصل خطأ أثناء إرسال الحجز ❌");
  } finally {
    setIsSubmitting(false); // نوقف التحميل
  }
};


  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // خطوات الحجز
  const steps = [
    { number: 1, title: 'اختر رحلتك' },
    { number: 2, title: 'المعلومات الشخصية' },
    { number: 3, title: 'المرفقات' },
    { number: 4, title: 'تأكيد الحجز' }
  ];

  const isStep2Valid =
  bookingData.firstName.trim() !== "" &&
  bookingData.lastName.trim() !== "" &&
  bookingData.phone.trim() !== "" &&
  bookingData.travelersCount !== "";

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-cyan-50/30 pt-24">
      <div className="container mx-auto px-6 py-12">
        {/* رأس الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              احجز رحلتك
            </span>
            <br />
            <span className="text-slate-700">بسهولة</span>
          </h1>
        </div>

        {/* شريط التقدم */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="font-bold">{step.number}</span>
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium transition-all duration-300 ${
                  currentStep >= step.number ? 'text-orange-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* نموذج الحجز */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {currentStep === 1 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                  اختر رحلتك 
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {featuredTrips.map(trip => (
                  <div
                    key={trip.id}
                    className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl border-2 ${
                      bookingData.selectedTrip === trip.id ? 'border-orange-500' : 'border-gray-200'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, selectedTrip: trip.id }))}
                  >
                    {/* صورة الرحلة */}
                    <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                      <img
                        src={trip.photo}
                        alt={trip.title}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
                      />
                    </div>

                    {/* محتوى الكارت */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-2xl font-bold text-gray-800">{trip.title}</h3>
                      <p className="text-gray-600">{trip.duration}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-semibold text-gray-700">{trip.name}</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                          {trip.price} EGP
                        </p>
                      </div>
                    </div>

                    {/* أيقونة الاختيار */}
                    {bookingData.selectedTrip === trip.id && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-orange-500" />
                      </div>
                    )}
                  </div>
                ))}


                </div>
                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!bookingData.selectedTrip}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                  >
                  التالي 
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                  المعلومات الشخصية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      value={bookingData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">اسم العائلة</label>
                    <input
                      type="text"
                      name="lastName"
                      value={bookingData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="أدخل اسم عائلتك"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">رقم الهاتف</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                  </div>        
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">عدد المسافرين</label>
                   <input
                        type="number"
                        name="travelersCount"
                        value={bookingData.travelersCount}
                        onChange={handleInputChange}
                        placeholder="اكتب عدد المسافرين"
                        min="1"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    السابق
                  </button>

                 <button
                      onClick={nextStep}
                      disabled={!isStep2Valid}
                      className={`px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2
                        ${!isStep2Valid 
                          ? "bg-gray-300 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 shadow-lg shadow-orange-500/30"
                        }
                      `}
                    >
                      التالي
                    </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                  المرفقات المطلوبة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      bookingData.idCard ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
                    }`}>
                      {bookingData.idCard ? (
                        <CheckCircle className="w-10 h-10 text-orange-500" />
                      ) : (
                        <Camera className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">صورة البطاقة الشخصية</h3>
                    <p className="text-gray-600 mb-4">يرجى رفع صورة واضحة للبطاقة الشخصية</p>
                    <p className="text-gray-600 mb-4">صورة واضحة للرقم القومي(في حالة عدم توفر بطاقة)</p>
                    <input
                      type="file"
                      id="idCard"
                      name="idCard"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="idCard"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30 cursor-pointer inline-block"
                    >
                      {bookingData.idCard ? 'تم الرفع' : 'رفع الصورة'}
                    </label>
                  </div>

                  <div className="text-center">
                    <div className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      bookingData.paymentProof ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-cyan-400'
                    }`}>
                      {bookingData.paymentProof ? (
                        <CheckCircle className="w-10 h-10 text-cyan-500" />
                      ) : (
                        <CreditCard className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">إثبات الدفع</h3>
                    <p className="text-gray-600 mb-2">يرجى رفع صورة لإثبات عملية الدفع</p>
                    <p className="text-gray-600 mb-4">الدفع عبر فودافون كاش (01007349516) أ، (01099316489) </p>
                    <input
                      type="file"
                      id="paymentProof"
                      name="paymentProof"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="paymentProof"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer inline-block"
                    >
                      {bookingData.paymentProof ? 'تم الرفع' : 'رفع الإثبات'}
                    </label>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    السابق
                  </button>
                 <button
                    onClick={handleSubmit}
                    disabled={!bookingData.idCard || !bookingData.paymentProof || isSubmitting}
                    className={`px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300
                      ${(!bookingData.idCard || !bookingData.paymentProof)
                        ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
                        : "bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:from-green-600 hover:to-cyan-600 transform hover:scale-105 shadow-lg shadow-green-500/30"
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                      </svg>
                    ) : (
                      "تأكيد الحجز"
                    )}
                  </button>


                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  تم تأكيد حجزك بنجاح!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  سنقوم بالتواصل معك خلال 24 ساعة لتأكيد تفاصيل رحلتك
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">تفاصيل الحجز</h3>
                  <div className="space-y-2 text-right">
                    <p><strong>الرحلة:</strong> {featuredTrips.find(t => t.id === bookingData.selectedTrip)?.name}</p>
                    <p><strong>المسافر:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                    <p><strong>رقم الهاتف:</strong> {bookingData.phone}</p>
                    <p><strong>عدد المسافرين:</strong> {bookingData.travelersCount}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="mt-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
                >
                  حجز رحلة جديدة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>  
);
};

export default Book;
