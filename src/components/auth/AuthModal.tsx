'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Building2,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type AuthRole = 'user' | 'agent' | 'admin';

interface AuthModalProps {
  isOpen: boolean;
  initialRole?: AuthRole;
  onClose: () => void;
}

export default function AuthModal({ isOpen, initialRole = 'user', onClose }: AuthModalProps) {
  const router = useRouter();
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRoleChange = (newRole: AuthRole) => {
    setRole(newRole);
    setOtpSent(false);
    if (newRole === 'admin') {
      setEmail('admin@homelyf.in');
      setPassword('••••••••');
    } else if (newRole === 'agent') {
      setEmail('rajesh.sharma@homelyf.in');
      setPassword('••••••••');
    } else {
      setEmail('buyer@homelyf.in');
      setPassword('••••••••');
    }
  };

  const handle1ClickDemo = (demoRole: AuthRole) => {
    setRole(demoRole);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      if (demoRole === 'admin') router.push('/admin');
      else if (demoRole === 'agent') router.push('/portal/agent');
      else router.push('/portal/user');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      if (role === 'admin') router.push('/admin');
      else if (role === 'agent') router.push('/portal/agent');
      else router.push('/portal/user');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-lenis-prevent
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-950/80 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <div>
              <div className="text-sm font-extrabold text-gray-900 dark:text-white">
                Homelyf Unified Auth
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Single Sign-On & Verification Portals
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <button
              type="button"
              onClick={() => handleRoleChange('user')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                role === 'user'
                  ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Buyer / User</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('agent')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                role === 'agent'
                  ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Broker / Agent</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Quick Demo 1-Click Access Pill */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                Test <strong>{role === 'user' ? 'Buyer Dashboard' : role === 'agent' ? 'Broker CRM' : 'Admin Console'}</strong> instantly:
              </span>
            </div>
            <button
              onClick={() => handle1ClickDemo(role)}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer"
            >
              1-Click Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {role === 'user' ? 'Mobile Number or Email' : role === 'agent' ? 'Registered RERA Broker Email' : 'Admin Secure Email'}
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  required
                  placeholder={role === 'user' ? 'buyer@homelyf.in / 9876543210' : role === 'agent' ? 'rajesh.sharma@homelyf.in' : 'admin@homelyf.in'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-gray-700 dark:text-gray-300">Password / Security PIN</label>
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'password' ? 'otp' : 'password')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  {authMode === 'password' ? 'Login with OTP' : 'Login with Password'}
                </button>
              </div>
              <div className="relative mt-1">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-95 cursor-pointer ${
                role === 'admin'
                  ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to {role === 'user' ? 'Buyer Portal' : role === 'agent' ? 'Broker Console' : 'Master Admin'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-[11px] text-gray-400">
            Protected by 256-Bit SSL Encryption • MP-RERA Registered Platform
          </div>
        </div>
      </div>
    </div>
  );
}
