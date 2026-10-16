/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { Notice, Activity, CreativePost, GalleryItem, HeadmasterInfo, SchoolStats, TeacherStaff } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PrincipalDesk } from './components/PrincipalDesk';
import { TeachersDirectory } from './components/TeachersDirectory';
import { NoticeBoard } from './components/NoticeBoard';
import { ActivitiesSection } from './components/ActivitiesSection';
import { CreativeCorner } from './components/CreativeCorner';
import { GallerySection } from './components/GallerySection';
import { SchoolStatsAndFeatures } from './components/SchoolStatsAndFeatures';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Dynamic Data States
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [creatives, setCreatives] = useState<CreativePost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [headmaster, setHeadmaster] = useState<HeadmasterInfo>(StorageService.getHeadmasterInfo());
  const [stats, setStats] = useState<SchoolStats>(StorageService.getStats());
  const [teachers, setTeachers] = useState<TeacherStaff[]>(StorageService.getTeachers());

  const refreshAllData = () => {
    setIsAdmin(StorageService.isAdminLoggedIn());
    setNotices(StorageService.getNotices());
    setActivities(StorageService.getActivities());
    setCreatives(StorageService.getCreatives());
    setGallery(StorageService.getGallery());
    setHeadmaster(StorageService.getHeadmasterInfo());
    setStats(StorageService.getStats());
    setTeachers(StorageService.getTeachers());
  };

  useEffect(() => {
    refreshAllData();

    const handleUpdate = () => {
      refreshAllData();
    };

    window.addEventListener('nalukabari_store_updated', handleUpdate);
    return () => {
      window.removeEventListener('nalukabari_store_updated', handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    StorageService.setAdminLoggedIn(false);
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
  };

  // If Admin Dashboard is open, render full-screen Admin Control Center
  if (isAdminDashboardOpen && isAdmin) {
    return (
      <AdminDashboard
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleLogout}
        notices={notices}
        activities={activities}
        creatives={creatives}
        gallery={gallery}
        headmaster={headmaster}
        stats={stats}
        teachers={teachers}
      />
    );
  }

  // Find latest notice for ticker
  const latestNotice = notices.find(n => n.isPinned) || notices[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Classic Navigation Bar with Dropdown Menus */}
      <Navbar
        onOpenAdminAuth={() => setIsAdminAuthModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Latest Notice Ticker & Smooth Interactive Slideshow */}
        <HeroSection
          latestNotice={latestNotice}
          onViewNotice={(notice) => setSelectedNotice(notice)}
          headmasterPhotoUrl={headmaster.photoUrl}
        />

        {/* 2. School Stats & Environmental Highlights */}
        <div id="stats">
          <SchoolStatsAndFeatures stats={stats} />
        </div>

        {/* 3. Principal's Desk (প্রধান শিক্ষকের কর্নার) */}
        <PrincipalDesk headmaster={headmaster} />

        {/* 4. Teachers and Staff Directory (শিক্ষক ও কর্মচারী পরিচিতি) */}
        <TeachersDirectory teachers={teachers} />

        {/* 5. Digital Notice Board (ডিজিটাল নোটিশ বোর্ড) */}
        <NoticeBoard
          notices={notices}
          selectedNotice={selectedNotice}
          onSelectNotice={setSelectedNotice}
        />

        {/* 6. Activities & Achievements (কার্যক্রম ও সহশিক্ষা) */}
        <ActivitiesSection activities={activities} />

        {/* 7. Student's Creative Corner & Wall Magazine (দেয়ালিকা আনন্দধারা) */}
        <CreativeCorner creatives={creatives} />

        {/* 8. Photo & Video Gallery (ফটোগ্যালারি) */}
        <GallerySection gallery={gallery} />

        {/* 9. Contact & Location with Google Map (যোগাযোগ ও অবস্থান) */}
        <ContactAndLocation headmaster={headmaster} />

      </main>

      {/* Footer with Secret Heart Trigger */}
      <Footer
        onOpenAdminAuth={() => setIsAdminAuthModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Secret Admin Authentication Modal (Triple-tap red heart trigger) */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={() => {
          setIsAdmin(true);
          setIsAdminDashboardOpen(true);
        }}
      />

    </div>
  );
}
