<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import { Award, User, Star, CheckCircle, BookOpen, TrendingUp, Users, MessageSquare, UserPlus, X } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const { user: currentUser } = useAuth();
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUserProjects();
<<<<<<< HEAD
=======
=======
  const [user, setUser] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      setUser(response.data);
      setConnectionRequests(response.data.connectionRequests || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const fetchUserProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/my-projects');
      setUserProjects(response.data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

<<<<<<< HEAD
=======
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const handleAcceptConnection = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/${user._id}/accept-connection`, {
        requestId
      });
      alert('Connection accepted!');
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to accept connection');
    }
  };

  const handleRejectConnection = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/${user._id}/reject-connection`, {
        requestId
      });
      alert('Connection rejected');
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to reject connection');
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-black">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-black">Error loading profile</p>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    <div className="p-4 md:p-6 max-w-5xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-32 left-32 w-16 h-16 bg-blue-200 rounded-full opacity-30 floating pointer-events-none"></div>
      <div className="fixed bottom-32 right-32 w-20 h-20 bg-purple-200 rounded-full opacity-30 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <div className="bg-white rounded-2xl shadow-xl mb-6 relative z-10 interactive-card" style={{ overflow: 'visible' }}>
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-32 relative overflow-hidden">
          {/* Animated pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>
        <div className="px-6 md:px-10 pb-10 pt-6 flex flex-col md:flex-row md:items-end -mt-12 gap-6 md:gap-8" style={{ overflow: 'visible' }}>
          <div className="bg-white p-2 rounded-full shadow-lg floating flex-shrink-0 self-start md:self-auto z-20">
            <div className="h-24 w-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <User size={40} className="text-white"/>
            </div>
          </div>
          <div className="flex-1 min-w-0 pr-4 md:pr-6" style={{ overflow: 'visible' }}>
            <h1 className="text-2xl md:text-3xl font-bold text-black break-words leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{user.name || 'User'}</h1>
            <p className="text-black break-words mt-1" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>@{user.username}</p>
            {user.email && <p className="text-sm text-gray-500 break-words mt-1" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{user.email}</p>}
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-center w-full md:w-auto md:min-w-[180px] flex-shrink-0 self-start md:self-auto z-20" style={{ overflow: 'visible' }}>
            <p className="text-xs md:text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">{t('trustPoints')}</p>
            <div className="text-3xl md:text-4xl font-black text-blue-700 flex items-center justify-center gap-2 flex-wrap">
              <Award size={32} className="flex-shrink-0" /> 
              <span className="whitespace-nowrap">{user.trustPoints || 100}</span>
<<<<<<< HEAD
=======
=======
    <div className="p-6 max-w-4xl mx-auto">
<<<<<<< HEAD
=======
=======
import React, { useState } from 'react';
import { Award, User, Star, CheckCircle } from 'lucide-react';

const Profile = () => {
  // Mock Data (In a real app, we fetch this from the backend)
  const [user] = useState({
    name: "Siddhartha (You)",
    role: "Full Stack Developer",
    trustPoints: 120, // [cite: 45]
    skills: ["React", "Node.js", "MongoDB", "UI Design"],
    completedProjects: 5
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Card */}
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div className="bg-slate-800 h-32"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6">
          <div className="bg-white p-2 rounded-full">
            <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={40} className="text-gray-600"/>
            </div>
          </div>
          <div className="flex-1">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
            <h1 className="text-3xl font-bold text-black">{user.name || 'User'}</h1>
            <p className="text-black">@{user.username}</p>
            {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center min-w-[150px]">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Trust Points</p>
            <div className="text-4xl font-black text-blue-700 flex items-center justify-center gap-2">
              <Award size={32} /> {user.trustPoints || 100}
<<<<<<< HEAD
=======
=======
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
          
          {/* TRUST POINTS DISPLAY  */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center min-w-[150px]">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Trust Points</p>
            <div className="text-4xl font-black text-blue-700 flex items-center justify-center gap-2">
              <Award size={32} /> {user.trustPoints}
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 relative z-10 interactive-card group overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
          <TrendingUp className="text-blue-600 floating" size={28} />
          {t('myProgress')}
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
          <TrendingUp className="text-blue-600" size={28} />
          My Progress
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <span className="text-sm font-semibold text-black">{t('activeProjects')}</span>
              <span className="text-2xl font-bold text-blue-600">{userProjects.filter(p => p.status === 'Active').length}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, (userProjects.filter(p => p.status === 'Active').length / Math.max(1, userProjects.length)) * 100)}%` }}></div>
<<<<<<< HEAD
=======
=======
              <span className="text-sm font-semibold text-black">Active Projects</span>
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <span className="text-sm font-semibold text-black">{t('completedProjects')}</span>
              <span className="text-2xl font-bold text-green-600">{userProjects.filter(p => p.status === 'Completed').length}</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(100, (userProjects.filter(p => p.status === 'Completed').length / Math.max(1, userProjects.length)) * 100)}%` }}></div>
<<<<<<< HEAD
=======
=======
              <span className="text-sm font-semibold text-black">Completed Tasks</span>
              <span className="text-2xl font-bold text-green-600">12</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <span className="text-sm font-semibold text-black">{t('totalProjects')}</span>
              <Users className="text-purple-600" size={24} />
            </div>
            <p className="text-sm text-black">{t('projects')}: {userProjects.length}</p>
          </div>
        </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Star size={20} className="text-yellow-500" /> {t('verifiedSkills')}
          </h3>
<<<<<<< HEAD
=======
=======
              <span className="text-sm font-semibold text-black">Team Collaboration</span>
              <Users className="text-purple-600" size={24} />
            </div>
            <p className="text-sm text-black">Active team members: 8</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star size={20} /> Verified Skills</h3>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          <div className="flex flex-wrap gap-2">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {skill}
                </span>
              ))
            ) : (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <p className="text-gray-500 text-sm">{t('noSkillsListed')}</p>
            )}
          </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" /> {t('completedProjectsTitle')}
          </h3>
          <p className="text-black mb-2">{t('completedProjectsTitle')}</p>
<<<<<<< HEAD
=======
=======
              <p className="text-gray-500 text-sm">No skills listed</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle size={20} /> Completed Projects</h3>
          <p className="text-black mb-2">Projects successfully delivered with high trust ratings.</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          <div className="space-y-3">
            {user.createdProjects && user.createdProjects.length > 0 ? (
              user.createdProjects.map((project) => (
                <div key={project._id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-bold text-black">{project.title}</div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  <div className="text-xs text-black">{t('status')}: {project.status}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">{t('noProjectsYet')}</p>
            )}
          </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-500" /> {t('learningProgress')}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t('enrolledClasses')}</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t('completedClasses')}</span>
<<<<<<< HEAD
=======
=======
                  <div className="text-xs text-black">Status: {project.status}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No projects yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen size={20} /> Learning Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Enrolled Classes</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completed Classes</span>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                <span className="font-bold">0</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-2">
<<<<<<< HEAD
                  <span>{t('overallProgress')}</span>
=======
<<<<<<< HEAD
                  <span>{t('overallProgress')}</span>
=======
                  <span>Overall Progress</span>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  <span className="font-bold">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users size={20} className="text-purple-500" /> {t('connections')}
          </h3>
          <p className="text-2xl font-bold text-black mb-2">{user.connections?.length || 0}</p>
          <p className="text-sm text-gray-600">{t('connectedUsers')}</p>
          </div>
        </div>
<<<<<<< HEAD
=======
=======
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users size={20} /> Connections</h3>
          <p className="text-2xl font-bold text-black mb-2">{user.connections?.length || 0}</p>
          <p className="text-sm text-gray-600">Connected users</p>
        </div>
<<<<<<< HEAD
=======
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Section [cite: 43] */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star size={20} /> Verified Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Section [cite: 44] */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle size={20} /> Completed Projects</h3>
          <p className="text-gray-500 mb-2">Projects successfully delivered with high trust ratings.</p>
          <div className="space-y-3">
             <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-bold">E-Commerce Dashboard</div>
                <div className="text-xs text-gray-500">Role: Team Leader</div>
             </div>
             <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="font-bold">AI Chatbot Integration</div>
                <div className="text-xs text-gray-500">Role: Backend Dev</div>
             </div>
          </div>
        </div>
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      </div>
    </div>
  );
};

export default Profile;