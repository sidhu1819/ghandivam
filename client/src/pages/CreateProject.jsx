import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload, Link as LinkIcon, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: '',
    type: 'Team',
    requiredSkills: [],
    skillLevel: '',
    membersNeeded: '',
    roles: [],
    experienceLevel: '',
    startDate: '',
    endDate: '',
    milestones: [],
    communicationType: 'Video Call',
    realTimeSubtitles: true,
    virtualRooms: true,
    visibility: 'Public',
    joinRequestApprovals: true,
    aiBotAssistance: true,
    files: [],
    links: [],
    peerFeedback: true,
    customCriteria: '',
    trustPoints: true,
    status: 'Open'
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [milestoneInput, setMilestoneInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    'Basic Info',
    'Skills & Team',
    'Timeline',
    'Collaboration Settings',
    'Visibility',
    'Resources',
    'Evaluation',
    'Leader (Auto)'
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s !== skill)
    });
  };

  const handleAddRole = () => {
    if (roleInput.trim() && !formData.roles.includes(roleInput.trim())) {
      setFormData({
        ...formData,
        roles: [...formData.roles, roleInput.trim()]
      });
      setRoleInput('');
    }
  };

  const handleRemoveRole = (role) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter(r => r !== role)
    });
  };

  const handleAddMilestone = () => {
    if (milestoneInput.trim() && !formData.milestones.includes(milestoneInput.trim())) {
      setFormData({
        ...formData,
        milestones: [...formData.milestones, milestoneInput.trim()]
      });
      setMilestoneInput('');
    }
  };

  const handleRemoveMilestone = (milestone) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter(m => m !== milestone)
    });
  };

  const handleAddLink = () => {
    if (linkInput.trim() && !formData.links.includes(linkInput.trim())) {
      setFormData({
        ...formData,
        links: [...formData.links, linkInput.trim()]
      });
      setLinkInput('');
    }
  };

  const handleRemoveLink = (link) => {
    setFormData({
      ...formData,
      links: formData.links.filter(l => l !== link)
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      files: [...formData.files, ...files.map(f => f.name)]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = user?._id || user?.id;
      const projectData = {
        ...formData,
        description: formData.detailedDescription || formData.shortDescription || formData.description,
        status: 'Active',
        teamLeader: userId,
        members: userId ? [userId] : [],
        progress: 0,
        completedTasks: 0,
        totalTasks: 15,
        completedMilestones: 0,
        totalMilestones: formData.milestones.length || 5
      };
      
      const response = await axios.post('http://localhost:5000/api/projects', projectData);
      console.log('Project created:', response.data);
      alert('Project created successfully! Redirecting to Ongoing Projects...');
      navigate('/projects/ongoing');
    } catch (error) {
      console.error('Error creating project:', error);
      if (error.response?.data?.error) {
        alert(`Failed to create project: ${error.response.data.error}`);
      } else {
        alert('Failed to create project. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Build a FinTech App"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Short Description *
              </label>
              <textarea
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief overview of your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of your project, goals, and requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Type *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Individual"
                    checked={formData.type === 'Individual'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Individual</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Team"
                    checked={formData.type === 'Team'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Team</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 1: // Skills & Team
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Required Skills *
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a skill (e.g., React, Node.js)"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Skill Level *
              </label>
              <select
                required
                value={formData.skillLevel}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select skill level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Members Needed
              </label>
              <input
                type="number"
                min="1"
                value={formData.membersNeeded}
                onChange={(e) => setFormData({ ...formData, membersNeeded: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Number of team members needed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Roles
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRole())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a role (e.g., Frontend Developer, Designer)"
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="hover:text-purple-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select experience level</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>
        );

      case 2: // Timeline
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Milestones
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={milestoneInput}
                  onChange={(e) => setMilestoneInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a milestone (e.g., Complete UI Design)"
                />
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2 mt-2">
                {formData.milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm">{milestone}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(milestone)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Collaboration Settings
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Communication Type *
              </label>
              <select
                required
                value={formData.communicationType}
                onChange={(e) => setFormData({ ...formData, communicationType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Video Call">Video Call</option>
                <option value="Chat Only">Chat Only</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">Real-Time Subtitles</label>
                <p className="text-sm text-black">Enable AI-powered real-time subtitles for video calls</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.realTimeSubtitles}
                  onChange={(e) => setFormData({ ...formData, realTimeSubtitles: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">Virtual Rooms</label>
                <p className="text-sm text-black">Enable virtual collaboration rooms for team meetings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.virtualRooms}
                  onChange={(e) => setFormData({ ...formData, virtualRooms: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case 4: // Visibility
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Visibility *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Public"
                    checked={formData.visibility === 'Public'}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Public</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Private"
                    checked={formData.visibility === 'Private'}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                    className="w-4 h-4"
                  />
                  <span>Private</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">Join Request Approvals</label>
                <p className="text-sm text-black">Require approval for join requests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.joinRequestApprovals}
                  onChange={(e) => setFormData({ ...formData, joinRequestApprovals: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">AI Bot Assistance</label>
                <p className="text-sm text-black">Enable AI bot to help with project management</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.aiBotAssistance}
                  onChange={(e) => setFormData({ ...formData, aiBotAssistance: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case 5: // Resources
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Upload Files
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Click to upload files
                </label>
                <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.files.map((file, idx) => (
                      <div key={idx} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Add Links
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLink())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
                >
                  <LinkIcon size={18} />
                  Add
                </button>
              </div>
              <div className="space-y-2 mt-2">
                {formData.links.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6: // Evaluation
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">Peer Feedback</label>
                <p className="text-sm text-black">Enable peer feedback system for team members</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.peerFeedback}
                  onChange={(e) => setFormData({ ...formData, peerFeedback: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Custom Criteria
              </label>
              <textarea
                value={formData.customCriteria}
                onChange={(e) => setFormData({ ...formData, customCriteria: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Define custom evaluation criteria for this project..."
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="font-semibold text-black">Trust Points</label>
                <p className="text-sm text-black">Award trust points based on project completion</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.trustPoints}
                  onChange={(e) => setFormData({ ...formData, trustPoints: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );

      case 7: // Leader (Auto)
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-600" size={24} />
                <h3 className="font-bold text-lg text-blue-900">Project Leader Information</h3>
              </div>
              <p className="text-sm text-blue-700 mb-4">
                You are automatically assigned as the project leader. This information is pulled from your profile.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user?.name ? `${user.name} (You)` : 'You'}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Profile
                  </label>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">{user?.skills?.length ? user.skills.join(', ') : 'No skills listed'}</p>
                    <p className="text-xs text-gray-500 mt-1">Trust Points: {user?.trustPoints || 100}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Skills Summary
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user?.skills && user.skills.length > 0 ? (
                      user.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No skills listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} /> Back to Projects
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-black">
          <Plus className="text-blue-600" size={32} />
          Create New Project
        </h1>

        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSection(idx)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  currentSection === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="min-h-[400px]">
            <h2 className="text-xl font-bold mb-4 text-black">{sections[currentSection]}</h2>
            {renderSection()}
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex gap-4">
              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Next
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/projects')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Project'}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
