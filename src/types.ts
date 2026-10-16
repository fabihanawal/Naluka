export type NoticeCategory = 'জরুরি' | 'ভর্তি' | 'পরীক্ষা' | 'ফলাফল' | 'ছুটি' | 'সাধারণ';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  content: string;
  isPinned: boolean;
  publishedBy: string;
  attachmentName?: string;
}

export type ActivityCategory = 
  | 'ডিজিটাল ক্লাস' 
  | 'শারীরিক কসরত ও পিটি' 
  | 'খেলাধুলা' 
  | 'গান ও নাচ' 
  | 'চিত্রাঙ্কন' 
  | 'আবৃত্তি ও বক্তৃতা' 
  | 'ক্ষুদে বিতর্ক' 
  | 'নাটিকা ও অন্যান্য';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  imageUrl: string;
  date: string;
  highlights?: string[];
}

export type CreativeType = 'কবিতা' | 'চিত্রাঙ্কন' | 'গল্প' | 'দেয়ালিকা';

export interface CreativePost {
  id: string;
  title: string;
  type: CreativeType;
  authorName: string;
  studentClass: string;
  rollNo: string;
  content: string;
  imageUrl?: string;
  date: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ক্যাম্পাস' | 'সমাবেশ ও পিটি' | 'ডিজিটাল ক্লাস' | 'সাংস্কৃতিক উৎসব' | 'ক্রীড়া ও খেলাধুলা' | 'দেয়ালিকা';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  date: string;
}

export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  passRate: number;
  classroomCount: number;
  campusArea: string;
  establishedYear: number;
}

export interface HeadmasterInfo {
  name: string;
  designation: string;
  schoolName: string;
  address: string;
  photoUrl: string;
  quote: string;
  fullMessage: string[];
  qualifications: string;
  phone: string;
  email: string;
  joinDate?: string;
}

export type StaffRoleType = 'শিক্ষক' | 'কর্মচারী';

export interface TeacherStaff {
  id: string;
  name: string;
  designation: string;
  roleType: StaffRoleType;
  qualification: string;
  phone: string;
  email?: string;
  bloodGroup?: string;
  joinDate: string;
  photoUrl: string;
  bio?: string;
  order: number;
}
