<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MyProjects = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Clock, ArrowRight } from 'lucide-react';

const MyProjects = () => {
  const navigate = useNavigate();
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd

  const projectOptions = [
    {
      id: 'create',
<<<<<<< HEAD
      title: t('createProject'),
      description: t('startNewProject'),
=======
<<<<<<< HEAD
      title: t('createProject'),
      description: t('startNewProject'),
=======
      title: 'Create Project',
      description: 'Start a new project and build your team. Define skills needed and lead your collaboration.',
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      icon: Plus,
      color: 'blue',
      route: '/projects/create'
    },
    {
      id: 'join',
<<<<<<< HEAD
      title: t('joinProject'),
      description: t('browseProjects'),
=======
<<<<<<< HEAD
      title: t('joinProject'),
      description: t('browseProjects'),
=======
      title: 'Join Project',
      description: 'Browse available projects and apply to join teams. Find opportunities that match your skills.',
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      icon: Briefcase,
      color: 'green',
      route: '/projects/join'
    },
    {
      id: 'ongoing',
<<<<<<< HEAD
      title: t('ongoingProjects'),
      description: t('manageActiveProjects'),
=======
<<<<<<< HEAD
      title: t('ongoingProjects'),
      description: t('manageActiveProjects'),
=======
      title: 'Ongoing Projects',
      description: 'Manage your active projects, collaborate with team members, and track progress.',
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      icon: Clock,
      color: 'purple',
      route: '/projects/ongoing'
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-32 right-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 floating pointer-events-none"></div>
      <div className="fixed bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 floating pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 text-black flex items-center gap-3">
          <span className="text-5xl floating">📁</span>
          <span>{t('myProjects')}</span>
        </h1>
        <p className="text-black">{t('manageProjects')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
=======
import React, { useState } from 'react';
import { Video, MessageSquare, Users, Play } from 'lucide-react';

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'workspace'

  // Mock Projects List [cite: 15]
  const projects = [
    { id: 1, title: "Build a FinTech App", skills: "React, Node.js", status: "Looking for Team" },
    { id: 2, title: "AI Image Generator", skills: "Python, AI/ML", status: "Active" },
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-black">My Projects</h1>
        <p className="text-black">Manage your projects and collaborations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        {projectOptions.map((option) => {
          const Icon = option.icon;
          let iconBgClass = 'bg-blue-600 hover:bg-blue-700';
          let textColorClass = 'text-blue-600';
          
          if (option.color === 'green') {
            iconBgClass = 'bg-green-600 hover:bg-green-700';
            textColorClass = 'text-green-600';
          } else if (option.color === 'purple') {
            iconBgClass = 'bg-purple-600 hover:bg-purple-700';
            textColorClass = 'text-purple-600';
          }

          return (
            <div
              key={option.id}
              onClick={() => navigate(option.route)}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 interactive-card group relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className={`w-16 h-16 ${iconBgClass} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform floating`}>
<<<<<<< HEAD
=======
=======
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 ${iconBgClass} rounded-xl flex items-center justify-center mb-4`}>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                <Icon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-black">{option.title}</h2>
              <p className="text-black mb-6">{option.description}</p>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <div className={`flex items-center gap-2 ${textColorClass} font-semibold group-hover:gap-4 transition-all`}>
                <span>{t('getStarted')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
<<<<<<< HEAD
=======
=======
              <div className={`flex items-center gap-2 ${textColorClass} font-semibold`}>
                <span>Get Started</span>
                <ArrowRight size={20} />
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </div>
            </div>
          );
        })}
      </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Collaboration Engine</h1>
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-md ${activeTab === 'browse' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>
            Project Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('workspace')}
            className={`px-4 py-2 rounded-md ${activeTab === 'workspace' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>
            Active Workspace
          </button>
        </div>
      </div>

      {/* VIEW 1: PROJECT MARKETPLACE [cite: 10] */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">{p.status}</span>
              </div>
              <p className="text-gray-500 mt-2 text-sm">Required Skills: {p.skills}</p>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Apply to Join</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: ACTIVE WORKSPACE [cite: 16] */}
      {activeTab === 'workspace' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg flex items-center gap-2">
               <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> 
               Project: AI Image Generator
            </h2>
            <button className="text-red-500 text-sm font-bold border border-red-200 px-3 py-1 rounded hover:bg-red-50">End Project</button>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LIVE VIDEO CALL MOCKUP [cite: 19] */}
            <div className="bg-black rounded-xl aspect-video relative flex items-center justify-center text-white overflow-hidden group">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="z-10 text-center">
                <Video size={48} className="mx-auto mb-2 text-gray-400"/>
                <h3 className="font-bold text-xl">Live Sync Room</h3>
                <p className="text-gray-400 text-sm mb-4">AI Subtitles: ON (English)</p>
                <button 
                  onClick={() => alert("Connecting to Secure Video Room with AI Translation...")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 mx-auto">
                  <Play size={16} fill="white"/> Join Call
                </button>
              </div>
            </div>

            {/* CHAT & TASKS [cite: 21] */}
            <div className="space-y-4">
               <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                    <MessageSquare size={18}/> Team Chat (AI Translated)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded shadow-sm">
                       <span className="font-bold text-xs text-gray-500">Maria (Spanish):</span>
                       <p>Hola, he subido el diseño.</p>
                       <p className="text-xs text-blue-600 italic">Translated: Hello, I have uploaded the design.</p>
                    </div>
                    <div className="bg-white p-2 rounded shadow-sm text-right">
                       <span className="font-bold text-xs text-gray-500">You:</span>
                       <p>Great! Checking it now.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    </div>
  );
};

export default MyProjects;