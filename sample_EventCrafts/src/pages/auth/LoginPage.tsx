import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Shield, User, Store, UserCheck, KeyRound } from 'lucide-react';
import { loginUser } from '@/lib/auth';

type UserRole = 'customer' | 'vendor' | 'planner' | 'admin';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    // Suggest quick demo accounts if email field is empty
    if (!email) {
      if (selectedRole === 'admin') setEmail('admin@eventcrafts.com');
      else if (selectedRole === 'vendor') setEmail('vendor@royalgrand.com');
      else if (selectedRole === 'planner') setEmail('ananya.planner@eventcrafts.com');
      else setEmail('aditya.sharma@email.com');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email.trim() || (
      role === 'admin' ? 'admin@eventcrafts.com' :
      role === 'vendor' ? 'vendor@royalgrand.com' :
      role === 'planner' ? 'ananya.planner@eventcrafts.com' : 'aditya.sharma@email.com'
    );

    loginUser(loginEmail, role);

    if (role === 'admin') navigate('/admin');
    else if (role === 'vendor') navigate('/vendor');
    else if (role === 'planner') navigate('/planner');
    else navigate('/customer');
  };

  const roleConfig = {
    customer: { title: 'Customer Sign In', path: '/customer', badge: 'bg-primary-100 text-primary-700', label: 'Customer' },
    vendor: { title: 'Vendor Portal Sign In', path: '/vendor', badge: 'bg-emerald-100 text-emerald-700', label: 'Vendor' },
    planner: { title: 'Planner Portal Sign In', path: '/planner', badge: 'bg-violet-100 text-violet-700', label: 'Event Planner' },
    admin: { title: 'Admin System Login', path: '/admin', badge: 'bg-red-100 text-red-700 border border-red-200', label: 'Super Admin' },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left – Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="font-display font-bold text-2xl">
              EventCrafts
            </span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Welcome Back!
          </h2>
          <p className="text-primary-200 text-center max-w-md mb-10">
            Sign in to continue planning your perfect events with AI-powered intelligence.
          </p>

          {/* Floating cards */}
          <div className="space-y-4 w-full max-w-sm">
            {[
              { icon: <Sparkles size={18} />, text: 'AI-Powered Event Intelligence' },
              { icon: <Shield size={18} />, text: '2,500+ Verified Vendors & Planners' },
              { icon: <ArrowRight size={18} />, text: '15,000+ Successful Events' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <span className="text-accent-400">{item.icon}</span>
                <span className="text-sm font-medium text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                Event<span className="text-primary-500">Crafts</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-2xl font-bold text-gray-900">{roleConfig[role].title}</h1>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${roleConfig[role].badge}`}>
              {roleConfig[role].label}
            </span>
          </div>

          {/* Role selector tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-xl mb-6">
            {[
              { id: 'customer', label: 'User', icon: <User size={14} /> },
              { id: 'vendor', label: 'Vendor', icon: <Store size={14} /> },
              { id: 'planner', label: 'Planner', icon: <UserCheck size={14} /> },
              { id: 'admin', label: 'Admin', icon: <Shield size={14} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleRoleChange(tab.id as UserRole)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-all ${
                  role === tab.id
                    ? tab.id === 'admin'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {role === 'admin' && (
            <div className="p-3.5 mb-5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 text-xs">
              <Shield size={18} className="text-red-600 shrink-0" />
              <div>
                <p className="font-bold">System Administration Access</p>
                <p className="text-red-600 mt-0.5">Enter admin credentials to manage users, vendors, payouts & platform configuration.</p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  className="input-field pl-11"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary-500 font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-field pl-11 pr-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="remember" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              className={`w-full text-base py-3.5 font-semibold rounded-xl text-white transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
                role === 'admin'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500/50'
                  : 'bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-primary-500/50'
              }`}
            >
              {role === 'admin' ? <KeyRound size={18} /> : <ArrowRight size={18} />}
              Sign In as {roleConfig[role].label}
            </button>
          </form>

          {/* Demo Login Presets */}
          <div className="relative py-4 my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Demo Accounts</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('aditya.sharma@email.com');
                setRole('customer');
              }}
              className={`py-2 px-2 border rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                email === 'aditya.sharma@email.com' ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              User Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('vendor@royalgrand.com');
                setRole('vendor');
              }}
              className={`py-2 px-2 border rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                email === 'vendor@royalgrand.com' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Vendor Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('ananya.planner@eventcrafts.com');
                setRole('planner');
              }}
              className={`py-2 px-2 border rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                email === 'ananya.planner@eventcrafts.com' ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Planner Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@eventcrafts.com');
                setRole('admin');
              }}
              className={`py-2 px-2 border rounded-xl text-xs font-medium transition-all text-center cursor-pointer ${
                email === 'admin@eventcrafts.com' ? 'border-red-500 bg-red-50 text-red-700 font-semibold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Admin Demo
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

