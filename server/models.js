const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  trustPoints: { type: Number, default: 100 }, 
  skills: [String],
  createdProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  connectionRequests: [{ 
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: String,
  detailedDescription: String,
  description: String,
  category: String,
  type: { type: String, enum: ['Individual', 'Team'], default: 'Team' },
  requiredSkills: [String],
  skillLevel: String,
  membersNeeded: Number,
  roles: [String],
  experienceLevel: String,
  startDate: Date,
  endDate: Date,
  milestones: [String],
  communicationType: String,
  realTimeSubtitles: { type: Boolean, default: true },
  virtualRooms: { type: Boolean, default: true },
  visibility: { type: String, enum: ['Public', 'Private'], default: 'Public' },
  joinRequestApprovals: { type: Boolean, default: true },
  aiBotAssistance: { type: Boolean, default: true },
  links: [String],
  peerFeedback: { type: Boolean, default: true },
  customCriteria: String,
  trustPoints: { type: Boolean, default: true },
  status: { type: String, enum: ['Open', 'Active', 'Completed'], default: 'Open' }, 
  teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completedTasks: { type: Number, default: 0 },
  totalTasks: { type: Number, default: 0 },
  completedMilestones: { type: Number, default: 0 },
  totalMilestones: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['connection_request', 'project_joined', 'project_invite'], required: true },
  message: { type: String, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { User, Project, Notification };