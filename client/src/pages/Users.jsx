import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import { Search, Users as UsersIcon, UserPlus } from 'lucide-react';
import axios from 'axios';

const Users = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
<<<<<<< HEAD
  const { t } = useLanguage();
=======
<<<<<<< HEAD
  const { t } = useLanguage();
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const currentUserId = currentUser?._id || currentUser?.id;
      setUsers(response.data.filter(u => (u._id || u.id) !== currentUserId));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    <div className="p-6 max-w-6xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 floating pointer-events-none"></div>
      <div className="fixed bottom-40 left-32 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 floating pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="mb-6 relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-black flex items-center gap-2">
          <UsersIcon className="text-blue-600 floating" size={32} />
          <span>{t('connectWithUsers')}</span>
        </h1>
        <p className="text-black">{t('discoverConnect')}</p>
<<<<<<< HEAD
=======
=======
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-black flex items-center gap-2">
          <UsersIcon className="text-blue-600" size={32} />
          Connect with Users
        </h1>
        <p className="text-black">Discover and connect with other members</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
          placeholder={t('searchUsers')}
=======
<<<<<<< HEAD
          placeholder={t('searchUsers')}
=======
          placeholder="Search users by name, username, or email..."
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
<<<<<<< HEAD
          <p className="text-black">{t('loadingUsers')}</p>
=======
<<<<<<< HEAD
          <p className="text-black">{t('loadingUsers')}</p>
=======
          <p className="text-black">Loading users...</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <UsersIcon size={48} className="mx-auto text-gray-400 mb-4" />
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noUsersFound')}</p>
=======
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noUsersFound')}</p>
=======
          <p className="text-black text-lg">No users found</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/users/${user._id}`)}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all cursor-pointer interactive-card group relative overflow-hidden"
            >
              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <UsersIcon className="text-white" size={32} />
<<<<<<< HEAD
=======
=======
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <UsersIcon className="text-gray-600" size={32} />
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-black">{user.name}</h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
<<<<<<< HEAD
                  <p className="text-xs text-gray-500">{t('trustPoints')}</p>
=======
<<<<<<< HEAD
                  <p className="text-xs text-gray-500">{t('trustPoints')}</p>
=======
                  <p className="text-xs text-gray-500">Trust Points</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  <p className="text-lg font-bold text-blue-600">{user.trustPoints || 100}</p>
                </div>
                {user.skills && user.skills.length > 0 && (
                  <div>
<<<<<<< HEAD
                    <p className="text-xs text-gray-500">{t('skills')}</p>
=======
<<<<<<< HEAD
                    <p className="text-xs text-gray-500">{t('skills')}</p>
=======
                    <p className="text-xs text-gray-500">Skills</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                    <p className="text-sm font-semibold text-black">{user.skills.length}</p>
                  </div>
                )}
              </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all transform group-hover:scale-105 shadow-lg">
                <UserPlus size={18} />
                {t('viewProfile')}
              </button>
              </div>
<<<<<<< HEAD
=======
=======
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                <UserPlus size={18} />
                View Profile
              </button>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;

