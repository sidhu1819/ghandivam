import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Eye, Plus } from 'lucide-react';
import axios from 'axios';
import { getCurrentUserId } from '../utils/auth';

const CreatedProjects = () => {
  const navigate = useNavigate();
  const [createdProjects, setCreatedProjects] = useState([]);

  useEffect(() => {
    fetchCreatedProjects();
  }, []);

  const fetchCreatedProjects = async () => {
    try {
      const userId = getCurrentUserId();
      const response = await axios.get(`http://localhost:5000/api/projects/my/created/${userId}`);
      setCreatedProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setCreatedProjects([]);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const userId = getCurrentUserId();
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
          data: { userId }
        });
        alert('Project deleted successfully!');
        fetchCreatedProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert(error.response?.data?.error || 'Failed to delete project. Please try again.');
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/projects')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Created Projects</h1>
        </div>
        <button
          onClick={() => navigate('/projects/create')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Create New
        </button>
      </div>

      {createdProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdProjects.map(project => (
            <div key={project._id || project.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ml-2 ${
                  project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.shortDescription || project.description || 'No description available'}
              </p>

              {project.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.requiredSkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {project.requiredSkills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        +{project.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/projects/ongoing`)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm flex items-center justify-center gap-1"
                >
                  <Eye size={16} /> View
                </button>
                <button
                  onClick={() => navigate(`/projects/${project._id || project.id}/edit`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                  title="Edit Project"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id || project.id)}
                  className="px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 text-sm text-red-700"
                  title="Delete Project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">You haven't created any projects yet.</p>
          <button
            onClick={() => navigate('/projects/create')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Your First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatedProjects;

