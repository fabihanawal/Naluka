import React, { useState } from 'react';
import { PenTool, Heart, Sparkles, BookOpen, Image as ImageIcon, Send, X, Check } from 'lucide-react';
import { CreativePost, CreativeType } from '../types';
import { StorageService } from '../services/storageService';

interface CreativeCornerProps {
  creatives: CreativePost[];
}

const TYPES: ('সব' | CreativeType)[] = ['সব', 'কবিতা', 'চিত্রাঙ্কন', 'গল্প', 'দেয়ালিকা'];

export const CreativeCorner: React.FC<CreativeCornerProps> = ({ creatives }) => {
  const [selectedType, setSelectedType] = useState<'সব' | CreativeType>('সব');
  const [activePost, setActivePost] = useState<CreativePost | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New submission form state
  const [authorName, setAuthorName] = useState('');
  const [studentClass, setStudentClass] = useState('৪র্থ শ্রেণি');
  const [rollNo, setRollNo] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CreativeType>('কবিতা');
  const [content, setContent] = useState('');

  const filtered = selectedType === 'সব'
    ? creatives
    : creatives.filter((c) => c.type === selectedType);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    StorageService.likeCreative(id);
  };

  const handleCreateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !title.trim() || !content.trim()) return;

    StorageService.addCreative({
      title,
      type,
      authorName,
      studentClass,
      rollNo: rollNo.trim() || 'অনুল্লেখিত',
      content,
      date: new Date().toISOString().split('T')[0],
      imageUrl: type === 'চিত্রাঙ্কন' || type === 'দেয়ালিকা' 
        ? '/src/assets/images/creative_wall_magazine_1792171250145.jpg' 
        : undefined
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setTitle('');
      setAuthorName('');
      setRollNo('');
      setContent('');
    }, 1200);
  };

  return (
    <section id="creatives" className="py-16 sm:py-20 bg-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <PenTool className="w-4 h-4 text-emerald-700" />
              <span>শিশুদের রঙ ও কলমে ভাবনার প্রকাশ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              সৃজনশীল কর্নার ও দেয়ালিকা "আনন্দধারা"
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              নালুকাবাড়ি প্রাথমিক বিদ্যালয়ের ক্ষুদে লেখকদের কবিতা, ছড়া, স্বহস্তে আঁকা চিত্রকর্ম এবং গল্প নিয়ে আমাদের ভার্চুয়াল দেয়ালিকা।
            </p>
          </div>

          {/* Call to action for parents/students */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
          >
            <Send className="w-4 h-4" />
            <span>শিক্ষার্থীর লেখা বা আঁকা জমা দিন</span>
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedType === t
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-900/10 hover:bg-emerald-100/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bento / Wall-magazine Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePost(item)}
              className="group bg-white rounded-2xl border border-emerald-900/10 p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between hover:border-emerald-300 relative"
            >
              <div>
                {/* Visual if image exists */}
                {item.imageUrl && (
                  <div className="rounded-xl overflow-hidden aspect-16/10 mb-4 bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{item.studentClass}</span>
                    <span aria-hidden="true">·</span>
                    <span>রোল: {item.rollNo}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-4 leading-relaxed whitespace-pre-line font-serif">
                  {item.content}
                </p>
              </div>

              {/* Card Footer: Student Author + Like Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">স্রষ্টা শিক্ষার্থী</span>
                  <span className="font-bold text-slate-800">{item.authorName}</span>
                </div>

                <button
                  onClick={(e) => handleLike(e, item.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors font-semibold"
                  title="প্রশংসা করুন (Like)"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono text-xs">{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* View Post Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-bold">দেয়ালিকা "আনন্দধারা" সৃষ্টি</span>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {activePost.imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-16/10 bg-slate-100 shadow-xs">
                  <img
                    src={activePost.imageUrl}
                    alt={activePost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-900 mb-2">
                  {activePost.type}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>লেখক/শিল্পী: <strong className="text-slate-800">{activePost.authorName}</strong></span>
                  <span>·</span>
                  <span>{activePost.studentClass}</span>
                  <span>·</span>
                  <span>রোল: {activePost.rollNo}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-900/10 font-serif text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify">
                {activePost.content}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-mono">প্রকাশকাল: {activePost.date}</span>
                <button
                  onClick={(e) => handleLike(e, activePost.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>প্রশংসা করুন ({activePost.likes})</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setActivePost(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-200" />
                <span className="text-sm font-bold">শিক্ষার্থীর লেখা বা আঁকা জমা দিন</span>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">সফলভাবে জমা হয়েছে!</h3>
                  <p className="text-xs text-slate-600">
                    প্রধান শিক্ষক মহোদয় যাচাইয়ের পর এটি দেয়ালিকায় প্রকাশিত হবে। ধন্যবাদ!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateSubmission} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      শিক্ষার্থীর নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="উদা: মারিয়া আক্তার"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        শ্রেণি *
                      </label>
                      <select
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value="শিশু শ্রেণি">শিশু শ্রেণি (প্রাক-প্রাথমিক)</option>
                        <option value="১ম শ্রেণি">১ম শ্রেণি</option>
                        <option value="২য় শ্রেণি">২য় শ্রেণি</option>
                        <option value="৩য় শ্রেণি">৩য় শ্রেণি</option>
                        <option value="৪র্থ শ্রেণি">৪র্থ শ্রেণি</option>
                        <option value="৫ম শ্রেণি">৫ম শ্রেণি</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        রোল নং
                      </label>
                      <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="উদা: ০৪"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        সৃষ্টির ধরন *
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as CreativeType)}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value="কবিতা">কবিতা / ছড়া</option>
                        <option value="চিত্রাঙ্কন">চিত্রাঙ্কন বিবরণ</option>
                        <option value="গল্প">ছোটগল্প</option>
                        <option value="দেয়ালিকা">দেয়ালিকা লেখা</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        শিরোনাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="উদা: আমাদের পাঠশালা"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মূল লেখা বা চিত্রকর্মের বর্ণনা *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="এখানে কবিতা, ছড়া বা গল্প লিখুন..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-serif"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>জমা দিন</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
