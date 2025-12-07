import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MyProjects = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const projectOptions = [
    {
      id: 'create',
      title: t('createProject'),
      description: t('startNewProject'),
      icon: Plus,
      color: 'blue',
      route: '/projects/create'
    },
    {
      id: 'join',
      title: t('joinProject'),
      description: t('browseProjects'),
      icon: Briefcase,
      color: 'green',
      route: '/projects/join'
    },
    {
      id: 'ongoing',
      title: t('ongoingProjects'),
      description: t('manageActiveProjects'),
      icon: Clock,
      color: 'purple',
      route: '/projects/ongoing'
    }
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
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 interactive-card group relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className={`w-16 h-16 ${iconBgClass} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform floating`}>
                <Icon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-black">{option.title}</h2>
              <p className="text-black mb-6">{option.description}</p>
              <div className={`flex items-center gap-2 ${textColorClass} font-semibold group-hover:gap-4 transition-all`}>
                <span>{t('getStarted')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProjects;