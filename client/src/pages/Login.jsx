import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
import { LogIn, User, Lock, AlertCircle, Mail, Phone } from 'lucide-react';
import axios from 'axios';
=======
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
<<<<<<< HEAD
  const { t } = useLanguage();
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    phoneNumber: '',
    username: ''
  });
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
=======

  const demoCredentials = [
    { username: 'demo', password: 'demo123', label: 'Demo User' },
    { username: 'admin', password: 'admin123', label: 'Admin' }
  ];
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      if (result.error.includes('not verified')) {
        setError(result.error);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    }

    setLoading(false);
  };

<<<<<<< HEAD
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordMessage('');
    setError('');
    setForgotPasswordLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: forgotPasswordData.email || undefined,
        phoneNumber: forgotPasswordData.phoneNumber || undefined,
        username: forgotPasswordData.username || undefined
      });

      setForgotPasswordMessage(response.data.message);
      if (response.data.otp) {
        // Navigate to reset password page
        navigate('/reset-password', { 
          state: { 
            userId: response.data.userId,
            otp: response.data.otp,
            message: 'OTP sent successfully. Please check your phone/email.' 
          } 
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send reset OTP. Please try again.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-32 right-32 w-24 h-24 bg-white rounded-full opacity-20 floating pointer-events-none"></div>
      <div className="absolute bottom-32 left-32 w-20 h-20 bg-white rounded-full opacity-20 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 interactive-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg floating">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">{t('welcomeBack')}</h1>
          <p className="text-gray-600">{t('signInAccount')}</p>
=======
  const fillDemoCredentials = (username, password) => {
    setFormData({ username, password });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Ghandivam account</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
<<<<<<< HEAD
              {t('usernameEmailPhone')}
=======
              Username / Email / Phone
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
<<<<<<< HEAD
                placeholder={t('usernameEmailPhone')}
=======
                placeholder="Enter username, email, or phone"
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
              />
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-black">
                {t('password')}
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                {t('forgotPassword')}
              </button>
            </div>
=======
            <label className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
<<<<<<< HEAD
                placeholder={t('password')}
=======
                placeholder="Enter your password"
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
<<<<<<< HEAD
            {loading ? t('signingIn') : t('signIn')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('dontHaveAccount')}{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              {t('signUp')}
=======
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-600 text-center mb-4">Demo Credentials:</p>
          <div className="space-y-2">
            {demoCredentials.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => fillDemoCredentials(demo.username, demo.password)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-left text-sm"
              >
                <span className="font-semibold text-black">{demo.label}:</span>
                <span className="text-gray-600 ml-2">{demo.username} / {demo.password}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign Up
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            </Link>
          </p>
        </div>
      </div>
<<<<<<< HEAD

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setForgotPasswordData({ email: '', phoneNumber: '', username: '' });
                setForgotPasswordMessage('');
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <AlertCircle size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">{t('forgotPasswordTitle')}</h2>
              <p className="text-gray-600">{t('enterEmailPhoneUsername')}</p>
            </div>

            {forgotPasswordMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{forgotPasswordMessage}</p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={forgotPasswordData.email}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="text-center text-gray-500 text-sm">OR</div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  {t('phoneNumber')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={forgotPasswordData.phoneNumber}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, phoneNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="text-center text-gray-500 text-sm">OR</div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  {t('username')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={forgotPasswordData.username}
                    onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading || (!forgotPasswordData.email && !forgotPasswordData.phoneNumber && !forgotPasswordData.username)}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {forgotPasswordLoading ? t('sending') : t('sendResetOTP')}
              </button>
            </form>
          </div>
        </div>
      )}
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
    </div>
  );
};

export default Login;

