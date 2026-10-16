import React, { useState, useEffect } from 'react';
import { 
  Shield, Bell, Plus, Trash2, Edit3, Pin, Check, X, ArrowLeft, 
  LogOut, Sparkles, Image as ImageIcon, PenTool, LayoutDashboard, 
  Save, RotateCcw, Download, Upload, Eye, FileText, UserCheck, 
  Users, Phone, Mail, Camera, AlertCircle, Loader2 
} from 'lucide-react';
import { 
  Notice, NoticeCategory, Activity, ActivityCategory, 
  CreativePost, CreativeType, GalleryItem, HeadmasterInfo, 
  SchoolStats, TeacherStaff, StaffRoleType 
} from '../types';
import { StorageService } from '../services/storageService';
import { compressImageFile } from '../utils/imageCompressor';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
  notices: Notice[];
  activities: Activity[];
  creatives: CreativePost[];
  gallery: GalleryItem[];
  headmaster: HeadmasterInfo;
  stats: SchoolStats;
  teachers: TeacherStaff[];
}

type TabType = 'overview' | 'headmaster' | 'teachers' | 'notices' | 'activities' | 'creatives' | 'gallery' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onLogout,
  notices,
  activities,
  creatives,
  gallery,
  headmaster,
  stats,
  teachers,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('headmaster');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Safe image compressor wrapper
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      // Compress the image down to web-optimized dimensions (~30KB-60KB)
      // This eliminates localStorage quota limits completely!
      const compressedDataUrl = await compressImageFile(file, 720, 720, 0.85);
      onSuccess(compressedDataUrl);
      showSuccess('ছবিটি সফলভাবে প্রসেস ও সংযুক্ত করা হয়েছে! সংরক্ষণ করতে নিচের "সংরক্ষণ করুন" বাটনে ক্লিক করুন।');
    } catch (err: any) {
      alert(err.message || 'ছবি আপলোড করতে সমস্যা হয়েছে।');
    } finally {
      setIsProcessingImage(false);
      // Reset input value so same file can be re-selected if needed
      e.target.value = '';
    }
  };

  // ==========================================
  // 1. HEADMASTER PROFILE & PHOTO UPLOAD STATE
  // ==========================================
  const [hmName, setHmName] = useState(headmaster.name);
  const [hmDesignation, setHmDesignation] = useState(headmaster.designation);
  const [hmQuote, setHmQuote] = useState(headmaster.quote);
  const [hmPhone, setHmPhone] = useState(headmaster.phone);
  const [hmEmail, setHmEmail] = useState(headmaster.email);
  const [hmQualifications, setHmQualifications] = useState(headmaster.qualifications);
  const [hmPhotoUrl, setHmPhotoUrl] = useState(headmaster.photoUrl);
  const [hmMessage, setHmMessage] = useState(headmaster.fullMessage.join('\n\n'));
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Sync state if headmaster prop updates
  useEffect(() => {
    setHmName(headmaster.name);
    setHmDesignation(headmaster.designation);
    setHmQuote(headmaster.quote);
    setHmPhone(headmaster.phone);
    setHmEmail(headmaster.email);
    setHmQualifications(headmaster.qualifications);
    setHmPhotoUrl(headmaster.photoUrl);
    setHmMessage(headmaster.fullMessage.join('\n\n'));
  }, [headmaster]);

  const handleSaveHeadmaster = (e: React.FormEvent) => {
    e.preventDefault();
    const splitMessages = hmMessage
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const updatedHeadmaster: HeadmasterInfo = {
      ...headmaster,
      name: hmName.trim(),
      designation: hmDesignation.trim(),
      quote: hmQuote.trim(),
      phone: hmPhone.trim(),
      email: hmEmail.trim(),
      qualifications: hmQualifications.trim(),
      photoUrl: hmPhotoUrl,
      fullMessage: splitMessages.length > 0 ? splitMessages : headmaster.fullMessage
    };

    // Save to storage (also automatically syncs Headmaster entry in Teachers list)
    StorageService.saveHeadmasterInfo(updatedHeadmaster);
    setHmPhotoUrl(updatedHeadmaster.photoUrl);
    
    const nowTime = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSavedTime(nowTime);
    showSuccess(`প্রধান শিক্ষকের নতুন ছবি ও তথ্য স্থায়ীভাবে সংরক্ষিত হয়েছে (সময়: ${nowTime})!`);
  };

  // ==========================================
  // 2. TEACHERS & STAFF MANAGEMENT STATE
  // ==========================================
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherDesignation, setTeacherDesignation] = useState('');
  const [teacherRoleType, setTeacherRoleType] = useState<StaffRoleType>('শিক্ষক');
  const [teacherQualification, setTeacherQualification] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherBlood, setTeacherBlood] = useState('B+');
  const [teacherJoinDate, setTeacherJoinDate] = useState('২০২০-০১-০১');
  const [teacherPhotoUrl, setTeacherPhotoUrl] = useState('/src/assets/images/teacher_male_portrait_1792174078179.jpg');
  const [teacherBio, setTeacherBio] = useState('');

  const resetTeacherForm = () => {
    setEditingTeacherId(null);
    setTeacherName('');
    setTeacherDesignation('');
    setTeacherRoleType('শিক্ষক');
    setTeacherQualification('');
    setTeacherPhone('');
    setTeacherEmail('');
    setTeacherBlood('B+');
    setTeacherJoinDate('২০২০-০১-০১');
    setTeacherPhotoUrl('/src/assets/images/teacher_male_portrait_1792174078179.jpg');
    setTeacherBio('');
  };

  const handleEditTeacherClick = (t: TeacherStaff) => {
    setEditingTeacherId(t.id);
    setTeacherName(t.name);
    setTeacherDesignation(t.designation);
    setTeacherRoleType(t.roleType);
    setTeacherQualification(t.qualification);
    setTeacherPhone(t.phone);
    setTeacherEmail(t.email || '');
    setTeacherBlood(t.bloodGroup || 'B+');
    setTeacherJoinDate(t.joinDate);
    setTeacherPhotoUrl(t.photoUrl);
    setTeacherBio(t.bio || '');
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherDesignation.trim()) return;

    if (editingTeacherId) {
      StorageService.updateTeacher(editingTeacherId, {
        name: teacherName.trim(),
        designation: teacherDesignation.trim(),
        roleType: teacherRoleType,
        qualification: teacherQualification.trim(),
        phone: teacherPhone.trim(),
        email: teacherEmail.trim() || undefined,
        bloodGroup: teacherBlood,
        joinDate: teacherJoinDate,
        photoUrl: teacherPhotoUrl,
        bio: teacherBio.trim() || undefined,
      });
      showSuccess('শিক্ষক/কর্মচারীর তথ্য ও ছবি সফলভাবে হালনাগাদ করা হয়েছে!');
    } else {
      StorageService.addTeacher({
        name: teacherName.trim(),
        designation: teacherDesignation.trim(),
        roleType: teacherRoleType,
        qualification: teacherQualification.trim(),
        phone: teacherPhone.trim(),
        email: teacherEmail.trim() || undefined,
        bloodGroup: teacherBlood,
        joinDate: teacherJoinDate,
        photoUrl: teacherPhotoUrl,
        bio: teacherBio.trim() || undefined,
        order: teachers.length + 1
      });
      showSuccess('নতুন শিক্ষক/কর্মচারী সফলভাবে তালিকায় যুক্ত করা হয়েছে!');
    }
    resetTeacherForm();
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('আপনি কি নিশ্চিতভাবে এই সদস্যকে তালিকা থেকে মুছে ফেলতে চান?')) {
      StorageService.deleteTeacher(id);
      showSuccess('সদস্য মুছে ফেলা হয়েছে!');
    }
  };

  // ==========================================
  // 3. NOTICE STATE
  // ==========================================
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<NoticeCategory>('সাধারণ');
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split('T')[0]);
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeIsPinned, setNoticeIsPinned] = useState(false);
  const [noticeAttachment, setNoticeAttachment] = useState('');

  const resetNoticeForm = () => {
    setEditingNoticeId(null);
    setNoticeTitle('');
    setNoticeCategory('সাধারণ');
    setNoticeDate(new Date().toISOString().split('T')[0]);
    setNoticeContent('');
    setNoticeIsPinned(false);
    setNoticeAttachment('');
  };

  const handleEditNoticeClick = (n: Notice) => {
    setEditingNoticeId(n.id);
    setNoticeTitle(n.title);
    setNoticeCategory(n.category);
    setNoticeDate(n.date);
    setNoticeContent(n.content);
    setNoticeIsPinned(n.isPinned);
    setNoticeAttachment(n.attachmentName || '');
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    if (editingNoticeId) {
      StorageService.updateNotice(editingNoticeId, {
        title: noticeTitle.trim(),
        category: noticeCategory,
        date: noticeDate,
        content: noticeContent.trim(),
        isPinned: noticeIsPinned,
        attachmentName: noticeAttachment.trim() || undefined,
      });
      showSuccess('নোটিশ সফলভাবে হালনাগাদ করা হয়েছে!');
    } else {
      StorageService.addNotice({
        title: noticeTitle.trim(),
        category: noticeCategory,
        date: noticeDate,
        content: noticeContent.trim(),
        isPinned: noticeIsPinned,
        publishedBy: 'প্রধান শিক্ষক',
        attachmentName: noticeAttachment.trim() || undefined,
      });
      showSuccess('নতুন নোটিশ সফলভাবে প্রকাশ করা হয়েছে!');
    }
    resetNoticeForm();
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm('আপনি কি নিশ্চিতভাবে এই নোটিশটি মুছে ফেলতে চান?')) {
      StorageService.deleteNotice(id);
      showSuccess('নোটিশ মুছে ফেলা হয়েছে!');
    }
  };

  // ==========================================
  // 4. ACTIVITIES STATE
  // ==========================================
  const [activityTitle, setActivityTitle] = useState('');
  const [activityCategory, setActivityCategory] = useState<ActivityCategory>('ডিজিটাল ক্লাস');
  const [activityDesc, setActivityDesc] = useState('');
  const [activityDate, setActivityDate] = useState('নিয়মিত দৈনিক কার্যক্রম');
  const [activityImageUrl, setActivityImageUrl] = useState('/src/assets/images/digital_classroom_kids_1792171250216.jpg');

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim() || !activityDesc.trim()) return;

    StorageService.addActivity({
      title: activityTitle.trim(),
      category: activityCategory,
      description: activityDesc.trim(),
      date: activityDate.trim(),
      imageUrl: activityImageUrl,
      highlights: ['নালুকাবাড়ি প্রাথমিক বিদ্যালয়ের বিশেষ সহশিক্ষা চর্চা']
    });

    showSuccess('নতুন কার্যক্রম সফলভাবে যুক্ত করা হয়েছে!');
    setActivityTitle('');
    setActivityDesc('');
  };

  // ==========================================
  // 5. CREATIVES STATE
  // ==========================================
  const [creativeTitle, setCreativeTitle] = useState('');
  const [creativeAuthor, setCreativeAuthor] = useState('');
  const [creativeClass, setCreativeClass] = useState('৫ম শ্রেণি');
  const [creativeRoll, setCreativeRoll] = useState('০৭');
  const [creativeType, setCreativeType] = useState<CreativeType>('কবিতা');
  const [creativeContent, setCreativeContent] = useState('');

  const handleSaveCreative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creativeTitle.trim() || !creativeContent.trim()) return;

    StorageService.addCreative({
      title: creativeTitle.trim(),
      type: creativeType,
      authorName: creativeAuthor.trim(),
      studentClass: creativeClass,
      rollNo: creativeRoll.trim(),
      content: creativeContent.trim(),
      date: new Date().toISOString().split('T')[0],
      imageUrl: creativeType === 'চিত্রাঙ্কন' ? '/src/assets/images/creative_wall_magazine_1792171250145.jpg' : undefined
    });

    showSuccess('শিক্ষার্থীর নতুন সৃষ্টি সফলভাবে দেয়ালিকায় যুক্ত করা হয়েছে!');
    setCreativeTitle('');
    setCreativeAuthor('');
    setCreativeContent('');
  };

  // ==========================================
  // 6. GALLERY STATE
  // ==========================================
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'ক্যাম্পাস' | 'সমাবেশ ও পিটি' | 'ডিজিটাল ক্লাস' | 'সাংস্কৃতিক উৎসব' | 'ক্রীড়া ও খেলাধুলা' | 'দেয়ালিকা'>('ক্যাম্পাস');
  const [galleryUrl, setGalleryUrl] = useState('/src/assets/images/school_campus_hero_1792171248217.jpg');
  const [galleryCaption, setGalleryCaption] = useState('');

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryUrl.trim()) return;

    StorageService.addGalleryItem({
      title: galleryTitle.trim(),
      category: galleryCategory,
      mediaUrl: galleryUrl,
      mediaType: 'image',
      caption: galleryCaption.trim(),
      date: new Date().toISOString().split('T')[0]
    });

    showSuccess('গ্যালারিতে নতুন আলোকচিত্র সংযুক্ত হয়েছে!');
    setGalleryTitle('');
    setGalleryCaption('');
  };

  // ==========================================
  // 7. STATS EDIT STATE
  // ==========================================
  const [statStudents, setStatStudents] = useState(stats.totalStudents);
  const [statTeachers, setStatTeachers] = useState(stats.totalTeachers);
  const [statPassRate, setStatPassRate] = useState(stats.passRate);

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveStats({
      ...stats,
      totalStudents: Number(statStudents),
      totalTeachers: Number(statTeachers),
      passRate: Number(statPassRate)
    });
    showSuccess('স্কুল পরিসংখ্যান সফলভাবে হালনাগাদ করা হয়েছে!');
  };

  // Backup & Import
  const handleExportJSON = () => {
    const jsonStr = StorageService.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nalukabari_gps_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccess('সম্পূর্ণ ব্যাকআপ ফাইল ডাউনলোড হয়েছে!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      const ok = StorageService.importBackup(content);
      if (ok) {
        showSuccess('ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!');
      } else {
        alert('ফাইলটি সঠিক ফরম্যাটে নেই!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Admin App Bar */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">
                প্রধান শিক্ষক অ্যাডমিন কন্ট্রোল প্যানেল
              </h1>
              <p className="text-[11px] text-emerald-300">
                নালুকাবাড়ি সরকারি প্রাথমিক বিদ্যালয় (মথুরাপুর, বদলগাছী, নওগাঁ)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ওয়েবসাইট দেখুন</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-800/80 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="bg-emerald-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center animate-in slide-in-from-top-2 flex items-center justify-center gap-2 shadow-sm">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>ওভারভিউ</span>
          </button>

          <button
            onClick={() => setActiveTab('headmaster')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'headmaster'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>প্রধান শিক্ষক তথ্য ও ছবি</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'teachers'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>শিক্ষক ও কর্মচারী ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'notices'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>নোটিশ ব্যবস্থাপনা ({notices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'activities'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>কার্যক্রম ({activities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('creatives')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'creatives'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>দেয়ালিকা ({creatives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>ফটোগ্যালারি ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === 'backup'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>ব্যাকআপ ও রিস্টোর</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium">প্রধান শিক্ষক</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{headmaster.name}</div>
                <button
                  onClick={() => setActiveTab('headmaster')}
                  className="text-xs text-emerald-700 font-semibold mt-2 hover:underline block"
                >
                  ছবি ও তথ্য হালনাগাদ →
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium">শিক্ষক ও কর্মচারীবৃন্দ</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{teachers.length} জন</div>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className="text-xs text-emerald-700 font-semibold mt-2 hover:underline block"
                >
                  তালিকা ও ছবি আপলোড →
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium">সক্রিয় নোটিশ</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{notices.length} টি</div>
                <button
                  onClick={() => setActiveTab('notices')}
                  className="text-xs text-emerald-700 font-semibold mt-2 hover:underline block"
                >
                  ব্যবস্থাপনা করুন →
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium">গ্যালারি আলোকচিত্র</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{gallery.length} টি</div>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-xs text-emerald-700 font-semibold mt-2 hover:underline block"
                >
                  ব্যবস্থাপনা করুন →
                </button>
              </div>
            </div>

            {/* Quick Stats Editor */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                বিদ্যালয়ের মূল পরিসংখ্যান সংশোধন
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                পোর্টালের হোমপেজে প্রদর্শিত মোট শিক্ষার্থী, শিক্ষক ও পাসের হার হালনাগাদ করুন।
              </p>

              <form onSubmit={handleSaveStats} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোট শিক্ষার্থী সংখ্যা
                  </label>
                  <input
                    type="number"
                    value={statStudents}
                    onChange={(e) => setStatStudents(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোট শিক্ষক সংখ্যা
                  </label>
                  <input
                    type="number"
                    value={statTeachers}
                    onChange={(e) => setStatTeachers(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মূল্যায়ন সাফল্য / পাস (%)
                  </label>
                  <input
                    type="number"
                    value={statPassRate}
                    onChange={(e) => setStatPassRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>পরিসংখ্যান সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Headmaster Profile & Photo Upload (Primary Fix) */}
        {activeTab === 'headmaster' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs max-w-4xl">
            <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  প্রধান শিক্ষক মহোদয়ের তথ্য ও ছবি আপলোড / পরিবর্তন
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ছবি আপলোড করার পর নিচে <span className="text-emerald-800 font-bold">"প্রধান শিক্ষকের তথ্য ও ছবি সংরক্ষণ করুন"</span> বাটনে ক্লিক করলেই তা স্থায়ীভাবে সংরক্ষিত থাকবে।
                </p>
              </div>

              {lastSavedTime && (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>সংরক্ষিত: {lastSavedTime}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveHeadmaster} className="space-y-6">
              
              {/* Photo Upload Section */}
              <div className="p-5 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/70 rounded-2xl border-2 border-emerald-900/20 shadow-xs flex flex-col sm:flex-row items-center gap-6">
                
                {/* Live Preview Box */}
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-3 border-emerald-700 shadow-md bg-white shrink-0">
                  <img
                    src={hmPhotoUrl}
                    alt={hmName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isProcessingImage && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-300 mb-1" />
                      <span>প্রসেসিং...</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 right-1 bg-emerald-950/80 backdrop-blur-xs text-white text-[10px] text-center py-0.5 rounded">
                    বর্তমান ছবি
                  </div>
                </div>

                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-700" />
                      <span>প্রধান শিক্ষকের ছবি আপলোড করুন</span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      মোবাইল বা কম্পিউটার হতে নতুন ছবি নির্বাচন করুন (স্বয়ংক্রিয়ভাবে সর্বোত্তম সাইজে কমপ্রেস হবে)।
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                    <label className={`cursor-pointer px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm hover:shadow transition-all ${
                      isProcessingImage ? 'opacity-50 pointer-events-none' : ''
                    }`}>
                      <Camera className="w-4 h-4" />
                      <span>ডিভাইস হতে নতুন ছবি নির্বাচন করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (dataUrl) => setHmPhotoUrl(dataUrl))}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setHmPhotoUrl('/src/assets/images/headmaster_desk_1792171248835.jpg');
                        showSuccess('ডিফল্ট ফটো নির্বাচিত হয়েছে। সংরক্ষণ করতে নিচের বাটনে ক্লিক করুন।');
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors"
                    >
                      ডিফল্ট ছবি
                    </button>
                  </div>

                  <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      ছবি আপলোড সম্পন্ন হলে নিচে <strong>"প্রধান শিক্ষকের তথ্য ও ছবি সংরক্ষণ করুন"</strong> বাটনে অবশ্যই ক্লিক করতে হবে।
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    প্রধান শিক্ষকের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={hmName}
                    onChange={(e) => setHmName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পদবী *
                  </label>
                  <input
                    type="text"
                    required
                    value={hmDesignation}
                    onChange={(e) => setHmDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষাগত যোগ্যতা ও ডিগ্রি *
                  </label>
                  <input
                    type="text"
                    required
                    value={hmQualifications}
                    onChange={(e) => setHmQualifications(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    value={hmPhone}
                    onChange={(e) => setHmPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    value={hmEmail}
                    onChange={(e) => setHmEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    অনলাইন ফটো URL (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    value={hmPhotoUrl}
                    onChange={(e) => setHmPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  প্রধান বাণী / মূল উক্তি (Featured Quote) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={hmQuote}
                  onChange={(e) => setHmQuote(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  অভিভাবকদের প্রতি প্রধান শিক্ষকের পূর্ণাঙ্গ বার্তা (প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার দিন)
                </label>
                <textarea
                  rows={6}
                  value={hmMessage}
                  onChange={(e) => setHmMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans leading-relaxed"
                />
              </div>

              {/* Prominent Save Button with Status */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 text-center sm:text-left">
                  সংরক্ষণে ক্লিক করলে হোমপেজ, প্রধান শিক্ষকের কর্নার ও শিক্ষক তালিকায় ছবি সাথে সাথে আপডেট হয়ে যাবে।
                </span>

                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>প্রধান শিক্ষকের তথ্য ও ছবি সংরক্ষণ করুন</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab 3: Teachers and Staff Management */}
        {activeTab === 'teachers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Create / Edit Teacher Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  {editingTeacherId ? 'শিক্ষক/কর্মচারীর তথ্য সংশোধন' : 'নতুন শিক্ষক/কর্মচারী যোগ করুন'}
                </h3>
                {editingTeacherId && (
                  <button
                    type="button"
                    onClick={resetTeacherForm}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    বাতিল
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveTeacher} className="space-y-4">
                
                {/* Photo Upload Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                  <img
                    src={teacherPhotoUrl}
                    alt="প্রিভিউ"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-300 shrink-0"
                  />
                  <div className="space-y-1.5 flex-1">
                    <span className="text-xs font-semibold text-slate-700 block">সদস্যের ছবি আপলোড</span>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>ছবি আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (dataUrl) => setTeacherPhotoUrl(dataUrl))}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="উদা: মোছাঃ পারভীন আক্তার"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সদস্যের ধরন
                    </label>
                    <select
                      value={teacherRoleType}
                      onChange={(e) => setTeacherRoleType(e.target.value as StaffRoleType)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="শিক্ষক">শিক্ষক</option>
                      <option value="কর্মচারী">কর্মচারী</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      পদবী *
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherDesignation}
                      onChange={(e) => setTeacherDesignation(e.target.value)}
                      placeholder="উদা: সহকারী শিক্ষক (গণিত)"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      শিক্ষাগত যোগ্যতা
                    </label>
                    <input
                      type="text"
                      value={teacherQualification}
                      onChange={(e) => setTeacherQualification(e.target.value)}
                      placeholder="বি.এসসি, বি.এড"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      value={teacherPhone}
                      onChange={(e) => setTeacherPhone(e.target.value)}
                      placeholder="০১৭১২-xxxxxx"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      রক্তের গ্রুপ
                    </label>
                    <select
                      value={teacherBlood}
                      onChange={(e) => setTeacherBlood(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      যোগদানের তারিখ
                    </label>
                    <input
                      type="date"
                      value={teacherJoinDate}
                      onChange={(e) => setTeacherJoinDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="teacher@gmail.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    দায়িত্ব ও সংক্ষিপ্ত বিবরণ (Bio)
                  </label>
                  <textarea
                    rows={2}
                    value={teacherBio}
                    onChange={(e) => setTeacherBio(e.target.value)}
                    placeholder="বিষয় শিক্ষক, সাংস্কৃতিক সমন্বয়ক ইত্যাদি..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingTeacherId ? 'হালনাগাদ সংরক্ষণ করুন' : 'তালিকায় যুক্ত করুন'}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Existing Teachers and Staff List */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                সকল শিক্ষক ও কর্মচারীদের তালিকা ({teachers.length})
              </h3>

              <div className="space-y-3">
                {teachers.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-300 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {t.roleType}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{t.phone}</span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-0.5">
                          {t.name}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {t.designation} · {t.qualification}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditTeacherClick(t)}
                        className="p-1.5 bg-white text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-lg hover:bg-slate-100"
                        title="সংশোধন করুন"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(t.id)}
                        className="p-1.5 bg-white text-red-600 hover:text-red-700 border border-slate-200 rounded-lg hover:bg-red-50"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Notice Management */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Notice Create/Edit Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  {editingNoticeId ? 'নোটিশ সংশোধন করুন' : 'নতুন নোটিশ প্রকাশ করুন'}
                </h3>
                {editingNoticeId && (
                  <button
                    type="button"
                    onClick={resetNoticeForm}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    বাতিল
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveNotice} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    নোটিশ শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="উদা: নতুন শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value as NoticeCategory)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="সাধারণ">সাধারণ</option>
                      <option value="জরুরি">জরুরি</option>
                      <option value="ভর্তি">ভর্তি</option>
                      <option value="পরীক্ষা">পরীক্ষা</option>
                      <option value="ফলাফল">ফলাফল</option>
                      <option value="ছুটি">ছুটি</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      প্রকাশের তারিখ
                    </label>
                    <input
                      type="date"
                      value={noticeDate}
                      onChange={(e) => setNoticeDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    নোটিশের পূর্ণ বিবরণ *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="নোটিশের বিস্তারিত বার্তা এখানে লিখুন..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    সংযুক্ত ফাইল বা পিডিএফের নাম (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={noticeAttachment}
                    onChange={(e) => setNoticeAttachment(e.target.value)}
                    placeholder="উদা: Routine_2026.pdf"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={noticeIsPinned}
                    onChange={(e) => setNoticeIsPinned(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-600"
                  />
                  <label htmlFor="isPinned" className="text-xs font-medium text-slate-700">
                    হোমপেজের শীর্ষে পিন করে রাখুন (Pinned Notice)
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingNoticeId ? 'পরিবর্তন সংরক্ষণ করুন' : 'নোটিশ প্রকাশ করুন'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Notices Table */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                বর্তমান নোটিশ তালিকা ({notices.length})
              </h3>

              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span>·</span>
                        <span className="font-mono">{n.date}</span>
                        {n.isPinned && (
                          <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                            <Pin className="w-3 h-3 fill-current rotate-45" /> পিনযুক্ত
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {n.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => StorageService.togglePinNotice(n.id)}
                        className={`p-1.5 rounded-lg border text-xs ${
                          n.isPinned
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="পিন / আনপিন করুন"
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditNoticeClick(n)}
                        className="p-1.5 bg-white text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-lg hover:bg-slate-100"
                        title="সংশোধন করুন"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        className="p-1.5 bg-white text-red-600 hover:text-red-700 border border-slate-200 rounded-lg hover:bg-red-50"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 5: Activities Management */}
        {activeTab === 'activities' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Create Activity */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                নতুন সহশিক্ষা কার্যক্রম বা অর্জন যোগ করুন
              </h3>

              <form onSubmit={handleSaveActivity} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    কার্যক্রমের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    placeholder="উদা: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ক্যাটাগরি
                    </label>
                    <select
                      value={activityCategory}
                      onChange={(e) => setActivityCategory(e.target.value as ActivityCategory)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="ডিজিটাল ক্লাস">ডিজিটাল ক্লাস</option>
                      <option value="শারীরিক কসরত ও পিটি">শারীরিক কসরত ও পিটি</option>
                      <option value="খেলাধুলা">খেলাধুলা</option>
                      <option value="গান ও নাচ">গান ও নাচ</option>
                      <option value="চিত্রাঙ্কন">চিত্রাঙ্কন</option>
                      <option value="আবৃত্তি ও বক্তৃতা">আবৃত্তি ও বক্তৃতা</option>
                      <option value="ক্ষুদে বিতর্ক">ক্ষুদে বিতর্ক</option>
                      <option value="নাটিকা ও অন্যান্য">নাটিকা ও অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সময়সূচি
                    </label>
                    <input
                      type="text"
                      value={activityDate}
                      onChange={(e) => setActivityDate(e.target.value)}
                      placeholder="উদা: প্রতি বৃহস্পতিবার"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছবির উৎস
                  </label>
                  <select
                    value={activityImageUrl}
                    onChange={(e) => setActivityImageUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="/src/assets/images/digital_classroom_kids_1792171250216.jpg">ডিজিটাল ক্লাসরুম দৃশ্য</option>
                    <option value="/src/assets/images/student_assembly_exercise_1792171249970.jpg">সকালবেলার সমাবেশ ও পিটি</option>
                    <option value="/src/assets/images/school_campus_hero_1792171248217.jpg">সবুজ মাঠ ও ফুটবল খেলার দৃশ্য</option>
                    <option value="/src/assets/images/creative_wall_magazine_1792171250145.jpg">দেয়ালিকা ও সাংস্কৃতিক চিত্র</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    কার্যক্রমের বিস্তারিত বর্ণনা *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={activityDesc}
                    onChange={(e) => setActivityDesc(e.target.value)}
                    placeholder="শিশুরা কীভাবে এতে অংশগ্রহণ করে ও কী শেখে..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>কার্যক্রম যুক্ত করুন</span>
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                বিদ্যমান কার্যক্রম তালিকা ({activities.length})
              </h3>
              <div className="space-y-3">
                {activities.map((a) => (
                  <div
                    key={a.id}
                    className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {a.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mt-0.5">
                          {a.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('মুছে ফেলতে চান?')) {
                          StorageService.deleteActivity(a.id);
                          showSuccess('কার্যক্রম মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: Creatives */}
        {activeTab === 'creatives' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Add creative */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                সৃজনশীল দেয়ালিকায় নতুন কবিতা বা চিত্রকর্ম যোগ করুন
              </h3>

              <form onSubmit={handleSaveCreative} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষার্থীর নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={creativeAuthor}
                    onChange={(e) => setCreativeAuthor(e.target.value)}
                    placeholder="উদা: সায়মা আক্তার"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      শ্রেণি
                    </label>
                    <select
                      value={creativeClass}
                      onChange={(e) => setCreativeClass(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="শিশু শ্রেণি">শিশু শ্রেণি</option>
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
                      value={creativeRoll}
                      onChange={(e) => setCreativeRoll(e.target.value)}
                      placeholder="০৫"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ধরন
                    </label>
                    <select
                      value={creativeType}
                      onChange={(e) => setCreativeType(e.target.value as CreativeType)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="কবিতা">কবিতা</option>
                      <option value="চিত্রাঙ্কন">চিত্রাঙ্কন</option>
                      <option value="গল্প">গল্প</option>
                      <option value="দেয়ালিকা">দেয়ালিকা</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      শিরোনাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={creativeTitle}
                      onChange={(e) => setCreativeTitle(e.target.value)}
                      placeholder="উদা: আমার প্রিয় পাঠশালা"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    লেখা / বিষয়বস্তু *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={creativeContent}
                    onChange={(e) => setCreativeContent(e.target.value)}
                    placeholder="কবিতা বা গল্পের চরণগুলো লিখুন..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-serif"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>দেয়ালিকা বোর্ডে প্রকাশ করুন</span>
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                প্রকাশিত সৃষ্টিসমূহ ({creatives.length})
              </h3>
              <div className="space-y-3">
                {creatives.map((cp) => (
                  <div
                    key={cp.id}
                    className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {cp.type}
                        </span>
                        <span>·</span>
                        <span>{cp.authorName} ({cp.studentClass})</span>
                        <span>·</span>
                        <span>লাইক: {cp.likes}</span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1">
                        {cp.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('এই পোস্টটি দেয়ালিকা থেকে মুছে ফেলতে চান?')) {
                          StorageService.deleteCreative(cp.id);
                          showSuccess('পোস্ট মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 7: Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Add Photo */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                গ্যালারিতে নতুন ছবি যোগ করুন
              </h3>

              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছবির শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    placeholder="উদা: পুরস্কার বিতরণী অনুষ্ঠান ২০২৬"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="ক্যাম্পাস">ক্যাম্পাস</option>
                    <option value="সমাবেশ ও পিটি">সমাবেশ ও পিটি</option>
                    <option value="ডিজিটাল ক্লাস">ডিজিটাল ক্লাস</option>
                    <option value="সাংস্কৃতিক উৎসব">সাংস্কৃতিক উৎসব</option>
                    <option value="ক্রীড়া ও খেলাধুলা">ক্রীড়া ও খেলাধুলা</option>
                    <option value="দেয়ালিকা">দেয়ালিকা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছবির উৎস (URL বা সংরক্ষিত পাথ) *
                  </label>
                  <select
                    value={galleryUrl}
                    onChange={(e) => setGalleryUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="/src/assets/images/school_campus_hero_1792171248217.jpg">স্কুল ভবন ও সবুজ খেলার মাঠ</option>
                    <option value="/src/assets/images/headmaster_desk_1792171248835.jpg">প্রধান শিক্ষক মোঃ রশিদুল ইসলামের অফিস</option>
                    <option value="/src/assets/images/student_assembly_exercise_1792171249970.jpg">সকালের প্রাত্যহিক সমাবেশ ও পিটি</option>
                    <option value="/src/assets/images/digital_classroom_kids_1792171250216.jpg">মাল্টিমিডিয়া ডিজিটাল ক্লাসরুম</option>
                    <option value="/src/assets/images/creative_wall_magazine_1792171250145.jpg">সৃজনশীল দেয়ালিকা আনন্দধারা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছবির ক্যাপশন / বিবরণ
                  </label>
                  <textarea
                    rows={3}
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="ছবি সম্পর্কে ১-২ লাইনের বিবরণ..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>গ্যালারিতে যুক্ত করুন</span>
                </button>
              </form>
            </div>

            {/* Existing photos */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                গ্যালারিতে বিদ্যমান আলোকচিত্র ({gallery.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((g) => (
                  <div key={g.id} className="relative rounded-xl overflow-hidden border border-slate-200 group aspect-4/3 bg-slate-100">
                    <img
                      src={g.mediaUrl}
                      alt={g.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-xs">
                      <span className="font-semibold line-clamp-2">{g.title}</span>
                      <button
                        onClick={() => {
                          if (confirm('এই ছবিটি গ্যালারি থেকে মুছে ফেলবেন?')) {
                            StorageService.deleteGalleryItem(g.id);
                            showSuccess('ছবি মুছে ফেলা হয়েছে!');
                          }
                        }}
                        className="self-end p-1 bg-red-600 rounded text-white hover:bg-red-700"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 8: Backup & Restore */}
        {activeTab === 'backup' && (
          <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                ডেটা ব্যাকআপ, রিস্টোর ও রিসেট টুল
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                সম্পূর্ণ বিদ্যালয়ের ডেটাবেজ (প্রধান শিক্ষক, শিক্ষক-কর্মচারী, নোটিশ, ছবি, কার্যক্রম ও দেয়ালিকা) ব্যাকআপ নিন বা পূর্বের অবস্থায় ফিরিয়ে আনুন।
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">সম্পূর্ণ ব্যাকআপ ডাউনলোড</h4>
                  <p className="text-[11px] text-slate-500">সমস্ত তথ্য একটি JSON ফাইল আকারে সেভ করে রাখুন।</p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>ব্যাকআপ নিন</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">ব্যাকআপ ফাইল রিস্টোর</h4>
                  <p className="text-[11px] text-slate-500">পূর্বে সংরক্ষিত JSON ফাইল আপলোড করে তথ্য ফিরিয়ে আনুন।</p>
                </div>
                <label className="cursor-pointer px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>ফাইল নির্বাচন</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-red-900">ডিফল্ট তথ্যে রূপান্তর (Reset)</h4>
                  <p className="text-[11px] text-red-600">সকল তথ্য মুছে মূল নালুকাবাড়ি প্রাথমিক বিদ্যালয়ের সূচনায় ফিরে যাবে।</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('আপনি কি নিশ্চিতভাবে সব ডেটা রিসেট করতে চান?')) {
                      StorageService.resetAll();
                      showSuccess('সকল তথ্য সফলভাবে রিসেট করা হয়েছে!');
                    }
                  }}
                  className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>রিসেট করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
