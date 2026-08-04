import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { registerUser } from '@/lib/auth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'vendor' | 'planner'>('customer');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  const roles = [
    { value: 'customer' as const, label: 'Customer', desc: 'Plan and book events' },
    { value: 'vendor' as const, label: 'Vendor', desc: 'Offer your services' },
    { value: 'planner' as const, label: 'Event Planner', desc: 'Manage events professionally' },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeRole = role;
    const finalFirstName = firstName.trim() || 'New';
    const finalLastName = lastName.trim() || (activeRole === 'vendor' ? 'Vendor' : 'User');
    const finalEmail = email.trim() || `${finalFirstName.toLowerCase()}@example.com`;

    registerUser({
      firstName: finalFirstName,
      lastName: finalLastName,
      email: finalEmail,
      role: activeRole,
      phone: phone,
    });

    if (activeRole === 'vendor') navigate('/vendor');
    else if (activeRole === 'planner') navigate('/planner');
    else navigate('/customer');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left – Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="font-display font-bold text-2xl">EventCrafts</span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Join EventCrafts
          </h2>
          <p className="text-primary-200 text-center max-w-md mb-10">
            Create your account and start your journey to crafting extraordinary events.
          </p>

          <div className="w-full max-w-sm space-y-4">
            <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={18} className="text-accent-400" />
                <span className="font-semibold text-white">Free to Get Started</span>
              </div>
              <p className="text-sm text-primary-200">No credit card required. Browse vendors, explore AI features, and plan your first event for free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right – Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-lg py-8">
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

          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">Fill in your details to get started</p>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-700 mb-3 block">I want to join as</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                    role === r.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`font-semibold text-sm ${role === r.value ? 'text-primary-600' : 'text-gray-900'}`}>
                    {r.label}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleRegisterSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field pl-11"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {role !== 'customer' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  {role === 'vendor' ? 'Business Name' : 'Professional Title'}
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field pl-11"
                    placeholder={role === 'vendor' ? 'Your Business Name' : 'e.g. Senior Event Planner'}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="Minimum 8 characters"
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

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required defaultChecked className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-primary-500 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-base py-3.5 text-center cursor-pointer shadow-md"
            >
              Create Account & Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

