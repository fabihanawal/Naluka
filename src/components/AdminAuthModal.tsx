import React, { useState } from 'react';
import { Lock, User, KeyRound, X, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials against user prompt specification: admin / r12345
      if (username.trim() === 'admin' && password.trim() === 'r12345') {
        setSuccess(true);
        StorageService.setAdminLoggedIn(true);
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(false);
          setUsername('');
          setPassword('');
          onClose();
          onSuccess();
        }, 600);
      } else {
        setIsLoading(false);
        setError('ভুল ব্যবহারকারী নাম বা পাসওয়ার্ড! সঠিক তথ্য দিন (admin / r12345)।');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-emerald-900/10 overflow-hidden relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">গোপন প্রশাসনিক প্রবেশদ্বার</h3>
              <p className="text-xs text-emerald-200">নালুকাবাড়ি প্রাথমিক বিদ্যালয় ম্যানেজমেন্ট</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-5 text-xs text-slate-600 bg-emerald-50/70 p-3 rounded-lg border border-emerald-100 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              লাল হার্ট আইকনে ট্রিপল ট্যাপের মাধ্যমে প্রধান শিক্ষক মহোদয়ের সুরক্ষিত অ্যাডমিন প্যানেলে সংযুক্ত হয়েছেন।
            </span>
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>লগইন সফল হয়েছে! ড্যাশবোর্ডে প্রবেশ করা হচ্ছে...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ব্যবহারকারীর নাম (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-sans transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                নিরাপত্তা পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-sans transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>যাচাই করা হচ্ছে...</span>
                ) : (
                  <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              ডিফল্ট ডেমো ক্রেডেনশিয়াল: ইউজারনেম: <strong className="text-slate-600 font-mono">admin</strong> | পাসওয়ার্ড: <strong className="text-slate-600 font-mono">r12345</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
