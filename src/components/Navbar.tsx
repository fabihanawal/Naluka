import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Shield, PhoneCall, Heart, ChevronDown, 
  GraduationCap, Bell, Users, Sparkles, Image as ImageIcon, 
  Building, BookOpen, Trophy, Mail 
} from 'lucide-react';

interface NavbarProps {
  onOpenAdminAuth: () => void;
  isAdmin: boolean;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdminAuth,
  isAdmin,
  onOpenAdminDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [heartAnim, setHeartAnim] = useState(false);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dropdown states for desktop
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Triple-tap handler on the subtle red heart
  const handleHeartClick = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 300);

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    if (newCount === 3) {
      setTapCount(0);
      if (isAdmin) {
        onOpenAdminDashboard();
      } else {
        onOpenAdminAuth();
      }
    } else {
      tapTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 1200);
    }
  };

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md transition-all">
      
      {/* 1. Classic Institutional Top Bar (সরকারি বাতায়ন শৈলী) */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900/60 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <span className="font-semibold text-white truncate">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
          <span className="opacity-40">|</span>
          <span className="hidden md:inline text-emerald-300">প্রাথমিক শিক্ষা অধিদপ্তর</span>
          <span className="hidden md:inline opacity-40">|</span>
          <span className="truncate">বিদ্যালয় কোড: ৪২১০৫ · বদলগাছী, নওগাঁ</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+8801712345678"
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span className="font-mono">০১৭১২-৩৪৫৬৭৮</span>
          </a>

          <a
            href="mailto:roshidul.nalukabari@gmail.com"
            className="hidden lg:flex items-center gap-1 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-emerald-400" />
            <span className="font-mono">roshidul.nalukabari@gmail.com</span>
          </a>

          <span className="opacity-40">|</span>

          {/* Subtle Secret Red Heart Trigger */}
          <button
            onClick={handleHeartClick}
            type="button"
            title="নালুকাবাড়ি পাঠশালা প্রেম (ট্রিপল ট্যাপে অ্যাডমিন প্যানেল)"
            aria-label="গোপন অ্যাডমিন ট্রিগার"
            className={`relative p-0.5 rounded-full text-red-500 hover:text-red-400 focus:outline-none transition-transform cursor-pointer ${
              heartAnim ? 'scale-140' : 'scale-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 fill-current text-red-500 ${heartAnim ? 'animate-ping' : ''}`} />
            {tapCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] bg-red-600 text-white font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center animate-pulse">
                {tapCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Classic Middle Branding Area (লোগো, পূর্ণ নাম ও পরিচিতি) */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 py-3.5 px-4 sm:px-8 border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & School Name */}
          <a href="#" className="flex items-center gap-3.5 group">
            {/* National green circular seal with red accent */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-800 border-2 border-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0 relative group-hover:scale-102 transition-transform">
              <span className="font-bold text-lg sm:text-xl font-serif">না</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-600 rounded-full border-2 border-white" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়
              </h1>
              <p className="text-xs sm:text-sm text-emerald-800 font-medium">
                Nalukabari Government Primary School · মথুরাপুর, বদলগাছী, নওগাঁ
              </p>
              <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
                স্থাপিত: ১৯৭৪ খ্রিস্টাব্দ · প্রধান শিক্ষক: মোঃ রশিদুল ইসলাম
              </div>
            </div>
          </a>

          {/* Right Action / Admin indicator */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all shadow-xs"
              >
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>অ্যাডমিন ড্যাশবোর্ড</span>
              </button>
            ) : (
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition-all"
              >
                <span>ভর্তি ও যোগাযোগ</span>
              </a>
            )}

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-emerald-100/50"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Classic Full Horizontal Navigation Bar (ক্লাসিক মেনুবার) */}
      <nav className="hidden lg:block bg-emerald-850 text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold">
            
            {/* 1. প্রচ্ছদ (Home) */}
            <a
              href="#"
              className="px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
            >
              প্রচ্ছদ
            </a>

            {/* 2. বিদ্যালয় পরিচিতি (About Us Dropdown) */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('about')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
              >
                <span>আমাদের পরিচিতি</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'about' && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 shadow-xl rounded-b-xl border border-emerald-900/10 py-2 z-50 animate-in fade-in">
                  <a
                    href="#headmaster"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    প্রধান শিক্ষকের বাণী
                  </a>
                  <a
                    href="#stats"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    বিদ্যালয়ের পরিসংখ্যান ও পরিবেশ
                  </a>
                  <a
                    href="#contact"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    অবস্থান ও মানচিত্র
                  </a>
                </div>
              )}
            </div>

            {/* 3. শিক্ষক ও কর্মচারী (Faculty Dropdown) */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('faculty')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
              >
                <span>শিক্ষক ও কর্মচারীবৃন্দ</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'faculty' && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 shadow-xl rounded-b-xl border border-emerald-900/10 py-2 z-50 animate-in fade-in">
                  <a
                    href="#headmaster"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    প্রধান শিক্ষক পরিচিতি
                  </a>
                  <a
                    href="#teachers"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    সকল সহকারী শিক্ষকগণ
                  </a>
                  <a
                    href="#teachers"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    কর্মচারীবৃন্দ
                  </a>
                </div>
              )}
            </div>

            {/* 4. ডিজিটাল নোটিশ বোর্ড (Notice Board) */}
            <a
              href="#notices"
              className="flex items-center gap-1.5 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap bg-emerald-900/40"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-300" />
              <span>ডিজিটাল নোটিশ বোর্ড</span>
            </a>

            {/* 5. একাডেমিক ও সহশিক্ষা (Academic Dropdown) */}
            <div 
              className="relative group"
              onMouseEnter={() => setOpenDropdown('academics')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
              >
                <span>কার্যক্রম ও সহশিক্ষা</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === 'academics' && (
                <div className="absolute left-0 top-full w-56 bg-white text-slate-800 shadow-xl rounded-b-xl border border-emerald-900/10 py-2 z-50 animate-in fade-in">
                  <a
                    href="#activities"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    মাল্টিমিডিয়া ডিজিটাল ক্লাস
                  </a>
                  <a
                    href="#activities"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    প্রাতঃসমাবেশ ও শারীরিক কসরত
                  </a>
                  <a
                    href="#activities"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    ফুটবল ও গ্রামীণ খেলাধুলা
                  </a>
                  <a
                    href="#activities"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    সঙ্গীত, নাচ ও নাটিকা
                  </a>
                  <a
                    href="#activities"
                    className="block px-4 py-2 hover:bg-emerald-50 text-xs font-medium text-slate-700 hover:text-emerald-900"
                  >
                    ক্ষুদে বিতর্ক ও উপস্থিত বক্তৃতা
                  </a>
                </div>
              )}
            </div>

            {/* 6. দেয়ালিকা "আনন্দধারা" (Wall Magazine) */}
            <a
              href="#creatives"
              className="flex items-center gap-1.5 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>সৃজনশীল দেয়ালিকা</span>
            </a>

            {/* 7. আলোকচিত্র গ্যালারি (Gallery) */}
            <a
              href="#gallery"
              className="flex items-center gap-1.5 px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
              <span>ফটোগ্যালারি</span>
            </a>

            {/* 8. যোগাযোগ (Contact) */}
            <a
              href="#contact"
              className="px-4 py-3 hover:bg-emerald-950 transition-colors whitespace-nowrap"
            >
              যোগাযোগ
            </a>

          </div>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/10 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            প্রচ্ছদ (Home)
          </a>
          <a
            href="#headmaster"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            প্রধান শিক্ষকের কর্নার
          </a>
          <a
            href="#teachers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            শিক্ষক ও কর্মচারী পরিচিতি
          </a>
          <a
            href="#notices"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md bg-emerald-50/50"
          >
            ডিজিটাল নোটিশ বোর্ড
          </a>
          <a
            href="#activities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            কার্যক্রম ও সহশিক্ষা (ডিজিটাল ক্লাস, খেলাধুলা, বিতর্ক)
          </a>
          <a
            href="#creatives"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            সৃজনশীল দেয়ালিকা "আনন্দধারা"
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            আলোকচিত্র গ্যালারি
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-md"
          >
            যোগাযোগ ও অবস্থান
          </a>

          <div className="pt-3 border-t border-slate-100">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs block"
            >
              ভর্তি ও সরাসরি যোগাযোগ
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
