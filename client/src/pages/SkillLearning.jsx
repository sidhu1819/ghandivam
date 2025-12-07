<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
import React, { useState, useEffect } from 'react';
import { Search, Play, Book, Upload, X, Calendar, Clock, Users, Award, CheckCircle, FileText, Video, Link as LinkIcon, User, Star } from 'lucide-react';
import axios from 'axios';

const SkillLearning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [activeTab, setActiveTab] = useState('live');

  const [liveClasses, setLiveClasses] = useState([
    { 
      id: 1, 
      title: "Mastering Node.js Streams", 
      instructor: "John Doe", 
      time: "Starts in 10m",
      date: "2024-01-15",
      language: "English",
      subtitles: true,
      enrolled: false,
      progress: 0,
      rewards: []
    },
    { 
      id: 2, 
      title: "Advanced React Patterns", 
      instructor: "Sarah Dev", 
      time: "Starts in 2h",
      date: "2024-01-15",
      language: "English",
      subtitles: true,
      enrolled: false,
      progress: 0,
      rewards: []
    },
    { 
      id: 3, 
      title: "AI for Beginners", 
      instructor: "Dr. A. Smith", 
      time: "Live Now",
      date: "2024-01-15",
      language: "English",
      subtitles: true,
      enrolled: true,
      progress: 45,
      rewards: ["Completion Badge"]
    }
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, title: "Full Stack Hackathon Guide", type: "PDF", author: "Ghandivam Team", downloads: 234 },
    { id: 2, title: "React Best Practices", type: "PDF", author: "Tech Community", downloads: 189 },
    { id: 3, title: "MongoDB Quick Reference", type: "Document", author: "Database Experts", downloads: 156 }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    courseType: 'Video',
    videos: [],
    pdfs: [],
    images: [],
    links: [],
    date: '',
    time: '',
    language: 'English',
    subtitles: true,
    modules: [],
    lessons: [],
    assignments: [],
    name: '',
    bio: '',
    expertise: [],
    pricing: 'Free',
    accessDuration: '',
    privacySettings: 'Public',
    enableCertificate: false,
    requirements: '',
    adminApproval: false,
    policyAgreement: false
  });

  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    'Course Info',
    'Course Type',
    'Content Upload',
    'Live Class Settings',
    'Curriculum Builder',
    'Teacher Info',
    'Pricing & Access',
    'Certification',
    'Submit Review'
  ];

  const handleJoinClass = (classId) => {
    setLiveClasses(liveClasses.map(cls => 
      cls.id === classId 
        ? { ...cls, enrolled: true, progress: 0 }
        : cls
    ));
    setEnrolledClasses([...enrolledClasses, liveClasses.find(c => c.id === classId)]);
    alert('Successfully joined the live class!');
  };

  const handleProgressUpdate = (classId, progress) => {
    setLiveClasses(liveClasses.map(cls => 
      cls.id === classId 
        ? { ...cls, progress: Math.min(progress, 100) }
        : cls
    ));
  };

  const filteredLiveClasses = liveClasses.filter(cls =>
    cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enrolledClassesList = liveClasses.filter(cls => cls.enrolled);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black mb-2">Knowledge Center</h1>
          <p className="text-black">Acquire skills and earn credentials.</p>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
import React from 'react';
import { Search, Play, Book, Upload } from 'lucide-react';

const SkillLearning = () => {
  const courses = [
    { id: 1, title: "Advanced React Patterns", instructor: "Sarah Dev", type: "Live Class", time: "Starts in 10m" },
    { id: 2, title: "AI for Beginners", instructor: "Dr. A. Smith", type: "Video Course", time: "Self-paced" },
    { id: 3, title: "Full Stack Hackathon Guide", instructor: "Ghandivam Team", type: "Document", time: "Read now" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Knowledge Center</h1>
          <p className="text-gray-500">Acquire skills and earn credentials.</p>
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for courses, documents..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <button 
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-semibold whitespace-nowrap"
        >
          <Upload size={18}/> Upload / Create Class
        </button>
      </div>

      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('live')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'live' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Live Classes
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'documents' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('my-learning')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'my-learning' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-800'
          }`}
        >
          My Learning
        </button>
      </div>

      {activeTab === 'live' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Active Live Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLiveClasses.map(cls => (
              <div key={cls.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${cls.enrolled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <Play size={24} />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    cls.time === 'Live Now' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {cls.time}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{cls.title}</h3>
                <p className="text-sm text-black mb-2">By {cls.instructor}</p>
                <div className="flex items-center gap-4 text-xs text-black mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {cls.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {cls.time}</span>
                </div>
                {cls.enrolled && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{cls.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                )}
                {cls.enrolled ? (
                  <button 
                    onClick={() => alert('Joining live class...')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Join Now
                  </button>
                ) : (
                  <button 
                    onClick={() => handleJoinClass(cls.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Join Class
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Study Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-black">{doc.type}</span>
                    <p className="text-xs text-black">{doc.downloads} downloads</p>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-black">{doc.title}</h3>
                <p className="text-sm text-black mb-4">By {doc.author}</p>
                <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm">
                  View / Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-learning' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">My Learning Progress</h2>
          {enrolledClassesList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-black text-lg">No enrolled classes yet</p>
              <p className="text-black text-sm mt-2">Join a live class to start learning!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {enrolledClassesList.map(cls => (
                <div key={cls.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-2">{cls.title}</h3>
                      <p className="text-sm text-black">By {cls.instructor}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Enrolled
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">Progress</span>
                      <span>{cls.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>

                  {cls.rewards && cls.rewards.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="text-yellow-600" size={18} />
                        <span className="font-semibold text-sm">Rewards Earned</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cls.rewards.map((reward, idx) => (
                          <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleProgressUpdate(cls.id, cls.progress + 10)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Continue Learning
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Teacher Upload Form</h2>
              <button 
                onClick={() => setShowUploadForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {sections.map((section, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSection(idx)}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
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

              <form className="space-y-6">
                {currentSection === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Course Info</h3>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Description *</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Category *</label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select category</option>
                          <option value="Web Development">Web Development</option>
                          <option value="AI/ML">AI/ML</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Design">Design</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Level *</label>
                        <select
                          required
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Course Type</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Video', 'Live', 'Document', 'Mixed'].map(type => (
                        <label key={type} className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="courseType"
                            value={type}
                            checked={formData.courseType === type}
                            onChange={(e) => setFormData({ ...formData, courseType: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {currentSection === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Content Upload</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Videos</label>
                        <input type="file" multiple accept="video/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">PDFs</label>
                        <input type="file" multiple accept=".pdf" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Images</label>
                        <input type="file" multiple accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Links</label>
                        <input type="url" placeholder="https://example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Live Class Settings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Date *</label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Time *</label>
                        <input
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Language *</label>
                        <select
                          required
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                        </select>
                      </div>
                      <div className="flex items-center pt-8">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.subtitles}
                            onChange={(e) => setFormData({ ...formData, subtitles: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold">Enable Subtitles</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Curriculum Builder</h3>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Modules</label>
                      <textarea
                        placeholder="Enter module names (one per line)"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Lessons</label>
                      <textarea
                        placeholder="Enter lesson names (one per line)"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Assignments</label>
                      <textarea
                        placeholder="Enter assignment names (one per line)"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {currentSection === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Teacher Info</h3>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Bio *</label>
                      <textarea
                        required
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Expertise</label>
                      <input
                        type="text"
                        placeholder="Enter expertise areas (comma separated)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {currentSection === 6 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Pricing & Access</h3>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Pricing *</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pricing"
                            value="Free"
                            checked={formData.pricing === 'Free'}
                            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span>Free</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pricing"
                            value="Paid"
                            checked={formData.pricing === 'Paid'}
                            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span>Paid</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Access Duration</label>
                      <input
                        type="text"
                        placeholder="e.g., 30 days, Lifetime"
                        value={formData.accessDuration}
                        onChange={(e) => setFormData({ ...formData, accessDuration: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Privacy Settings</label>
                      <select
                        value={formData.privacySettings}
                        onChange={(e) => setFormData({ ...formData, privacySettings: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Unlisted">Unlisted</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentSection === 7 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Certification</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.enableCertificate}
                        onChange={(e) => setFormData({ ...formData, enableCertificate: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label className="font-semibold">Enable Certificate</label>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Requirements</label>
                      <textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        rows="4"
                        placeholder="Enter certificate requirements..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {currentSection === 8 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-black mb-4">Submit Review</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          required
                          checked={formData.adminApproval}
                          onChange={(e) => setFormData({ ...formData, adminApproval: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <label className="font-semibold">I understand this requires admin approval *</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          required
                          checked={formData.policyAgreement}
                          onChange={(e) => setFormData({ ...formData, policyAgreement: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <label className="font-semibold">I agree to the terms and policies *</label>
                      </div>
                    </div>
                  </div>
                )}

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
                          onClick={() => setShowUploadForm(false)}
                          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                        >
                          Submit for Review
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
            placeholder="Search for courses..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black">
          <Upload size={18}/> Share Content
        </button>
      </div>

      {/* Featured Live Class */}
      <div className="bg-purple-700 text-white p-8 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <span className="bg-purple-500 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">Live Now</span>
          <h2 className="text-3xl font-bold mb-2">Mastering Node.js Streams</h2>
          <p className="mb-6 opacity-90">Join expert developer John Doe for a live session with real-time AI subtitles.</p>
          <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
             <Play size={20} fill="currentColor" /> Join Live Class
          </button>
        </div>
        <div className="hidden md:block">
            {/* Abstract visual for class */}
            <div className="w-48 h-32 bg-purple-500 rounded-lg opacity-50"></div>
        </div>
      </div>

      {/* Course List */}
      <h3 className="text-xl font-bold mb-4">Recommended for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
               <div className={`p-2 rounded-lg ${course.type === 'Live Class' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                 {course.type === 'Live Class' ? <Play size={24}/> : <Book size={24}/>}
               </div>
               <span className="text-xs text-gray-400 font-semibold">{course.time}</span>
            </div>
            <h4 className="font-bold text-lg">{course.title}</h4>
            <p className="text-sm text-gray-500 mb-4">By {course.instructor}</p>
            <button className="w-full py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
    </div>
  );
};

<<<<<<< HEAD
export default SkillLearning;
=======
<<<<<<< HEAD
export default SkillLearning;
=======
<<<<<<< HEAD
export default SkillLearning;
=======
export default SkillLearning;
>>>>>>> 15bede01c7ffb65f0f85a5665d68bbebfb4c56e4
>>>>>>> 42b8c68a6b3e3ceb41f68f225e722ab4df25a304
>>>>>>> 41cbcef940efb197ef1c00de637fe545aa8e93ea
