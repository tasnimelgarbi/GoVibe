import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الرحلات', path: '#trip' },
    { name: 'عن جوڤايب', path: '#about' },
    { name: 'تواصل معنا', path: '#footer' },
    { name: 'احجز رحلتك', path: '/book' }
  ];

  // لو احنا في صفحات book أو details → نرجع اللوجو بس
  if (location.pathname === '/book' || location.pathname === '/details') {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white shadow-md'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-start items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center">
              <img src="logo.png" alt="شعار GoVibe"/>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              GoVibe | جوڤايب
            </span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* الشعار */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center">
                <span><img src="logo.png" alt="شعار GoVibe"/></span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              GoVibe | جوڤايب
            </span>
          </Link>

          {/* التنقل لشاشات الكمبيوتر */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) =>
              link.path.startsWith('#') ? (
                <a key={index} href={link.path} className="relative text-gray-700 hover:text-orange-500 font-medium transition-colors duration-300 group py-2">
                  {link.name}
                </a>
              ) : (
                <Link key={index} to={link.path} className="relative text-gray-700 hover:text-orange-500 font-medium transition-colors duration-300 group py-2">
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* زر القائمة للجوال */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-orange-600 hover:from-orange-200 hover:to-pink-200 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* قائمة الجوال */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            {navLinks.map((link, index) =>
              link.path.startsWith('#') ? (
                <a key={index} href={link.path} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl font-medium transition-all duration-300">
                  {link.name}
                </a>
              ) : (
                <Link key={index} to={link.path} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl font-medium transition-all duration-300">
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
