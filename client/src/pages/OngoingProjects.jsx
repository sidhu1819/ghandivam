import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, MessageSquare, Users, Play, Clock, CheckCircle, TrendingUp, Send, X, Settings, Mic, MicOff, PhoneOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const OngoingProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
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

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      scrollToBottom();
    }
  }, [messages, selectedProject]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchOngoingProjects = async () => {
    try {
      // Fetch only user's own projects
      const response = await axios.get('http://localhost:5000/api/projects/my-ongoing');
      const activeProjects = response.data
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
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-black">{t('loading')}...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-black text-lg">{t('noOngoingProjects')}</p>
          <p className="text-black text-sm mt-2">{t('manageActiveProjectsTitle')}</p>
          <button
            onClick={() => navigate('/projects/create')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            {t('createAProject')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-4 relative z-10">
            {projects.map((project) => (
              <div
                key={project._id || project.id}
                onClick={() => setSelectedProject(project)}
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
                    <span className="text-blue-600 font-semibold">{project.progress || 0}% {t('overallCompletion').toLowerCase()}</span>
                  </div>
                </div>
                </div>
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
                      placeholder={t('typeMessage')}
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
                  <TrendingUp size={20} /> {t('projectProgress')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('description')}</p>
                    <p className="text-black">{selectedProject.description}</p>
                  </div>
                  
                  {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t('requiredSkills')}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t('projectProgress')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all" 
                        style={{ width: `${selectedProject.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-600">
                      <span>{t('tasks')}: {selectedProject.completedTasks || 0}/{selectedProject.totalTasks || 0}</span>
                      <span>{t('milestones')}: {selectedProject.completedMilestones || 0}/{selectedProject.totalMilestones || 0}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEndProject(selectedProject._id || selectedProject.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                  >
                    {t('endProject')}
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
                <strong>{t('note')}:</strong> {t('realTimeSubtitles')} <strong>{selectedSubtitle}</strong> {t('duringCall')}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowVideoCallModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={startVideoCall}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Video size={20} />
                {t('startCall')}
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
            <div className="text-center text-white mb-4">
              <Video size={48} className="mx-auto mb-2" />
              <p className="font-semibold">{t('videoCallActive')}</p>
              <p className="text-sm text-blue-200">{t('subtitles')}: {selectedSubtitle}</p>
            </div>
          <div className="flex gap-2 justify-center">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
              <Mic size={20} />
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingProjects;
