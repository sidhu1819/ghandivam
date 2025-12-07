import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home as HomeIcon, Briefcase, BookOpen, User, Users as UsersIcon, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import MyProjects from './pages/MyProjects';
import CreateProject from './pages/CreateProject';
import JoinProject from './pages/JoinProject';
import OngoingProjects from './pages/OngoingProjects';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import SkillLearning from './pages/SkillLearning';
import ChatBot from './components/ChatBot';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">G</div>
          GHANDIVAM
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 flex items-center gap-1"><HomeIcon size={18}/> {t('home')}</Link>
          <Link to="/projects" className="hover:text-blue-400 flex items-center gap-1"><Briefcase size={18}/> {t('myProjects')}</Link>
          <Link to="/skills" className="hover:text-blue-400 flex items-center gap-1"><BookOpen size={18}/> {t('learn')}</Link>
          <Link to="/users" className="hover:text-blue-400 flex items-center gap-1"><UsersIcon size={18}/> {t('connect')}</Link>
          <Link to="/profile" className="hover:text-blue-400 flex items-center gap-1"><User size={18}/> {t('profile')}</Link>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">@{user?.username}</span>
            <button
              onClick={logout}
              className="hover:text-red-400 flex items-center gap-1"
            >
              <LogOut size={18}/> {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <MyProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/create"
                element={
                  <ProtectedRoute>
                    <CreateProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/join"
                element={
                  <ProtectedRoute>
                    <JoinProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects/ongoing"
                element={
                  <ProtectedRoute>
                    <OngoingProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skills"
                element={
                  <ProtectedRoute>
                    <SkillLearning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <ChatBot />
        </div>
      </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;