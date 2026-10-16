import React, { useState } from 'react';
import { Bell, Search, Pin, Calendar, User, FileText, Download, Printer, X, ExternalLink } from 'lucide-react';
import { Notice, NoticeCategory } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
  selectedNotice: Notice | null;
  onSelectNotice: (notice: Notice | null) => void;
}

const CATEGORIES: ('সব' | NoticeCategory)[] = ['সব', 'জরুরি', 'ভর্তি', 'পরীক্ষা', 'ফলাফল', 'ছুটি', 'সাধারণ'];

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices,
  selectedNotice,
  onSelectNotice,
}) => {
  const [activeCategory, setActiveCategory] = useState<'সব' | NoticeCategory>('সব');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notices
  const filteredNotices = notices.filter((item) => {
    const matchesCategory = activeCategory === 'সব' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: NoticeCategory) => {
    switch (category) {
      case 'জরুরি':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'ভর্তি':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'পরীক্ষা':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'ছুটি':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'ফলাফল':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="notices" className="py-16 sm:py-20 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4 text-emerald-700" />
              <span>সর্বশেষ প্রাতিষ্ঠানিক তথ্য ও আদেশ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ডিজিটাল নোটিশ বোর্ড (Digital Notice Board)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              বিদ্যালয়ের ভর্তি, পরীক্ষা, ফলাফল ও প্রাতিষ্ঠানিক সকল জরুরি নির্দেশাবলি।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নোটিশ অনুসন্ধান করুন..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Tabs (Functional Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Grid / List */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700">কোনো নোটিশ পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">
              অনুগ্রহ করে অন্য শব্দ দিয়ে অনুসন্ধান করুন অথবা অন্য ক্যাটাগরি নির্বাচন করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className={`group bg-white p-5 rounded-2xl border transition-all cursor-pointer relative hover:shadow-md flex flex-col justify-between ${
                  notice.isPinned
                    ? 'border-emerald-700/40 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                {notice.isPinned && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    <Pin className="w-3 h-3 fill-current rotate-45" />
                    <span>পিনযুক্ত</span>
                  </div>
                )}

                <div>
                  {/* Unboxed Metadata with Typographic Separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${getCategoryBadgeClass(notice.category)}`}>
                      {notice.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {notice.publishedBy}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold group-hover:underline flex items-center gap-1">
                    সম্পূর্ণ নোটিশ পড়ুন <ExternalLink className="w-3 h-3" />
                  </span>
                  {notice.attachmentName && (
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {notice.attachmentName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Notice Detail / Printable Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-300" />
                <span className="text-sm font-bold">প্রাতিষ্ঠানিক অফিসিয়াল নোটিশ</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  title="নোটিশ প্রিন্ট করুন"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট</span>
                </button>
                <button
                  onClick={() => onSelectNotice(null)}
                  className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Styled like Official Primary School Letterhead */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0">
              {/* Official Header */}
              <div className="text-center pb-4 border-b-2 border-emerald-900/20">
                <div className="text-xs text-slate-500 font-medium">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                <h3 className="text-lg sm:text-xl font-bold text-emerald-950 mt-0.5">
                  নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়
                </h3>
                <p className="text-xs text-slate-600">
                  মথুরাপুর, বদলগাছী, নওগাঁ
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 bg-emerald-100/60 rounded text-xs font-semibold text-emerald-900">
                  ক্যাটাগরি: {selectedNotice.category} {selectedNotice.isPinned ? '(জরুরি)' : ''}
                </div>
              </div>

              {/* Title & Date */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-mono">
                  <span>স্মারক নং: নাসপ্রাবি/২০২৬/বিজ্ঞপ্তি</span>
                  <span>তারিখ: {selectedNotice.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedNotice.title}
                </h2>
              </div>

              {/* Content Prose */}
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-justify">
                {selectedNotice.content}
              </div>

              {/* Signature Seal */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                <div className="text-xs text-slate-500">
                  {selectedNotice.attachmentName && (
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Download className="w-4 h-4" />
                      <span>সংযুক্ত ফাইল: {selectedNotice.attachmentName}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-sm">{selectedNotice.publishedBy}</div>
                  <div className="text-xs text-emerald-800">নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়</div>
                  <div className="text-[11px] text-slate-500">বদলগাছী, নওগাঁ</div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => onSelectNotice(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
