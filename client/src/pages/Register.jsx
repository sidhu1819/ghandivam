import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Phone, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOTP, resendOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [displayOtp, setDisplayOtp] = useState(''); // For demo: display the OTP

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.username,
      formData.phoneNumber,
      formData.email,
      formData.password
    );

    if (result.success) {
      setUserId(result.data.userId);
      setDisplayOtp(result.data.otp); // Store the OTP for display
      setOtpSent(true);
      setStep(2);
      alert(`OTP sent to ${formData.phoneNumber}. Your OTP: ${result.data.otp}`);
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyOTP(userId, otp);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'OTP verification failed');
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    const result = await resendOTP(userId);

    if (result.success) {
      setDisplayOtp(result.data.otp); // Store the new OTP for display
      alert(`OTP resent! Your new OTP: ${result.data.otp}`);
      setOtp('');
    } else {
      setError(result.error || 'Failed to resend OTP');
    }

    setLoading(false);
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-32 right-32 w-24 h-24 bg-white rounded-full opacity-20 floating pointer-events-none"></div>
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-white rounded-full opacity-20 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 interactive-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg floating">
<<<<<<< HEAD
=======
=======
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            {step === 1 ? 'Create Account' : 'Verify OTP'}
          </h1>
          <p className="text-gray-600">
            {step === 1 ? 'Join Ghandivam and start collaborating' : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password (min 6 characters)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Registering...' : 'Register & Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
              <p className="text-sm text-green-800 mb-2">
                OTP has been sent to: <span className="font-bold">{formData.phoneNumber}</span>
              </p>
              {displayOtp && (
                <div className="mt-3 p-3 bg-white border border-green-300 rounded text-center">
                  <p className="text-xs text-green-600 mb-1">Your OTP:</p>
                  <p className="text-2xl font-bold text-green-700 tracking-widest">{displayOtp}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Enter OTP *
              </label>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="w-full text-blue-600 hover:text-blue-700 font-semibold text-sm disabled:opacity-50"
            >
              Resend OTP
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

