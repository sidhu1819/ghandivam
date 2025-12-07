import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
import { User, Award, Star, CheckCircle, Users, MessageSquare, UserPlus, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
<<<<<<< HEAD
  const { t } = useLanguage();
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setConnecting(true);
    try {
      await axios.post(`http://localhost:5000/api/users/${id}/connect`);
<<<<<<< HEAD
      alert(t('connectionRequestSent'));
      fetchUser();
    } catch (error) {
      alert(error.response?.data?.error || t('failedToSendConnection'));
=======
      alert('Connection request sent!');
      fetchUser();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to send connection request');
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
    } finally {
      setConnecting(false);
    }
  };

  const currentUserId = currentUser?._id || currentUser?.id;
  const isConnected = user?.connections?.some(conn => 
    (conn._id?.toString() || conn.toString()) === currentUserId?.toString() || 
    conn.toString() === currentUserId?.toString()
  );

  const isCurrentUser = currentUserId?.toString() === id;

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
<<<<<<< HEAD
          <p className="text-black">{t('loadingProfile')}</p>
=======
          <p className="text-black">Loading profile...</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
<<<<<<< HEAD
          <p className="text-black">{t('userNotFound')}</p>
=======
          <p className="text-black">User not found</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="p-6 max-w-4xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-32 left-32 w-20 h-20 bg-blue-200 rounded-full opacity-30 floating pointer-events-none"></div>
      <div className="fixed bottom-32 right-32 w-16 h-16 bg-purple-200 rounded-full opacity-30 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 relative z-10 transition-all hover:gap-3"
      >
        <ArrowLeft size={20} /> {t('back')}
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 relative z-10 interactive-card">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-32 relative overflow-hidden">
          {/* Animated pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6">
          <div className="bg-white p-2 rounded-full shadow-lg floating">
            <div className="h-24 w-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <User size={40} className="text-white"/>
=======
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div className="bg-slate-800 h-32"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6">
          <div className="bg-white p-2 rounded-full">
            <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={40} className="text-gray-600"/>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
            {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center min-w-[150px]">
<<<<<<< HEAD
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">{t('trustPoints')}</p>
=======
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Trust Points</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            <div className="text-4xl font-black text-blue-700 flex items-center justify-center gap-2">
              <Award size={32} /> {user.trustPoints || 100}
            </div>
          </div>

          {!isCurrentUser && (
            <div>
              {isConnected ? (
                <div className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-2">
                  <CheckCircle size={20} />
<<<<<<< HEAD
                  {t('connected')}
=======
                  Connected
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={connecting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <UserPlus size={20} />
<<<<<<< HEAD
                  {connecting ? t('sending') : t('connect')}
=======
                  {connecting ? 'Sending...' : 'Connect'}
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
                </button>
              )}
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Star size={20} className="text-yellow-500" /> {t('skills')}
          </h3>
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star size={20} /> Skills</h3>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
          <div className="flex flex-wrap gap-2">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {skill}
                </span>
              ))
            ) : (
<<<<<<< HEAD
              <p className="text-gray-500 text-sm">{t('noSkillsListed')}</p>
            )}
          </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md interactive-card group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative z-10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-500" /> {t('connections')}
          </h3>
          <p className="text-2xl font-bold text-black mb-2">{user.connections?.length || 0}</p>
          <p className="text-sm text-gray-600">{t('connectedUsers')}</p>
          </div>
=======
              <p className="text-gray-500 text-sm">No skills listed</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users size={20} /> Connections</h3>
          <p className="text-2xl font-bold text-black mb-2">{user.connections?.length || 0}</p>
          <p className="text-sm text-gray-600">Connected users</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
        </div>

        {user.createdProjects && user.createdProjects.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
<<<<<<< HEAD
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle size={20} /> {t('createdProjects')}</h3>
=======
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle size={20} /> Created Projects</h3>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            <div className="space-y-3">
              {user.createdProjects.map((project) => (
                <div key={project._id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="font-bold text-black">{project.title}</div>
<<<<<<< HEAD
                  <div className="text-xs text-gray-500">{t('status')}: {project.status}</div>
=======
                  <div className="text-xs text-gray-500">Status: {project.status}</div>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

