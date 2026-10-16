import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, User, Building, HeartHandshake } from 'lucide-react';
import { HeadmasterInfo } from '../types';

interface ContactAndLocationProps {
  headmaster: HeadmasterInfo;
}

export const ContactAndLocation: React.FC<ContactAndLocationProps> = ({ headmaster }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>ঠিকানা ও সরাসরি যোগাযোগ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            যোগাযোগ ও অবস্থান (Location & Contact)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়ে আপনার সন্তানের ভর্তি, তথ্য অনুসন্ধান বা যে কোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        {/* 2-Column Split: Info & Map + Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Contacts & Map Embed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">বিদ্যালয়ের পূর্ণ ঠিকানা</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  গ্রাম: নালুকাবাড়ি, ডাকঘর: মথুরাপুর,<br />
                  উপজেলা: বদলগাছী, জেলা: নওগাঁ, রাজশাহী বিভাগ।
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">দাপ্তরিক ও পাঠদান সময়</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  রবিবার হতে বৃহস্পতিবার:<br />
                  সকাল ৯:০০ ঘটিকা - বিকাল ৪:০০ ঘটিকা<br />
                  (শুক্রবার ও শনিবার সাপ্তাহিক ছুটি)
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">সরাসরি ফোন ও হোয়াটসঅ্যাপ</h3>
                <p className="text-xs text-slate-600">
                  প্রধান শিক্ষক (মোঃ রশিদুল ইসলাম):<br />
                  <a href={`tel:${headmaster.phone}`} className="font-mono text-emerald-800 font-semibold hover:underline">
                    {headmaster.phone}
                  </a>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">ইমেইল যোগাযোগ</h3>
                <p className="text-xs text-slate-600">
                  অফিসিয়াল ইমেইল বার্তা:<br />
                  <a href={`mailto:${headmaster.email}`} className="font-mono text-emerald-800 font-semibold hover:underline truncate block">
                    {headmaster.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Google Maps Responsive Embed centered at Badalgachhi / Mathurapur */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="relative w-full h-[260px] rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  title="নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয় গুগল ম্যাপ অবস্থান"
                  src="https://maps.google.com/maps?q=Badalgachhi,Naogaon,Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-2 text-center text-[11px] text-slate-500">
                মানচিত্রে অবস্থান: মথুরাপুর ইউনিয়ন, বদলগাছী, নওগাঁ (নালুকাবাড়ি গ্রাম)
              </div>
            </div>

          </div>

          {/* Right Column: Admission & Inquiry Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>অভিভাবক অনুসন্ধান ও বার্তা প্রেরণ</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                সরাসরি মেসেজ বা ভর্তির আবেদন
              </h3>
              <p className="text-xs text-slate-600 mt-1 mb-6">
                আপনার সন্তানের ভর্তি বা যে কোনো পরামর্শ জানাতে নিচের ফর্মটি পূরণ করুন। প্রধান শিক্ষক মহোদয়ের নিকট তা সরাসরি পৌঁছে যাবে।
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-sm">বার্তা সফলভাবে গৃহীত হয়েছে!</h4>
                  <p className="text-xs text-slate-600">
                    ধন্যবাদ। আপনার বার্তার প্রেক্ষিতে প্রধান শিক্ষক কার্যালয় থেকে দ্রুত যোগাযোগ করা হবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      অভিভাবক বা শিক্ষার্থীর নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="০১৭xxxxxxxx"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার বার্তা বা জিজ্ঞাস্য *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="ভর্তি সংক্রান্ত প্রশ্ন, শিশুর বয়স, শ্রেণি বা সাধারণ মন্তব্য..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>বার্তা পাঠান</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                জরুরি প্রয়োজনে সরাসরি প্রধান শিক্ষকের সাথে মুঠোফোনে কথা বলুন।
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
