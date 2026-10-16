import React from 'react';
import { ArrowRight, BookOpen, Sparkles, MapPin, Award, Trees, Bell, Eye } from 'lucide-react';
import { Notice } from '../types';
import { InteractiveSlideshow } from './InteractiveSlideshow';

interface HeroSectionProps {
  latestNotice?: Notice;
  onViewNotice: (notice: Notice) => void;
  headmasterPhotoUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ latestNotice, onViewNotice, headmasterPhotoUrl }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30 pt-6 pb-12 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Notice Alert Ticker */}
        {latestNotice && (
          <div className="mb-4 p-2 bg-white border border-emerald-900/15 rounded-xl shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 overflow-hidden pl-2">
              <span className="bg-emerald-700 text-white font-semibold px-2 py-0.5 rounded-md text-xs shrink-0 flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" /> সর্বশেষ নোটিশ
              </span>
              <span className="font-semibold text-slate-800 truncate">
                {latestNotice.title}
              </span>
            </div>
            <button
              onClick={() => onViewNotice(latestNotice)}
              className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 text-xs shrink-0 pr-3 hover:underline"
            >
              <Eye className="w-3.5 h-3.5" /> বিস্তারিত দেখুন
            </button>
          </div>
        )}

        {/* Smooth Interactive Slideshow directly below the latest notice ticker */}
        <InteractiveSlideshow headmasterPhotoUrl={headmasterPhotoUrl} />

        {/* 2-Column Hero Grid: Highlights & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
          
          {/* Left Column: School Title & Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>ধূলিমুক্ত সবুজ প্রাঙ্গণ ও আধুনিক প্রাথমিক শিক্ষা</span>
              <span className="text-slate-300">·</span>
              <span>স্থাপিত: ১৯৭৪</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight text-balance">
              নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              প্রকৃতির স্নিগ্ধ সবুজ ছায়ায় আনন্দময় শিশুশিক্ষা ও ভবিষ্যৎ গড়ার এক নির্ভরযোগ্য বিদ্যাপীঠ। শহুরে কোলাহল ও ধূলিমুক্ত সুবিশাল খেলার মাঠ, নিবিড় অভিভাবকত্ব এবং আধুনিক মাল্টিমিডিয়া প্রযুক্তিতে গড়ে উঠছে প্রতিটি শিশু।
            </p>

            {/* Highlights metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
                <div className="font-semibold text-emerald-900 mb-0.5">১.২০ একর প্রাঙ্গণ</div>
                <div className="text-xs text-slate-500">সুবিশাল সবুজ খেলার মাঠ</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-900/10 shadow-2xs">
                <div className="font-semibold text-emerald-900 mb-0.5">ডিজিটাল ক্লাসরুম</div>
                <div className="text-xs text-slate-500">মাল্টিমিডিয়া প্রজেক্টর শিক্ষা</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-emerald-900/10 shadow-2xs col-span-2 sm:col-span-1">
                <div className="font-semibold text-emerald-900 mb-0.5">৮+ সহশিক্ষা চর্চা</div>
                <div className="text-xs text-slate-500">খেলাধুলা, গান, নাচ ও বিতর্ক</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#notices"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>ডিজিটাল নোটিশ দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#teachers"
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 hover:border-slate-400 shadow-2xs transition-all whitespace-nowrap"
              >
                শিক্ষক ও কর্মচারীবৃন্দ
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>মথুরাপুর, বদলগাছী, নওগাঁ · প্রধান শিক্ষক: মোঃ রশিদুল ইসলাম</span>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 group">
              <img
                src="/src/assets/images/school_campus_hero_1792171248217.jpg"
                alt="নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয় ক্যাম্পাস ও সুবিশাল খেলার মাঠ"
                className="w-full h-[320px] sm:h-[360px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-medium text-emerald-300 mb-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> উপজেলার অন্যতম আদর্শ সবুজ বিদ্যাপীঠ
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  সবুজ ঘাসের গালিচা ও মুক্ত প্রাকৃতিক আঙিনা
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  শিশুদের শারীরিক ও মানসিক বিকাশের জন্য উপযুক্ত পরিচ্ছন্ন গ্রামীণ পরিবেশ।
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
