import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users, Briefcase, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
<<<<<<< HEAD
import { useLanguage } from '../context/LanguageContext';
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
import axios from 'axios';

const JoinProject = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { t } = useLanguage();
=======
<<<<<<< HEAD
  const { t } = useLanguage();
=======
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    // Seed sample projects if none exist
    seedSampleProjects();
  }, []);

  const seedSampleProjects = async () => {
    try {
      await axios.post('http://localhost:5000/api/projects/seed-sample');
    } catch (error) {
      // Ignore errors - projects might already exist
      console.log('Sample projects already exist or error seeding:', error);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  }, []);

>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.requiredSkills?.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      const openProjects = response.data.filter(p => p.status === 'Open');
      setProjects(openProjects);
      setFilteredProjects(openProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([
        { 
          id: 1, 
          title: "Build a FinTech App", 
          requiredSkills: ["React", "Node.js"], 
          description: "Looking for skilled developers to build a modern fintech application",
          status: "Open"
        },
        { 
          id: 2, 
          title: "AI Image Generator", 
          requiredSkills: ["Python", "AI/ML"], 
          description: "Join our innovative AI project to create an image generation tool",
          status: "Open"
        },
        { 
          id: 3, 
          title: "E-Commerce Platform", 
          requiredSkills: ["React", "MongoDB"], 
          description: "Building the next big marketplace with modern technologies",
          status: "Open"
        }
      ]);
      setFilteredProjects([
        { 
          id: 1, 
          title: "Build a FinTech App", 
          requiredSkills: ["React", "Node.js"], 
          description: "Looking for skilled developers to build a modern fintech application",
          status: "Open"
        },
        { 
          id: 2, 
          title: "AI Image Generator", 
          requiredSkills: ["Python", "AI/ML"], 
          description: "Join our innovative AI project to create an image generation tool",
          status: "Open"
        },
        { 
          id: 3, 
          title: "E-Commerce Platform", 
          requiredSkills: ["React", "MongoDB"], 
          description: "Building the next big marketplace with modern technologies",
          status: "Open"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const { user } = useAuth();

  const handleJoinProject = async (projectId) => {
    try {
      const userId = user?._id || user?.id;
      if (!user || !userId) {
<<<<<<< HEAD
        alert(t('pleaseLoginToJoin'));
=======
<<<<<<< HEAD
        alert(t('pleaseLoginToJoin'));
=======
        alert('Please login to join projects');
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        navigate('/login');
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/projects/${projectId}/join`, { 
        userId: userId
      });
      
      console.log('Joined project:', response.data);
<<<<<<< HEAD
      alert(t('successfullyJoined'));
=======
<<<<<<< HEAD
      alert(t('successfullyJoined'));
=======
      alert('Successfully joined the project! Redirecting to Ongoing Projects...');
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      
      navigate('/projects/ongoing');
    } catch (error) {
      console.error('Error joining project:', error);
      if (error.response?.status === 400) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        alert(error.response.data.error || t('alreadyMember'));
      } else if (error.response?.status === 404) {
        alert(t('projectNotFound'));
      } else {
        alert(t('failedToJoin'));
<<<<<<< HEAD
=======
=======
        alert(error.response.data.error || 'You are already a member of this project.');
      } else if (error.response?.status === 404) {
        alert('Project not found. It may have been deleted.');
      } else {
        alert('Failed to join project. Please try again.');
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
      }
    }
  };

  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
    <div className="p-6 max-w-6xl mx-auto relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-40 right-40 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-30 floating pointer-events-none"></div>
      <div className="fixed bottom-40 left-40 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 floating pointer-events-none" style={{ animationDelay: '3s' }}></div>

      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 relative z-10 transition-all hover:gap-3"
      >
        <ArrowLeft size={20} /> {t('backToProjects')}
      </button>

      <div className="mb-6 relative z-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-black">
          <Briefcase className="text-blue-600 floating" size={32} />
          <span>{t('joinAProject')}</span>
        </h1>
        <p className="text-black">{t('browseAvailableProjects')}</p>
<<<<<<< HEAD
=======
=======
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} /> Back to Projects
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-black">
          <Briefcase className="text-blue-600" size={32} />
          Join a Project
        </h1>
        <p className="text-black">Browse available projects and apply to join teams</p>
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
          placeholder={t('searchProjects')}
=======
<<<<<<< HEAD
          placeholder={t('searchProjects')}
=======
          placeholder="Search projects by title, description, or skills..."
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
<<<<<<< HEAD
          <p className="text-black">{t('loadingProjects')}</p>
=======
<<<<<<< HEAD
          <p className="text-black">{t('loadingProjects')}</p>
=======
          <p className="text-black">Loading projects...</p>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noProjects')}</p>
          <p className="text-black text-sm mt-2">
            {searchTerm ? t('tryDifferentSearch') : t('noOpenProjects')}
=======
<<<<<<< HEAD
          <p className="text-black text-lg">{t('noProjects')}</p>
          <p className="text-black text-sm mt-2">
            {searchTerm ? t('tryDifferentSearch') : t('noOpenProjects')}
=======
          <p className="text-black text-lg">No projects found</p>
          <p className="text-black text-sm mt-2">
            {searchTerm ? 'Try a different search term' : 'No open projects available at the moment'}
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id || project.id}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-2xl transition-all interactive-card group relative overflow-hidden"
            >
              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-black flex-1">{project.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                  {project.status || t('open')}
<<<<<<< HEAD
=======
=======
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-black flex-1">{project.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                  {project.status || 'Open'}
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                </span>
              </div>
              
              <p className="text-black text-sm mb-4 line-clamp-3">
<<<<<<< HEAD
                {project.description || t('noDescriptionAvailable')}
=======
<<<<<<< HEAD
                {project.description || t('noDescriptionAvailable')}
=======
                {project.description || 'No description available'}
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
              </p>

              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-gray-400" />
<<<<<<< HEAD
                    <span className="text-xs font-semibold text-black">{t('requiredSkills')}:</span>
=======
<<<<<<< HEAD
                    <span className="text-xs font-semibold text-black">{t('requiredSkills')}:</span>
=======
                    <span className="text-xs font-semibold text-black">Required Skills:</span>
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleJoinProject(project._id || project.id)}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3d8de14eeb27d6b293c8027db75b8cf0eb66facd
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all transform group-hover:scale-105 shadow-lg"
              >
                <CheckCircle size={18} />
                {t('applyToJoin')}
              </button>
              </div>
<<<<<<< HEAD
=======
=======
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Apply to Join
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

export default JoinProject;

