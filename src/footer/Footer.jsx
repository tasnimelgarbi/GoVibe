import React from 'react';
import { Phone, Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si'; // أيقونة تيك توك جاهزة

const Footer = () => {
  return (
    <footer id="footer" className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      
      {/* المحتوى الرئيسي للفوتر */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

            {/* شعار ووصف الشركة */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center">
                  <img src="logo.png" alt="شعار GoVibe"/>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  GoVibe
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                بوابتك إلى المغامرات الاستثنائية. نصنع تجارب سفر لا تُنسى.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/16WvaankBz/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-500">
                  <Facebook className="w-5 h-5 text-gray-300 hover:text-white"/>
                </a>
                <a href="https://www.instagram.com/go.vvibe?igsh=YzFtNGxzZnBuNnVp" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-pink-500">
                  <Instagram className="w-5 h-5 text-gray-300 hover:text-white"/>
                </a>
                <a href="https://www.tiktok.com/@go.vvibe?_r=1&_t=ZS-91iq3Ko3Oci" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-cyan-500">
                  <SiTiktok className="w-5 h-5 text-gray-300 hover:text-white"/>
                </a>
              </div>
            </div>

            {/* أرقام واتساب */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">واتساب</h4>
              <div className="space-y-4">
                <a href="https://wa.me/201007349516" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5"/>
                  </div>
                  <div className="font-medium">01007349516</div>
                </a>
                <a href="https://wa.me/201099316489" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5"/>
                  </div>
                  <div className="font-medium">01099316489</div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* الشريط السفلي مع الحقوق */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Dom Tech. جميع الحقوق محفوظة لشركة GoVibe.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
