import React, { useState } from 'react';
import { Users, GraduationCap, Phone, Mail, Calendar, Heart, Award, X, Sparkles } from 'lucide-react';
import { TeacherStaff, StaffRoleType } from '../types';

interface TeachersDirectoryProps {
  teachers: TeacherStaff[];
}

export const TeachersDirectory: React.FC<TeachersDirectoryProps> = ({ teachers }) => {
  const [activeFilter, setActiveFilter] = useState<'সকল' | StaffRoleType>('সকল');
  const [selectedStaff, setSelectedStaff] = useState<TeacherStaff | null>(null);

  const filtered = activeFilter === 'সকল'
    ? teachers
    : teachers.filter((t) => t.roleType === activeFilter);

  return (
    <section id="teachers" className="py-16 sm:py-20 bg-emerald-50/30 border-t border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>নিবেদিতপ্রাণ শিক্ষক ও কর্মচারীবৃন্দ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            শিক্ষক ও কর্মচারী পরিচিতি (Faculty & Staff)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয়ের সকল সম্মানিত শিক্ষক ও কর্মচারীদের তথ্য, শিক্ষাগত যোগ্যতা ও যোগাযোগের বিবরণ।
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pb-3 mb-8">
          {(['সকল', 'শিক্ষক', 'কর্মচারী'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-900/10 hover:bg-emerald-50'
              }`}
            >
              {filter === 'সকল' ? 'সকল সদস্য' : filter === 'শিক্ষক' ? 'শিক্ষকমণ্ডলী' : 'কর্মচারীবৃন্দ'}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((staff) => (
            <div
              key={staff.id}
              onClick={() => setSelectedStaff(staff)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all hover:border-emerald-400 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo Carrier */}
                <div className="relative aspect-square overflow-hidden bg-emerald-900/10">
                  <img
                    src={staff.photoUrl}
                    alt={staff.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-emerald-900 shadow-xs border border-emerald-900/10">
                    {staff.roleType}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {staff.designation}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 line-clamp-1 flex items-center gap-1.5 pt-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{staff.qualification}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{staff.phone}</span>
                    </div>
                    {staff.bloodGroup && (
                      <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        {staff.bloodGroup}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1">
                <span className="text-xs text-emerald-700 font-semibold group-hover:underline flex items-center justify-center gap-1 py-1 bg-emerald-50/50 rounded-lg">
                  সম্পূর্ণ বিবরণ দেখুন
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-bold">শিক্ষক ও কর্মচারী পরিচিতি</span>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-slate-200">
                <img
                  src={selectedStaff.photoUrl}
                  alt={selectedStaff.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-sm border-2 border-emerald-700"
                />
                <div className="text-center sm:text-left space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-semibold">
                    {selectedStaff.roleType}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedStaff.name}</h2>
                  <p className="text-xs font-semibold text-emerald-800">{selectedStaff.designation}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">শিক্ষাগত যোগ্যতা:</span>
                  <span className="font-semibold text-right">{selectedStaff.qualification}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">যোগদানের তারিখ:</span>
                  <span className="font-semibold font-mono text-right">{selectedStaff.joinDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">মোবাইল নম্বর:</span>
                  <a href={`tel:${selectedStaff.phone}`} className="font-semibold font-mono text-emerald-800 text-right hover:underline">
                    {selectedStaff.phone}
                  </a>
                </div>
                {selectedStaff.email && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">ইমেইল:</span>
                    <a href={`mailto:${selectedStaff.email}`} className="font-semibold font-mono text-emerald-800 text-right hover:underline">
                      {selectedStaff.email}
                    </a>
                  </div>
                )}
                {selectedStaff.bloodGroup && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">রক্তের গ্রুপ:</span>
                    <span className="font-bold text-red-600 text-right">{selectedStaff.bloodGroup}</span>
                  </div>
                )}
              </div>

              {selectedStaff.bio && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">দায়িত্ব ও সংক্ষিপ্ত বিবরণ:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {selectedStaff.bio}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg"
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
