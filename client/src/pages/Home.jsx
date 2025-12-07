import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { ArrowRight, Zap, Users, Briefcase, Bell, X, Play, Clock, Star, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import { ArrowRight, Zap, Users, Briefcase, Bell, X, Play, Clock, Star, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import { ArrowRight, Zap, Users, Briefcase, Bell, X, Play, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import axios from 'axios';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
<<<<<<< HEAD
  const { t, language, setLanguage, languageNames, availableLanguages } = useLanguage();
=======
<<<<<<< HEAD
  const { t, language, setLanguage, languageNames, availableLanguages } = useLanguage();
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const [projects, setProjects] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
<<<<<<< HEAD
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
=======
<<<<<<< HEAD
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd

  const formatTime = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
import { ArrowRight, Zap, Users, Briefcase, Bell, X, Play, Clock, Star } from 'lucide-react';
=======
import { ArrowRight, Zap, Users, Briefcase } from 'lucide-react';
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
<<<<<<< HEAD
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New project 'AI Chatbot' is looking for members", time: "2m ago", read: false },
    { id: 2, message: "Your project application was accepted!", time: "1h ago", read: false },
    { id: 3, message: "Live class 'React Mastery' starts in 30 minutes", time: "3h ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
=======

  useEffect(() => {
    // Fetch projects from API
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        const openProjects = response.data.filter(p => p.status === 'Open');
        setProjects(openProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // Fallback mock data
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        setProjects([
          { id: 1, title: "Build a FinTech App", requiredSkills: ["React", "Node.js"], description: "Looking for skilled developers" },
          { id: 2, title: "AI Image Generator", requiredSkills: ["Python", "AI/ML"], description: "Join our innovative AI project" },
          { id: 3, title: "E-Commerce Platform", requiredSkills: ["React", "MongoDB"], description: "Building the next big marketplace" }
        ]);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    const fetchNotifications = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        const formattedNotifications = response.data.map(notif => ({
          id: notif._id,
          message: notif.message,
          time: formatTime(notif.createdAt),
          read: notif.read,
          type: notif.type,
          from: notif.from
        }));
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      try {
        await axios.patch(`http://localhost:5000/api/notifications/${notif.id}/read`);
        setNotifications(notifications.map(n => 
          n.id === notif.id ? { ...n, read: true } : n
        ));
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  useEffect(() => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    if (projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
      }, 5000); // Rotate every 5 seconds
      return () => clearInterval(interval);
    }
  }, [projects.length]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 max-w-6xl mx-auto relative min-h-screen">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed top-32 right-20 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 floating pointer-events-none"></div>
      <div className="fixed bottom-32 left-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-30 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      {/* Language Selector */}
      <div className="fixed top-20 left-6 z-40">
        <button
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition flex items-center gap-2 border-2 border-green-500"
          title={t('selectLanguage')}
        >
          <Globe size={24} className="text-green-600" />
          <span className="text-sm font-bold text-green-600 hidden md:inline">{languageNames[language]}</span>
        </button>
        
        {showLanguageSelector && (
          <div className="absolute top-16 left-0 bg-white rounded-xl shadow-2xl w-48 border-2 border-gray-200 overflow-hidden z-50">
            <div className="p-3 border-b bg-green-50">
              <h3 className="font-bold text-sm text-black">{t('selectLanguage')}</h3>
            </div>
            <div className="divide-y">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageSelector(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-all ${
                    language === lang
                      ? 'bg-green-100 text-green-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{languageNames[lang]}</span>
                    {language === lang && <span className="text-green-600">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      <div className="relative mb-6">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="fixed top-20 right-6 z-40 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition flex items-center gap-2 border-2 border-blue-500"
        >
          <Bell size={24} className="text-blue-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
        
        {showNotifications && (
          <div className="fixed top-32 right-6 z-50 bg-white rounded-xl shadow-2xl w-80 max-h-96 overflow-y-auto border-2 border-gray-200">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
<<<<<<< HEAD
              <h3 className="font-bold text-lg text-black">{t('notifications')}</h3>
=======
<<<<<<< HEAD
              <h3 className="font-bold text-lg text-black">{t('notifications')}</h3>
=======
              <h3 className="font-bold text-lg text-black">Notifications</h3>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="divide-y">
<<<<<<< HEAD
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {t('noNotifications')}
=======
<<<<<<< HEAD
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {t('noNotifications')}
=======
<<<<<<< HEAD
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No notifications
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <p className="text-sm text-black">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))
              )}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setNotifications(notifications.map(n => 
                      n.id === notif.id ? { ...n, read: true } : n
                    ));
                  }}
                >
                  <p className="text-sm text-black">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              ))}
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            </div>
          </div>
        )}
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl mb-8 shadow-2xl relative overflow-hidden interactive-card">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'shimmer 3s infinite'
          }}></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <span className="floating">🚀</span>
            {t('welcome')}
          </h1>
          <p className="text-xl mb-6">{t('welcomeSubtitle')}</p>
          <div className="flex gap-4">
            <Link to="/projects" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
              {t('findProjects')} <ArrowRight size={20} />
            </Link>
            <Link to="/skills" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg">
              {t('startLearning')}
            </Link>
          </div>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
            <Briefcase className="text-blue-500"/> {t('projectsSeekingMembers')}
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
=======
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 1. Hero Section / Announcements [cite: 6] */}
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-xl mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Ghandivam</h1>
        <p className="text-xl mb-6">The ultimate collaboration engine. Join a project, learn a skill, and build your Trust Points.</p>
        <div className="flex gap-4">
          <Link to="/projects" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
            Find Projects <ArrowRight size={20} />
          </Link>
          <Link to="/skills" className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800">
            Start Learning
          </Link>
        </div>
      </div>

<<<<<<< HEAD
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
=======
<<<<<<< HEAD
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
=======
      {/* 2. Rotating Projects List - Actively Seeking Members */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
            <Briefcase className="text-blue-500"/> Projects Seeking Members
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex-1">
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                <h3 className="text-2xl font-bold text-black mb-2">
                  {projects[currentProjectIndex]?.title || 'Loading...'}
                </h3>
                <p className="text-black mb-4">
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {projects[currentProjectIndex]?.title || 'Loading...'}
                </h3>
                <p className="text-gray-600 mb-4">
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  {projects[currentProjectIndex]?.description || 'Join this exciting project!'}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-gray-400"/>
<<<<<<< HEAD
                  <span className="text-sm text-black">Required Skills: </span>
=======
<<<<<<< HEAD
                  <span className="text-sm text-black">Required Skills: </span>
=======
<<<<<<< HEAD
                  <span className="text-sm text-black">Required Skills: </span>
=======
<<<<<<< HEAD
                  <span className="text-sm text-black">Required Skills: </span>
=======
                  <span className="text-sm text-gray-600">Required Skills: </span>
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  <div className="flex gap-2 flex-wrap">
                    {projects[currentProjectIndex]?.requiredSkills?.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  to="/projects" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  {t('viewProject')} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
<<<<<<< HEAD
=======
=======
                  View Project <ArrowRight size={18} />
                </Link>
              </div>
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
            {/* Project indicators */}
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <div className="flex gap-2 mt-4 justify-center">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentProjectIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentProjectIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`View project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
          <Play className="text-red-500" size={28} />
          {t('famousLiveClasses')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden interactive-card group">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 pulse-animation"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12 pulse-animation" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="relative z-10">
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
          <Play className="text-red-500" size={28} />
          Famous Live Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <div className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              LIVE NOW
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-300" size={20} fill="currentColor" />
              <span className="text-sm font-semibold">4.9 Rating</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Mastering Node.js Streams</h3>
            <p className="text-sm opacity-90 mb-4">Join expert developer John Doe for an advanced session</p>
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="flex items-center gap-1"><Clock size={14} /> 2h 30m</span>
              <span className="flex items-center gap-1"><Users size={14} /> 1,234 enrolled</span>
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <Link to="/skills" className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              <Play size={16} /> {t('joinNow')}
            </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden interactive-card group">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-28 h-28 bg-white rounded-full -ml-14 -mt-14 pulse-animation"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mb-16 pulse-animation" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <div className="relative z-10">
<<<<<<< HEAD
=======
=======
            <Link to="/skills" className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
              <Play size={16} /> Join Now
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <div className="absolute top-2 right-2 bg-orange-500 px-3 py-1 rounded-full text-xs font-bold">
              Starts in 1h
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-300" size={20} fill="currentColor" />
              <span className="text-sm font-semibold">4.8 Rating</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Advanced React Patterns</h3>
            <p className="text-sm opacity-90 mb-4">Learn from Sarah Dev, senior React architect</p>
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="flex items-center gap-1"><Clock size={14} /> 3h 15m</span>
              <span className="flex items-center gap-1"><Users size={14} /> 856 enrolled</span>
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <Link to="/skills" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
              <Play size={16} /> {t('reserveSpot')}
            </Link>
            </div>
<<<<<<< HEAD
=======
=======
            <Link to="/skills" className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
              <Play size={16} /> Reserve Spot
            </Link>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black"><Zap className="text-yellow-500"/> {t('activeAnnouncements')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <span className="text-2xl">🎯</span> Hackathon Team Finder
            </h3>
            <p className="text-black text-sm mt-2">Looking for a UI Designer for the 24h Hackathon. Urgent!</p>
            <Link to="/projects" className="mt-4 text-blue-600 font-semibold text-sm inline-block hover:underline transition-all">{t('viewDetails')} →</Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <span className="text-2xl">🤖</span> New AI Course Added
            </h3>
            <p className="text-black text-sm mt-2">"Mastering React with AI" is now available in Skill Learning.</p>
            <Link to="/skills" className="mt-4 text-purple-600 font-semibold text-sm inline-block hover:underline transition-all">{t('enrollNow')} →</Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <span className="text-2xl">🏆</span> Community Challenge
            </h3>
            <p className="text-black text-sm mt-2">Complete 3 projects this month to earn the 'Super Collaborator' badge.</p>
          </div>
<<<<<<< HEAD
=======
=======
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black"><Zap className="text-yellow-500"/> Active Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-black">Hackathon Team Finder</h3>
          <p className="text-black text-sm mt-2">Looking for a UI Designer for the 24h Hackathon. Urgent!</p>
          <Link to="/projects" className="mt-4 text-blue-600 font-semibold text-sm inline-block hover:underline">View Details</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="font-bold text-lg text-black">New AI Course Added</h3>
          <p className="text-black text-sm mt-2">"Mastering React with AI" is now available in Skill Learning.</p>
          <Link to="/skills" className="mt-4 text-purple-600 font-semibold text-sm inline-block hover:underline">Enroll Now</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="font-bold text-lg text-black">Community Challenge</h3>
          <p className="text-black text-sm mt-2">Complete 3 projects this month to earn the 'Super Collaborator' badge.</p>
<<<<<<< HEAD
=======
=======
      {/* 3. Dynamic Content / Advertisements [cite: 5] */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="text-yellow-500"/> Active Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="font-bold text-lg">Hackathon Team Finder</h3>
          <p className="text-gray-600 text-sm mt-2">Looking for a UI Designer for the 24h Hackathon. Urgent!</p>
          <Link to="/projects" className="mt-4 text-blue-600 font-semibold text-sm inline-block hover:underline">View Details</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="font-bold text-lg">New AI Course Added</h3>
          <p className="text-gray-600 text-sm mt-2">"Mastering React with AI" is now available in Skill Learning.</p>
          <Link to="/skills" className="mt-4 text-purple-600 font-semibold text-sm inline-block hover:underline">Enroll Now</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="font-bold text-lg">Community Challenge</h3>
          <p className="text-gray-600 text-sm mt-2">Complete 3 projects this month to earn the 'Super Collaborator' badge.</p>
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      </div>
    </div>
  );
};

export default Home;