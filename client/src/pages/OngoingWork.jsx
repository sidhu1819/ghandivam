import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, MessageSquare, Play, ArrowLeft, Users, Calendar, CheckCircle, X } from 'lucide-react';
import axios from 'axios';
import { getCurrentUserId } from '../utils/auth';

const OngoingWork = () => {
  const navigate = useNavigate();
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

  const fetchOngoingProjects = async () => {
    try {
      const userId = getCurrentUserId();
      const response = await axios.get(`http://localhost:5000/api/projects/my/ongoing/${userId}`);
      setOngoingProjects(response.data);
      if (response.data.length > 0 && !selectedProject) {
        setSelectedProject(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setOngoingProjects([]);
    }
  };

  const handleEndProject = async (projectId) => {
    if (window.confirm('Are you sure you want to end this project?')) {
      try {
        await axios.patch(`http://localhost:5000/api/projects/${projectId}`, {
          status: 'Completed'
        });
        alert('Project ended successfully!');
        fetchOngoingProjects();
      } catch (error) {
        console.error('Error ending project:', error);
        alert(error.response?.data?.error || 'Failed to end project. Please try again.');
      }
    }
  };

  if (ongoingProjects.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/projects')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Ongoing Projects</h1>
        </div>
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No ongoing projects at the moment.</p>
          <button
            onClick={() => navigate('/projects/create')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create a Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/projects')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Ongoing Projects</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Projects List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Active Projects</h2>
            <div className="space-y-2">
              {ongoingProjects.map(project => (
                <button
                  key={project._id || project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedProject?._id === project._id || selectedProject?.id === project.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                    <span>{project.progress || 0}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-3">
          {selectedProject && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Project Header */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedProject.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedProject.description || selectedProject.shortDescription}</p>
                </div>
                <button
                  onClick={() => handleEndProject(selectedProject._id || selectedProject.id)}
                  className="text-red-500 text-sm font-bold border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                >
                  End Project
                </button>
              </div>

              {/* Progress Section */}
              <div className="p-6 border-b bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-700">{selectedProject.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${selectedProject.progress || 0}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tasks: </span>
                    <span className="font-semibold text-gray-900">
                      {selectedProject.completedTasks || 0} / {selectedProject.totalTasks || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Milestones: </span>
                    <span className="font-semibold text-gray-900">
                      {selectedProject.completedMilestones || 0} / {selectedProject.totalMilestones || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Workspace Content */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Live Video Call */}
                <div className="bg-black rounded-xl aspect-video relative flex items-center justify-center text-white overflow-hidden group">
                  <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                  <div className="z-10 text-center">
                    <Video size={48} className="mx-auto mb-2 text-gray-400" />
                    <h3 className="font-bold text-xl mb-1">Live Sync Room</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      AI Subtitles: {selectedProject.realTimeSubtitles ? 'ON' : 'OFF'} (English)
                    </p>
                    <button
                      onClick={() => alert("Connecting to Secure Video Room with AI Translation...")}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 mx-auto"
                    >
                      <Play size={16} fill="white" /> Join Call
                    </button>
                  </div>
                </div>

                {/* Chat & Tasks */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                      <MessageSquare size={18} /> Team Chat (AI Translated)
                    </h4>
                    <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <span className="font-bold text-xs text-gray-500">Maria (Spanish):</span>
                        <p className="text-gray-700">Hola, he subido el diseño.</p>
                        <p className="text-xs text-blue-600 italic">Translated: Hello, I have uploaded the design.</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm text-right">
                        <span className="font-bold text-xs text-gray-500">You:</span>
                        <p className="text-gray-700">Great! Checking it now.</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <span className="font-bold text-xs text-gray-500">John (English):</span>
                        <p className="text-gray-700">The API integration looks good!</p>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full mt-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>

                  {/* Team Members */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <Users size={18} /> Team Members
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.members && selectedProject.members.length > 0 ? (
                        selectedProject.members.map((member, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2 rounded">
                            <span className="text-sm text-gray-700">{member.username || member.name || `Member ${idx + 1}`}</span>
                            <span className="text-xs text-gray-500">Active</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No team members yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 border-t bg-gray-50">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {selectedProject.category && (
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="font-semibold text-gray-900">{selectedProject.category}</p>
                    </div>
                  )}
                  {selectedProject.type && (
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <p className="font-semibold text-gray-900">{selectedProject.type}</p>
                    </div>
                  )}
                  {selectedProject.startDate && (
                    <div>
                      <span className="text-gray-500">Start Date:</span>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedProject.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {selectedProject.endDate && (
                    <div>
                      <span className="text-gray-500">End Date:</span>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedProject.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Required Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.requiredSkills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingWork;

