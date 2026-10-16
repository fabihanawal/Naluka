import React from 'react';
import { Quote, GraduationCap, CheckCircle2, Phone, Mail, Award, BookOpen } from 'lucide-react';
import { HeadmasterInfo } from '../types';

interface PrincipalDeskProps {
  headmaster: HeadmasterInfo;
}

export const PrincipalDesk: React.FC<PrincipalDeskProps> = ({ headmaster }) => {
  return (
    <section id="headmaster" className="py-16 sm:py-20 bg-white border-t border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>দিকনির্দেশনা ও প্রাতিষ্ঠানিক দৃষ্টিভঙ্গি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            প্রধান শিক্ষকের কর্নার (Principal's Desk)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়ের স্বপ্ন, আনন্দময় শিক্ষা দর্শন এবং সম্মানিত অভিভাবকদের প্রতি বার্তা।
          </p>
        </div>

        {/* Card Layout: Headmaster Profile + Speech */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Headmaster Image & Credentials */}
          <div className="lg:col-span-5 bg-gradient-to-b from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-900/10 shadow-xs">
            <div className="relative rounded-xl overflow-hidden shadow-sm aspect-4/3 mb-5 bg-slate-200">
              <img
                src={headmaster.photoUrl || '/src/assets/images/headmaster_desk_1792171248835.jpg'}
                alt={headmaster.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white p-2 rounded-lg text-xs">
                <span className="font-semibold block">{headmaster.name}</span>
                <span className="text-[11px] text-emerald-200">{headmaster.designation}, নালুকাবাড়ি সপ্রাবি</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{headmaster.name}</h3>
                <p className="text-xs font-semibold text-emerald-800">{headmaster.designation}</p>
                <p className="text-xs text-slate-600 mt-0.5">{headmaster.qualifications}</p>
              </div>

              <div className="pt-3 border-t border-emerald-900/10 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>উপজেলা শ্রেষ্ঠ প্রধান শিক্ষক পদকে ভূষিত</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-mono">{headmaster.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-mono">{headmaster.email}</span>
                </div>
              </div>

              {/* Why Parents Prefer Nalukabari List */}
              <div className="mt-4 pt-4 border-t border-emerald-900/10">
                <h4 className="text-xs font-bold text-slate-900 mb-2.5">
                  অভিভাবকগণ কেন নালুকাবাড়ী সপ্রাবি বেছে নেন:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>কোনো কৃত্রিম কোচিং চাপ বা অতিরিক্ত মানসিক বোঝা নেই।</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>১.২০ একরের সবুজ প্রাঙ্গণ ও নিরাপদ খেলার উন্মুক্ত পরিবেশ।</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>স্মার্ট মাল্টিমিডিয়া ডিজিটাল প্রজেক্টরে আনন্দদায়ক পাঠ।</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>গান, নাচ, আবৃত্তি, বিতর্ক ও খেলাধুলায় সার্বিক বিকাশ।</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Headmaster's Detailed Message */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quote Block */}
            <div className="relative p-6 rounded-2xl bg-emerald-900 text-white shadow-md">
              <Quote className="w-8 h-8 text-emerald-400/40 mb-2" />
              <p className="text-base sm:text-lg font-medium leading-relaxed italic text-emerald-50">
                "{headmaster.quote}"
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs font-semibold text-emerald-300">— {headmaster.name}</span>
              </div>
            </div>

            {/* Paragraphs of Message */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {headmaster.fullMessage.map((p, idx) => (
                <p key={idx} className="text-justify">
                  {p}
                </p>
              ))}
            </div>

            {/* Sign-off Seal */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">শুভেচ্ছান্তে,</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{headmaster.name}</div>
                <div className="text-xs text-emerald-800">প্রধান শিক্ষক, নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়</div>
              </div>
              <div className="text-right">
                <div className="inline-block px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 font-semibold">
                  অফিস খোলা: সকাল ৯:০০ - বিকাল ৪:০০
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
