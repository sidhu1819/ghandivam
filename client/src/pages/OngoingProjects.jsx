<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, MessageSquare, Users, Play, Clock, CheckCircle, TrendingUp, Send, X, Settings, Mic, MicOff, PhoneOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, MessageSquare, Users, Play, Clock, CheckCircle, TrendingUp } from 'lucide-react';
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import axios from 'axios';

const OngoingProjects = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
  const { t } = useLanguage();
=======
<<<<<<< HEAD
  const { user } = useAuth();
  const { t } = useLanguage();
=======
<<<<<<< HEAD
  const { user } = useAuth();
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const messagesEndRef = useRef(null);

  const subtitleOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' }
  ];
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  useEffect(() => {
    if (selectedProject) {
      scrollToBottom();
    }
  }, [messages, selectedProject]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const fetchOngoingProjects = async () => {
    try {
      // Fetch only user's own projects
      const response = await axios.get('http://localhost:5000/api/projects/my-ongoing');
      const activeProjects = response.data
<<<<<<< HEAD
=======
=======
=======
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
  const fetchOngoingProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      const activeProjects = response.data
        .filter(p => p.status === 'Active')
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        .map(project => ({
          ...project,
          id: project._id || project.id,
          members: project.members?.length || 1,
          progress: project.progress || 0,
          completedTasks: project.completedTasks || 0,
          totalTasks: project.totalTasks || 15,
          completedMilestones: project.completedMilestones || 0,
          totalMilestones: project.totalMilestones || 5,
          description: project.description || project.detailedDescription || project.shortDescription || 'No description available'
        }));
      
      setProjects(activeProjects);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      
      // Initialize messages for each project
      const initialMessages = {};
      activeProjects.forEach(project => {
        initialMessages[project.id] = [
          {
            id: 1,
            sender: 'System',
            message: 'Welcome to the project chat! Start collaborating with your team.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSystem: true
          }
        ];
      });
      setMessages(initialMessages);
      
      if (activeProjects.length > 0 && !selectedProject) {
        setSelectedProject(activeProjects[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
      console.log('Fetched ongoing projects:', activeProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([
        {
          id: 1,
          title: "AI Image Generator",
          description: "Building an innovative AI-powered image generation tool",
          requiredSkills: ["Python", "AI/ML"],
          status: "Active",
          members: 3,
          progress: 45,
          completedTasks: 8,
          totalTasks: 15,
          completedMilestones: 2,
          totalMilestones: 5
        }
      ]);
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    } finally {
      setLoading(false);
    }
  };

  const handleEndProject = async (projectId) => {
    if (window.confirm('Are you sure you want to end this project?')) {
      try {
        await axios.patch(`http://localhost:5000/api/projects/${projectId}`, { status: 'Completed' });
        alert('Project ended successfully!');
        fetchOngoingProjects();
      } catch (error) {
        console.error('Error ending project:', error);
        alert('Failed to end project. Please try again.');
      }
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const handleSendMessage = (projectId) => {
    const messageText = newMessage[projectId]?.trim();
    if (!messageText) return;

    const newMsg = {
      id: Date.now(),
      sender: user?.name || user?.username || 'You',
      message: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: false
    };

    setMessages(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), newMsg]
    }));

    setNewMessage(prev => ({
      ...prev,
      [projectId]: ''
    }));
  };

  const handleVideoCall = () => {
    setShowVideoCallModal(true);
  };

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    setShowVideoCallModal(false);
  };

  const endVideoCall = () => {
    setIsVideoCallActive(false);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    <div className="p-6 max-w-7xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-40 right-40 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 floating pointer-events-none"></div>
      <div className="fixed bottom-40 left-40 w-20 h-20 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-30 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 relative z-10 transition-all hover:gap-3"
      >
        <ArrowLeft size={20} /> {t('backToProjects')}
      </button>

      <div className="mb-6 relative z-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-black">
          <Clock className="text-green-600 floating" size={32} />
          {t('ongoingProjects')}
        </h1>
        <p className="text-black">{t('manageActiveProjectsTitle')}</p>
<<<<<<< HEAD
=======
=======
    <div className="p-6 max-w-7xl mx-auto">
=======
  return (
    <div className="p-6 max-w-6xl mx-auto">
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} /> Back to Projects
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-black">
          <Clock className="text-green-600" size={32} />
          Ongoing Projects
        </h1>
        <p className="text-black">Manage your active projects and collaborate with your team</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      </div>

      {loading ? (
        <div className="text-center py-12">
<<<<<<< HEAD
          <p className="text-black">{t('loading')}...</p>
=======
<<<<<<< HEAD
          <p className="text-black">{t('loading')}...</p>
=======
          <p className="text-black">Loading projects...</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noOngoingProjects')}</p>
          <p className="text-black text-sm mt-2">{t('manageActiveProjectsTitle')}</p>
=======
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noOngoingProjects')}</p>
          <p className="text-black text-sm mt-2">{t('manageActiveProjectsTitle')}</p>
=======
          <p className="text-black text-lg">No ongoing projects</p>
          <p className="text-black text-sm mt-2">You don't have any active projects at the moment</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          <button
            onClick={() => navigate('/projects/create')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            {t('createAProject')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-4 relative z-10">
<<<<<<< HEAD
=======
=======
            Create a Project
          </button>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-4">
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            {projects.map((project) => (
              <div
                key={project._id || project.id}
                onClick={() => setSelectedProject(project)}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                className={`bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all interactive-card group relative overflow-hidden ${
                  selectedProject?.id === project.id
                    ? 'border-blue-500 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Decorative gradient on selection */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 transition-opacity ${
                  selectedProject?.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}></div>
                <div className="relative z-10">
<<<<<<< HEAD
=======
=======
                className={`bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all ${
                  selectedProject?.id === project.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <h3 className="font-bold text-lg text-black">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Users size={14} /> {project.members} members
                    </span>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                    <span className="text-blue-600 font-semibold">{project.progress || 0}% {t('overallCompletion').toLowerCase()}</span>
                  </div>
                </div>
                </div>
<<<<<<< HEAD
=======
=======
                    <span className="text-blue-600 font-semibold">{project.progress || 0}% complete</span>
                  </div>
                </div>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </div>
            ))}
          </div>

          {/* Collaboration Tools */}
          {selectedProject && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-250px)]">
                {/* Header with Video Call Button */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
                    <p className="text-sm text-blue-100">{selectedProject.members || 1} team members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {isVideoCallActive && (
                      <div className="bg-red-500 px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-2 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE CALL
                      </div>
                    )}
                    <button
                      onClick={handleVideoCall}
                      className={`p-3 rounded-full transition-all ${
                        isVideoCallActive
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-white hover:bg-gray-100 text-blue-600'
                      } shadow-lg`}
                      title="Start Video Call"
                    >
                      <Video size={24} />
                    </button>
                    {isVideoCallActive && (
                      <button
                        onClick={endVideoCall}
                        className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
                        title="End Call"
                      >
                        <PhoneOff size={24} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Chat Area - WhatsApp Style */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
                  {messages[selectedProject.id]?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === (user?.name || user?.username || 'You') ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.isSystem
                            ? 'bg-yellow-100 text-yellow-800 mx-auto text-center'
                            : msg.sender === (user?.name || user?.username || 'You')
                            ? 'bg-green-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {!msg.isSystem && (
                          <div className={`text-xs font-semibold mb-1 ${msg.sender === (user?.name || user?.username || 'You') ? 'text-green-100' : 'text-blue-600'}`}>
                            {msg.sender}
                          </div>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <div className={`text-xs mt-1 ${msg.sender === (user?.name || user?.username || 'You') ? 'text-green-100' : 'text-gray-500'}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input - WhatsApp Style */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage[selectedProject.id] || ''}
                      onChange={(e) => setNewMessage(prev => ({ ...prev, [selectedProject.id]: e.target.value }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage(selectedProject.id);
                        }
                      }}
<<<<<<< HEAD
                      placeholder={t('typeMessage')}
=======
<<<<<<< HEAD
                      placeholder={t('typeMessage')}
=======
                      placeholder="Type a message..."
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSendMessage(selectedProject.id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Details Sidebar */}
              <div className="mt-4 bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-black">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  <TrendingUp size={20} /> {t('projectProgress')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('description')}</p>
<<<<<<< HEAD
=======
=======
                  <TrendingUp size={20} /> Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                    <p className="text-black">{selectedProject.description}</p>
                  </div>
                  
                  {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 && (
                    <div>
<<<<<<< HEAD
                      <p className="text-sm text-gray-600 mb-2">{t('requiredSkills')}</p>
=======
<<<<<<< HEAD
                      <p className="text-sm text-gray-600 mb-2">{t('requiredSkills')}</p>
=======
                      <p className="text-sm text-gray-600 mb-2">Required Skills</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project._id || project.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <h2 className="font-bold text-lg">{project.title}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                    {project.status || 'Active'}
                  </span>
                </div>
                <button
                  onClick={() => handleEndProject(project._id || project.id)}
                  className="text-red-500 text-sm font-bold border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                >
                  End Project
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-black mb-2">Description</h3>
                    <p className="text-black text-sm">{project.description || 'No description available'}</p>
                  </div>
                  
                  {project.requiredSkills && project.requiredSkills.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                        <Users size={18} /> Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

<<<<<<< HEAD
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t('projectProgress')}</p>
=======
<<<<<<< HEAD
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t('projectProgress')}</p>
=======
<<<<<<< HEAD
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Progress</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all" 
                        style={{ width: `${selectedProject.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-600">
<<<<<<< HEAD
                      <span>{t('tasks')}: {selectedProject.completedTasks || 0}/{selectedProject.totalTasks || 0}</span>
                      <span>{t('milestones')}: {selectedProject.completedMilestones || 0}/{selectedProject.totalMilestones || 0}</span>
=======
<<<<<<< HEAD
                      <span>{t('tasks')}: {selectedProject.completedTasks || 0}/{selectedProject.totalTasks || 0}</span>
                      <span>{t('milestones')}: {selectedProject.completedMilestones || 0}/{selectedProject.totalMilestones || 0}</span>
=======
                      <span>Tasks: {selectedProject.completedTasks || 0}/{selectedProject.totalTasks || 0}</span>
                      <span>Milestones: {selectedProject.completedMilestones || 0}/{selectedProject.totalMilestones || 0}</span>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                    </div>
                  </div>

                  <button
                    onClick={() => handleEndProject(selectedProject._id || selectedProject.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                  >
<<<<<<< HEAD
                    {t('endProject')}
=======
<<<<<<< HEAD
                    {t('endProject')}
=======
                    End Project
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Video Call Modal with Subtitle Selection */}
      {showVideoCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <h3 className="text-2xl font-bold text-black">{t('startVideoCall')}</h3>
            <button
              onClick={() => setShowVideoCallModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('selectSubtitleLanguage')}
            </label>
<<<<<<< HEAD
=======
=======
              <h3 className="text-2xl font-bold text-black">Start Video Call</h3>
              <button
                onClick={() => setShowVideoCallModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Subtitle Language
              </label>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              <div className="grid grid-cols-2 gap-3">
                {subtitleOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setSelectedSubtitle(option.name)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSubtitle === option.name
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-blue-800">
<<<<<<< HEAD
                <strong>{t('note')}:</strong> {t('realTimeSubtitles')} <strong>{selectedSubtitle}</strong> {t('duringCall')}
=======
<<<<<<< HEAD
                <strong>{t('note')}:</strong> {t('realTimeSubtitles')} <strong>{selectedSubtitle}</strong> {t('duringCall')}
=======
                <strong>Note:</strong> Real-time subtitles will be converted to <strong>{selectedSubtitle}</strong> during the call. 
                All team members can see subtitles in their preferred language.
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowVideoCallModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
<<<<<<< HEAD
                {t('cancel')}
=======
<<<<<<< HEAD
                {t('cancel')}
=======
                Cancel
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </button>
              <button
                onClick={startVideoCall}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Video size={20} />
<<<<<<< HEAD
                {t('startCall')}
=======
<<<<<<< HEAD
                {t('startCall')}
=======
                Start Call
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Video Call Overlay */}
      {isVideoCallActive && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl p-6 shadow-2xl border-4 border-blue-400 z-40 max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-white font-bold">Live Call</span>
            </div>
            <button
              onClick={endVideoCall}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            >
              <PhoneOff size={18} />
            </button>
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
            <div className="text-center text-white mb-4">
              <Video size={48} className="mx-auto mb-2" />
              <p className="font-semibold">{t('videoCallActive')}</p>
              <p className="text-sm text-blue-200">{t('subtitles')}: {selectedSubtitle}</p>
            </div>
<<<<<<< HEAD
=======
=======
          <div className="text-center text-white mb-4">
            <Video size={48} className="mx-auto mb-2" />
            <p className="font-semibold">Video Call Active</p>
            <p className="text-sm text-blue-200">Subtitles: {selectedSubtitle}</p>
          </div>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          <div className="flex gap-2 justify-center">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
              <Mic size={20} />
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
              <Settings size={20} />
            </button>
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
                  <div className="flex items-center gap-2 text-sm text-black mb-4">
                    <Users size={18} />
                    <span>{project.members || 1} team member(s)</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-black mb-2 flex items-center gap-2">
                      <TrendingUp size={18} /> Project Progress
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-black">Overall Completion</span>
                          <span className="font-bold text-black">{(project.progress || 45)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${project.progress || 45}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-black">Tasks: </span>
                          <span className="font-bold text-black">{(project.completedTasks || 8)}/{(project.totalTasks || 15)}</span>
                        </div>
                        <div>
                          <span className="text-black">Milestones: </span>
                          <span className="font-bold text-black">{(project.completedMilestones || 2)}/{(project.totalMilestones || 5)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl aspect-video relative flex items-center justify-center text-white overflow-hidden group shadow-2xl border-4 border-blue-400">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      LIVE
                    </div>
                    <div className="z-10 text-center">
                      <div className="mb-4">
                        <Video size={64} className="mx-auto text-white drop-shadow-lg" fill="currentColor" />
                      </div>
                      <h3 className="font-bold text-2xl mb-2 drop-shadow-lg">Live Sync Room</h3>
                      <p className="text-blue-200 text-sm mb-6 font-semibold">AI Subtitles: ON (English)</p>
                      <button
                        onClick={() => alert("Connecting to Secure Video Room with AI Translation...")}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        <Play size={18} fill="white" /> Join Call
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200 shadow-lg">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4 text-lg">
                      <MessageSquare size={20} className="text-blue-600" /> Team Chat (AI Translated)
                    </h4>
                    <div className="space-y-3 text-sm max-h-48 overflow-y-auto pr-2">
                      <div className="bg-white p-3 rounded-lg shadow-md border-l-4 border-blue-400">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-blue-600">Maria (Spanish)</span>
                          <span className="text-xs text-gray-400">2m ago</span>
                        </div>
                        <p className="text-black mb-1">Hola, he subido el diseño.</p>
                        <p className="text-xs text-blue-600 italic font-medium">Translated: Hello, I have uploaded the design.</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg shadow-md border-l-4 border-green-400 text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-xs text-gray-400">1m ago</span>
                          <span className="font-bold text-xs text-green-600">You</span>
                        </div>
                        <p className="text-black">Great! Checking it now.</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
