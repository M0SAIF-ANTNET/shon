import React, { useState } from 'react';
import { VideoTutorial } from './components/VideoTutorial';
import { UploadForm } from './components/UploadForm';
import { Store } from './components/Store';
import { TeamSection } from './components/TeamSection';
import { TopCompanies } from './components/TopCompanies';
import { ContactSection } from './components/ContactSection';
import { WhySection } from './components/WhySection';
import { Footer } from './components/Footer';
import { PartnersSlider } from './components/PartnersSlider';
import { QASection } from './components/QASection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSections from './components/ContactSections';

function App() {
  const [isArabic, setIsArabic] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const toggleLanguage = () => setIsArabic(!isArabic);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 ${isArabic ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://i.postimg.cc/sD85QyvY/Helix-logo.png"
                alt="Helix Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <button
                onClick={() => setActiveSection('home')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === 'home'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isArabic ? 'الرئيسية' : 'Home'}
              </button>
              <button
                onClick={() => setActiveSection('store')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === 'store'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isArabic ? 'المتجر' : 'Store'}
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === 'about'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isArabic ? 'عن هيلكس' : 'About'}
              </button>
              <button
                onClick={() => setActiveSection('services')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === 'services'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isArabic ? 'خدماتنا' : 'Services'}
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === 'contact'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {isArabic ? 'اتصل بنا' : 'Contact'}
              </button>
            </div>

            {/* Language Toggle (Desktop) */}
            <div className="hidden md:block">
              <button
                onClick={toggleLanguage}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                {isArabic ? 'English' : 'العربية'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-emerald-600 hover:text-emerald-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-emerald-600 text-white mt-2 rounded-lg shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'الرئيسية' : 'Home'}
                </button>
                <button
                  onClick={() => { setActiveSection('store'); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'المتجر' : 'Store'}
                </button>
                <button
                  onClick={() => { setActiveSection('about'); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'عن هيلكس' : 'About'}
                </button>
                <button
                  onClick={() => { setActiveSection('services'); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'خدماتنا' : 'Services'}
                </button>
                <button
                  onClick={() => { setActiveSection('contact'); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'اتصل بنا' : 'Contact'}
                </button>
                <button
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
                >
                  {isArabic ? 'English' : 'العربية'}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {activeSection === 'home' && (
          <div className="relative overflow-hidden">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <img 
                    src="https://i.postimg.cc/sD85QyvY/Helix-logo.png"
                    alt="Helix Logo"
                    className="h-20 w-auto"
                  />
                </div>
                <h1 className="text-6xl font-bold text-emerald-900 mb-8">
                  {isArabic ? 'هيلكس' : 'Helix'}
                </h1>
                <p className="text-2xl text-emerald-800 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {isArabic
                    ? 'منصة مصرية مبتكرة لتبادل النفايات الصناعية والزراعية وإعادة تدويرها، نحو مستقبل أكثر استدامة'
                    : 'An innovative Egyptian platform for industrial and agricultural waste exchange and recycling, towards a more sustainable future'}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowUpload(true)}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors animate-float"
                  >
                    {isArabic ? 'أضف نفاياتك الآن' : 'Add Your Waste Now'}
                  </button>
                  <button
                    onClick={() => setActiveSection('store')}
                    className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors border-2 border-emerald-600 animate-float"
                    style={{ animationDelay: '0.1s' }}
                  >
                    {isArabic ? 'تصفح المتجر' : 'Browse Store'}
                  </button>
                </div>
              </div>
            </div>

            <VideoTutorial isArabic={isArabic} />
            <WhySection isArabic={isArabic} />
            <PartnersSlider isArabic={isArabic} />
            <TopCompanies isArabic={isArabic} />
            <TeamSection isArabic={isArabic} />
            <QASection isArabic={isArabic} />
            <ContactSection isArabic={isArabic} />
          </div>
        )}

        {activeSection === 'store' && (
          <>
            <div className="bg-emerald-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4">
                  {isArabic ? 'متجر النفايات الصناعية والزراعية في مصر' : 'Industrial and Agricultural Waste Store'}
                </h2>
                <p className="text-emerald-100">
                  {isArabic
                    ? 'تصفح النفايات المتاحة للتبادل أو أضف نفاياتك الخاصة'
                    : 'Browse available waste for exchange or add your own'}
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="mt-6 bg-white text-emerald-900 px-6 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  {isArabic ? 'أضف نفاياتك' : 'Add Your Waste'}
                </button>
              </div>
            </div>
            <Store isArabic={isArabic} />
          </>
        )}

        {activeSection === 'about' && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-emerald-900 mb-8 text-center">
                {isArabic ? 'عن هيلكس' : 'About Helix'}
              </h2>
              <AboutSection isArabic={isArabic} />
            </div>
          </div>
        )}

        {activeSection === 'services' && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-emerald-900 mb-8 text-center">
                {isArabic ? 'خدماتنا' : 'Our Services'}
              </h2>
              <ServicesSection isArabic={isArabic} />
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-emerald-900 mb-8 text-center">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </h2>
              <ContactSections isArabic={isArabic} />
            </div>
          </div>
        )}
      </main>

      <Footer isArabic={isArabic} />

      {/* Upload Form Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-emerald-900">
                {isArabic ? 'إضافة نفايات' : 'Add Waste'}
              </h2>
              <button
                onClick={() => setShowUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <UploadForm isArabic={isArabic} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;