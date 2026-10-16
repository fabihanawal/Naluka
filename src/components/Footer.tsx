import React, { useState, useRef } from 'react';
import { Heart, Shield, Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdminAuth: () => void;
  isAdmin: boolean;
  onOpenAdminDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminAuth,
  isAdmin,
  onOpenAdminDashboard,
}) => {
  const [tapCount, setTapCount] = useState(0);
  const [heartAnim, setHeartAnim] = useState(false);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Triple-tap handler on the footer red heart
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-white pt-14 pb-8 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-emerald-900/60 text-xs sm:text-sm">
          
          {/* Brand & Introduction */}
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                না
              </div>
              <span className="font-bold text-base text-emerald-100">
                নালুকাবাড়ি সপ্রাবি
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়, মথুরাপুর, বদলগাছী, নওগাঁ। প্রকৃতির স্নিগ্ধ কোলে প্রতিটি শিশুর আনন্দময় আধুনিক শিক্ষাকেন্দ্র।
            </p>
            <div className="text-[11px] text-emerald-400 font-medium">
              প্রধান শিক্ষক: মোঃ রশিদুল ইসলাম
            </div>
          </div>

          {/* Useful Institutional Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-emerald-200">পোর্টাল নেভিগেশন</h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <a href="#headmaster" className="hover:text-emerald-400 transition-colors">প্রধান শিক্ষকের কর্নার</a>
              </li>
              <li>
                <a href="#notices" className="hover:text-emerald-400 transition-colors">ডিজিটাল নোটিশ বোর্ড</a>
              </li>
              <li>
                <a href="#activities" className="hover:text-emerald-400 transition-colors">কার্যক্রম ও সহশিক্ষা</a>
              </li>
              <li>
                <a href="#creatives" className="hover:text-emerald-400 transition-colors">সৃজনশীল দেয়ালিকা আনন্দধারা</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-emerald-400 transition-colors">ক্যাম্পাস ফটোগ্যালারি</a>
              </li>
            </ul>
          </div>

          {/* Emergency & Gov Helplines */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-emerald-200">জরুরি সরকারি সেবা</h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold font-mono">১০৯৮</span>
                <span>শিশু সুরক্ষা ও চাইল্ড হেল্পলাইন</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold font-mono">৯৯৯</span>
                <span>জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold font-mono">৩৩৩</span>
                <span>জাতীয় তথ্য ও সরকারি সেবা বাতায়ন</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold font-mono">১০৯</span>
                <span>নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন</span>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-emerald-200">যোগাযোগ ও অবস্থান</h4>
            <div className="space-y-1.5 text-slate-300 text-xs">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>গ্রাম: নালুকাবাড়ি, মথুরাপুর, বদলগাছী, নওগাঁ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">+৮৮০১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono truncate">roshidul.nalukabari@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with Secret Red Heart Trigger and Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।</span>
          </div>

          {/* Secret Red Heart Shape (Triple Tap Interaction) */}
          <div className="flex items-center gap-2">
            <span>ভালোবাসায় নালুকাবাড়ি</span>
            <button
              onClick={handleHeartClick}
              type="button"
              title="নালুকাবাড়ি পাঠশালা প্রেম (ট্রিপল ট্যাপে অ্যাডমিন প্যানেল)"
              aria-label="লাল হার্ট শেপ"
              className={`relative p-1 rounded-full text-red-500 hover:text-red-400 focus:outline-none transition-transform cursor-pointer ${
                heartAnim ? 'scale-140' : 'scale-100'
              }`}
            >
              <Heart className={`w-4 h-4 fill-current text-red-500 ${heartAnim ? 'animate-bounce' : ''}`} />
              {tapCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] bg-red-600 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {tapCount}
                </span>
              )}
            </button>
            <span>পাঠশালা</span>

            {isAdmin && (
              <button
                onClick={onOpenAdminDashboard}
                className="ml-3 px-2 py-0.5 bg-emerald-800 text-emerald-100 rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-emerald-700 transition-colors"
              >
                <Shield className="w-3 h-3" /> অ্যাডমিন
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
