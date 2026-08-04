import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-mesh relative">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-card-solid p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                Event<span className="text-primary-500">Crafts</span>
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
              <Mail size={28} className="text-primary-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-sm">
              No worries! Enter your email and we'll send you instructions to reset your password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="input-field pl-11"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button type="button" className="btn-primary w-full text-base py-3.5">
              <Send size={16} />
              Send Reset Link
            </button>
          </form>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
