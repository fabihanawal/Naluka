import { Activity, CreativePost, GalleryItem, HeadmasterInfo, Notice, SchoolStats, TeacherStaff } from '../types';
import { initialActivities, initialCreativePosts, initialGallery, initialHeadmasterInfo, initialNotices, initialSchoolStats, initialTeachersStaff } from '../data/initialData';

const STORAGE_KEYS = {
  NOTICES: 'nalukabari_notices_v1',
  ACTIVITIES: 'nalukabari_activities_v1',
  CREATIVES: 'nalukabari_creatives_v1',
  GALLERY: 'nalukabari_gallery_v1',
  HEADMASTER: 'nalukabari_headmaster_v1',
  STATS: 'nalukabari_stats_v1',
  TEACHERS: 'nalukabari_teachers_v1',
  ADMIN_AUTH: 'nalukabari_admin_session_v1',
};

// Dispatch a custom event whenever data changes so all components update in real time
function notifyUpdate(key: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nalukabari_store_updated', { detail: { key } }));
  }
}

export const StorageService = {
  // Notices
  getNotices(): Notice[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTICES);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(initialNotices));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialNotices;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialNotices;
    }
  },

  saveNotices(notices: Notice[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    } catch (e) {
      console.error('Failed to save notices to localStorage:', e);
    }
    notifyUpdate(STORAGE_KEYS.NOTICES);
  },

  addNotice(notice: Omit<Notice, 'id'>): Notice {
    const notices = this.getNotices();
    const newNotice: Notice = {
      ...notice,
      id: `notice-${Date.now()}`
    };
    const updated = [newNotice, ...notices];
    this.saveNotices(updated);
    return newNotice;
  },

  updateNotice(id: string, updatedFields: Partial<Notice>): Notice | null {
    const notices = this.getNotices();
    const index = notices.findIndex(n => n.id === id);
    if (index === -1) return null;
    notices[index] = { ...notices[index], ...updatedFields };
    this.saveNotices(notices);
    return notices[index];
  },

  deleteNotice(id: string) {
    const notices = this.getNotices().filter(n => n.id !== id);
    this.saveNotices(notices);
  },

  togglePinNotice(id: string) {
    const notices = this.getNotices().map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    );
    this.saveNotices(notices);
  },

  // Activities
  getActivities(): Activity[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initialActivities));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialActivities;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialActivities;
    }
  },

  saveActivities(activities: Activity[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.error('Failed to save activities:', e);
    }
    notifyUpdate(STORAGE_KEYS.ACTIVITIES);
  },

  addActivity(activity: Omit<Activity, 'id'>): Activity {
    const activities = this.getActivities();
    const newActivity: Activity = {
      ...activity,
      id: `act-${Date.now()}`
    };
    const updated = [newActivity, ...activities];
    this.saveActivities(updated);
    return newActivity;
  },

  updateActivity(id: string, updatedFields: Partial<Activity>): Activity | null {
    const list = this.getActivities();
    const index = list.findIndex(a => a.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updatedFields };
    this.saveActivities(list);
    return list[index];
  },

  deleteActivity(id: string) {
    const filtered = this.getActivities().filter(a => a.id !== id);
    this.saveActivities(filtered);
  },

  // Student Creative Corner
  getCreatives(): CreativePost[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CREATIVES);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.CREATIVES, JSON.stringify(initialCreativePosts));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialCreativePosts;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialCreativePosts;
    }
  },

  saveCreatives(posts: CreativePost[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CREATIVES, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save creatives:', e);
    }
    notifyUpdate(STORAGE_KEYS.CREATIVES);
  },

  addCreative(post: Omit<CreativePost, 'id' | 'likes'>): CreativePost {
    const posts = this.getCreatives();
    const newPost: CreativePost = {
      ...post,
      id: `cp-${Date.now()}`,
      likes: 0
    };
    const updated = [newPost, ...posts];
    this.saveCreatives(updated);
    return newPost;
  },

  updateCreative(id: string, updatedFields: Partial<CreativePost>): CreativePost | null {
    const posts = this.getCreatives();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    posts[index] = { ...posts[index], ...updatedFields };
    this.saveCreatives(posts);
    return posts[index];
  },

  deleteCreative(id: string) {
    const filtered = this.getCreatives().filter(p => p.id !== id);
    this.saveCreatives(filtered);
  },

  likeCreative(id: string) {
    const posts = this.getCreatives().map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    this.saveCreatives(posts);
  },

  // Gallery
  getGallery(): GalleryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialGallery;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialGallery;
    }
  },

  saveGallery(gallery: GalleryItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed to save gallery:', e);
    }
    notifyUpdate(STORAGE_KEYS.GALLERY);
  },

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const gallery = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `g-${Date.now()}`
    };
    const updated = [newItem, ...gallery];
    this.saveGallery(updated);
    return newItem;
  },

  deleteGalleryItem(id: string) {
    const filtered = this.getGallery().filter(g => g.id !== id);
    this.saveGallery(filtered);
  },

  // Headmaster info
  getHeadmasterInfo(): HeadmasterInfo {
    const raw = localStorage.getItem(STORAGE_KEYS.HEADMASTER);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.HEADMASTER, JSON.stringify(initialHeadmasterInfo));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialHeadmasterInfo;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialHeadmasterInfo;
    }
  },

  saveHeadmasterInfo(info: HeadmasterInfo) {
    try {
      localStorage.setItem(STORAGE_KEYS.HEADMASTER, JSON.stringify(info));
    } catch (e) {
      console.error('Failed to save headmaster info:', e);
    }

    // Automatically synchronize the Headmaster entry in Teachers and Staff list so both stay 100% in sync
    try {
      const teachers = this.getTeachers();
      const hmIndex = teachers.findIndex(t => t.id === 't-1' || t.designation.includes('প্রধান শিক্ষক'));
      if (hmIndex !== -1) {
        teachers[hmIndex] = {
          ...teachers[hmIndex],
          name: info.name,
          designation: info.designation,
          photoUrl: info.photoUrl,
          qualification: info.qualifications,
          phone: info.phone,
          email: info.email
        };
        localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
        notifyUpdate(STORAGE_KEYS.TEACHERS);
      }
    } catch (e) {
      console.warn('Could not sync headmaster to teachers list:', e);
    }

    notifyUpdate(STORAGE_KEYS.HEADMASTER);
  },

  // Teachers and Staff
  getTeachers(): TeacherStaff[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(initialTeachersStaff));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialTeachersStaff;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialTeachersStaff;
    }
  },

  saveTeachers(teachers: TeacherStaff[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    } catch (e) {
      console.error('Failed to save teachers to localStorage:', e);
    }
    notifyUpdate(STORAGE_KEYS.TEACHERS);
  },

  addTeacher(teacher: Omit<TeacherStaff, 'id'>): TeacherStaff {
    const list = this.getTeachers();
    const newTeacher: TeacherStaff = {
      ...teacher,
      id: `staff-${Date.now()}`
    };
    const updated = [...list, newTeacher];
    this.saveTeachers(updated);
    return newTeacher;
  },

  updateTeacher(id: string, updatedFields: Partial<TeacherStaff>): TeacherStaff | null {
    const list = this.getTeachers();
    const index = list.findIndex(t => t.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updatedFields };
    this.saveTeachers(list);

    // If updating headmaster in teachers list, also sync back to Headmaster Info
    if (list[index].id === 't-1' || list[index].designation.includes('প্রধান শিক্ষক')) {
      const hm = this.getHeadmasterInfo();
      this.saveHeadmasterInfo({
        ...hm,
        name: list[index].name,
        designation: list[index].designation,
        photoUrl: list[index].photoUrl,
        qualifications: list[index].qualification,
        phone: list[index].phone,
        email: list[index].email || hm.email
      });
    }

    return list[index];
  },

  deleteTeacher(id: string) {
    const list = this.getTeachers().filter(t => t.id !== id);
    this.saveTeachers(list);
  },

  // Stats
  getStats(): SchoolStats {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) {
      try {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialSchoolStats));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      return initialSchoolStats;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return initialSchoolStats;
    }
  },

  saveStats(stats: SchoolStats) {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats:', e);
    }
    notifyUpdate(STORAGE_KEYS.STATS);
  },

  // Admin Auth state
  isAdminLoggedIn(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminLoggedIn(status: boolean) {
    if (status) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    notifyUpdate(STORAGE_KEYS.ADMIN_AUTH);
  },

  // Reset to original mock data
  resetAll() {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(initialNotices));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(initialActivities));
      localStorage.setItem(STORAGE_KEYS.CREATIVES, JSON.stringify(initialCreativePosts));
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGallery));
      localStorage.setItem(STORAGE_KEYS.HEADMASTER, JSON.stringify(initialHeadmasterInfo));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialSchoolStats));
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(initialTeachersStaff));
    } catch (e) {
      console.error('Failed to reset localStorage data:', e);
    }
    notifyUpdate('all');
  },

  // Export & Import backup
  exportBackup(): string {
    const backup = {
      notices: this.getNotices(),
      activities: this.getActivities(),
      creatives: this.getCreatives(),
      gallery: this.getGallery(),
      headmaster: this.getHeadmasterInfo(),
      teachers: this.getTeachers(),
      stats: this.getStats(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.notices) localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(data.notices));
      if (data.activities) localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data.activities));
      if (data.creatives) localStorage.setItem(STORAGE_KEYS.CREATIVES, JSON.stringify(data.creatives));
      if (data.gallery) localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(data.gallery));
      if (data.headmaster) localStorage.setItem(STORAGE_KEYS.HEADMASTER, JSON.stringify(data.headmaster));
      if (data.teachers) localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(data.teachers));
      if (data.stats) localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
      notifyUpdate('all');
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  }
};
