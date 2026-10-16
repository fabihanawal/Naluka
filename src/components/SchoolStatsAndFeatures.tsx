import React from 'react';
import { Users, GraduationCap, Award, Compass, ShieldCheck, HeartHandshake, Trees, Laptop } from 'lucide-react';
import { SchoolStats } from '../types';

interface SchoolStatsAndFeaturesProps {
  stats: SchoolStats;
}

export const SchoolStatsAndFeatures: React.FC<SchoolStatsAndFeaturesProps> = ({ stats }) => {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-emerald-50/40 border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantitative 4-Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                {stats.totalStudents}+
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">মোট শিক্ষার্থী সংখ্যা</div>
              <div className="text-[11px] text-slate-500 mt-0.5">শিশু শ্রেণি থেকে ৫ম শ্রেণি</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                ০{stats.totalTeachers} জন
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">প্রশিক্ষণপ্রাপ্ত নিবেদিত শিক্ষক</div>
              <div className="text-[11px] text-slate-500 mt-0.5">স্নেহময় ও অভিজ্ঞ শিক্ষকমণ্ডলী</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                {stats.passRate}%
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">ধারাবাহিক মূল্যায়ন সাফল্য</div>
              <div className="text-[11px] text-slate-500 mt-0.5">শতভাগ শিক্ষার্থী উত্তীর্ণ</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">
                ১.২০ একর
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">সবুজ উন্মুক্ত খেলার মাঠ</div>
              <div className="text-[11px] text-slate-500 mt-0.5">ধূলিমুক্ত ও স্বাস্থ্যকর আঙিনা</div>
            </div>
          </div>

        </div>

        {/* 3 Qualitative Pillars of Nalukabari School */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">পরিবেশবান্ধব সবুজ প্রাঙ্গণ</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              শহরের বন্দিশালা ও অতিরিক্ত মানসিক চাপের বিপরীতে নালুকাবাড়ির সবুজ বৃক্ষরাজি ও মুক্ত হাওয়া শিশুদের মানসিক বিকাশে সবচেয়ে বড় অবদান রাখে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">স্মার্ট ডিজিটাল শিক্ষা</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              মাল্টিমিডিয়া প্রজেক্টরে অডিও-ভিজ্যুয়াল কন্টেন্টের মাধ্যমে প্রতিটি বিষয় শিশুদের কাছে অত্যন্ত আকর্ষণীয় ও জীবন্তভাবে তুলে ধরা হয়।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">মানবিক ও চারিত্রিক মূল্যবোধ</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              বইয়ের পাতার পাশাপাশি শৃঙ্খলা, বড়দের শ্রদ্ধা, সততা, সহমর্মিতা ও দেশপ্রেমে শিক্ষার্থীদের গড়ে তোলাই প্রধান শিক্ষক মহোদয়ের মূল লক্ষ্য।
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
