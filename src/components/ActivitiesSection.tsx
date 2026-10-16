import React, { useState } from 'react';
import { Sparkles, Monitor, Activity as ActivityIcon, Trophy, Music, Palette, Mic, MessageSquare, Drama, Check, X } from 'lucide-react';
import { Activity, ActivityCategory } from '../types';

interface ActivitiesSectionProps {
  activities: Activity[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('সব');

  const categories = ['সব', ...Array.from(new Set(activities.map((a) => a.category)))];

  const filtered = activeCategory === 'সব' 
    ? activities 
    : activities.filter((a) => a.category === activeCategory);

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'ডিজিটাল ক্লাস':
        return <Monitor className="w-4 h-4 text-emerald-600" />;
      case 'শারীরিক কসরত ও পিটি':
        return <ActivityIcon className="w-4 h-4 text-emerald-600" />;
      case 'খেলাধুলা':
        return <Trophy className="w-4 h-4 text-emerald-600" />;
      case 'গান ও নাচ':
        return <Music className="w-4 h-4 text-emerald-600" />;
      case 'চিত্রাঙ্কন':
        return <Palette className="w-4 h-4 text-emerald-600" />;
      case 'আবৃত্তি ও বক্তৃতা':
        return <Mic className="w-4 h-4 text-emerald-600" />;
      case 'ক্ষুদে বিতর্ক':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'নাটিকা ও অন্যান্য':
        return <Drama className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section id="activities" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>আনন্দময় বহুমুখী প্রতিভা বিকাশ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            কার্যক্রম ও সহশিক্ষা (Activities & Co-Curricular)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            কেবল মুখস্থবিদ্যা নয়; খেলাধুলা, ডিজিটাল প্রযুক্তির ব্যবহার, সঙ্গীত, নৃত্য, আবৃত্তি, বিতর্ক ও নাটিকার মাধ্যমে আমাদের শিশুরা গড়ে ওঠে আত্মবিশ্বাসী মানুষ হিসেবে।
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:text-emerald-900 border border-emerald-900/10 hover:bg-emerald-100/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between hover:border-emerald-300"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-xs border border-white/40">
                    {getCategoryIcon(activity.category)}
                    <span>{activity.category}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    {activity.date}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {activity.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* Highlights tags */}
              {activity.highlights && activity.highlights.length > 0 && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-emerald-800 font-medium">
                    {activity.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[200px]">{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative aspect-16/9 bg-slate-900 shrink-0">
              <img
                src={selectedActivity.imageUrl}
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-950 flex items-center gap-1.5 shadow-md">
                {getCategoryIcon(selectedActivity.category)}
                <span>{selectedActivity.category}</span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                {selectedActivity.date}
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {selectedActivity.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                {selectedActivity.description}
              </p>

              {selectedActivity.highlights && selectedActivity.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    মূল বৈশিষ্ট্য ও শিখনফল:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {selectedActivity.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
