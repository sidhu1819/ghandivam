const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, Project, Notification } = require('./models');

const app = express();
app.use(express.json()); 
app.use(cors());

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ghandivam';

console.log('🔌 Attempting to connect to MongoDB...');
console.log(`📍 Connection URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('✅ MongoDB Connected successfully');
    console.log(`📊 Database Name: ${mongoose.connection.name}`);
    console.log(`🌐 Database Host: ${mongoose.connection.host}`);
    console.log(`🔢 Database Port: ${mongoose.connection.port}`);
    console.log(`📦 Database State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('💡 Make sure MongoDB is running on your system');
    console.error('💡 Default connection: mongodb://127.0.0.1:27017/ghandivam');
    console.error('💡 You can set MONGO_URI in .env file or environment variables');
    console.error('⚠️  Server will continue but database features will not work');
    console.error('⚠️  To install MongoDB: https://www.mongodb.com/try/download/community');
    console.error('⚠️  Or start MongoDB service: net start MongoDB (Windows)');
  });

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory storage for OTPs (for development/demo purposes)
const otpStorage = {};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

app.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    message: 'Ghandivam Backend is Running!',
    database: {
      state: states[dbState] || 'unknown',
      connected: dbState === 1,
      name: mongoose.connection.name || 'none',
      host: mongoose.connection.host || 'none',
      port: mongoose.connection.port || 'none'
    },
    timestamp: new Date().toISOString(),
    routes: {
      auth: ['/api/auth/register', '/api/auth/login', '/api/auth/verify-otp', '/api/auth/me'],
      projects: ['/api/projects', '/api/projects/:id', '/api/projects/:id/join'],
      users: ['/api/users', '/api/users/:id', '/api/users/:id/connect'],
      health: '/api/health'
    }
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const dbName = mongoose.connection.name;
    
    if (dbStatus === 1) {
      const projectCount = await Project.countDocuments();
      const userCount = await User.countDocuments();
      
      res.json({
        status: 'healthy',
        database: {
          connected: true,
          name: dbName,
          state: 'connected'
        },
        collections: {
          projects: projectCount,
          users: userCount
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'unhealthy',
        database: {
          connected: false,
          state: 'disconnected'
        },
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const projectData = {
      ...req.body,
      teamLeader: userId,
      status: req.body.status || 'Open',
      description: req.body.detailedDescription || req.body.shortDescription || req.body.description,
      members: req.body.members || [userId],
      progress: req.body.progress || 0,
      completedTasks: req.body.completedTasks || 0,
      totalTasks: req.body.totalTasks || 15,
      completedMilestones: req.body.completedMilestones || 0,
      totalMilestones: req.body.totalMilestones || 5
    };
    
    const newProject = new Project(projectData);
    await newProject.save();
    
    // Add project to user's createdProjects
    await User.findByIdAndUpdate(userId, {
      $push: { createdProjects: newProject._id }
    });
    
    const populatedProject = await Project.findById(newProject._id)
      .populate('teamLeader', 'username')
      .populate('members', 'username');
    
    res.status(201).json(populatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects (for public/join projects page)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('teamLeader', 'username').populate('members', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user-specific projects (for user's own projects)
app.get('/api/projects/my-projects', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({
      $or: [
        { teamLeader: userId },
        { members: userId }
      ]
    }).populate('teamLeader', 'username').populate('members', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's ongoing projects
app.get('/api/projects/my-ongoing', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({
      status: 'Active',
      $or: [
        { teamLeader: userId },
        { members: userId }
      ]
    }).populate('teamLeader', 'username').populate('members', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('teamLeader', 'username').populate('members', 'username');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const isMember = project.members.some(member => 
      member.toString() === userId || member._id?.toString() === userId
    );
    
    if (isMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    const user = await User.findById(userId);
    project.members.push(userId);
    
    if (project.status === 'Open') {
      project.status = 'Active';
    }
    
    await project.save();
    
    // Create notification for project team leader
    if (project.teamLeader) {
      const notification = new Notification({
        userId: project.teamLeader,
        type: 'project_joined',
        message: `${user.name || user.username} joined your project "${project.title}"`,
        from: userId,
        projectId: project._id,
        read: false
      });
      await notification.save();
    }
    
    const populatedProject = await Project.findById(project._id)
      .populate('teamLeader', 'username')
      .populate('members', 'username');
    
    res.json({ message: 'Successfully joined project', project: populatedProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const populatedProject = await Project.findById(project._id)
      .populate('teamLeader', 'username')
      .populate('members', 'username');
    
    res.json(populatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, username, phoneNumber, email, password } = req.body;

    if (!name || !username || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }, { phoneNumber }] 
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return res.status(400).json({ error: 'Phone number already registered' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      name,
      username,
      phoneNumber,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false
    });

    await newUser.save();

    console.log(`✅ OTP for ${phoneNumber}: ${otp}`);
    
    // Store OTP temporarily for demo/development (expires in 10 minutes)
    otpStorage[newUser._id.toString()] = {
      otp,
      timestamp: Date.now(),
      expiresIn: 10 * 60 * 1000
    };

    res.json({ 
      message: 'OTP sent to your phone number',
      userId: newUser._id,
      phoneNumber: phoneNumber.replace(/\d(?=\d{4})/g, '*'),
      otp: otp // Return OTP for demo purposes (remove in production)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ error: 'User ID and OTP are required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'User already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ error: 'OTP expired. Please request a new one' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Account verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'User already verified' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log(`✅ Resent OTP for ${user.phoneNumber}: ${otp}`);
    
    // Store OTP temporarily for demo/development
    otpStorage[userId] = {
      otp,
      timestamp: Date.now(),
      expiresIn: 10 * 60 * 1000
    };

    res.json({ 
      message: 'OTP resent to your phone number',
      phoneNumber: user.phoneNumber.replace(/\d(?=\d{4})/g, '*'),
      otp: otp // Return OTP for demo purposes (remove in production)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ 
      $or: [{ username }, { email: username }, { phoneNumber: username }] 
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ 
        error: 'Account not verified. Please verify your phone number first',
        userId: user._id,
        needsVerification: true
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        trustPoints: user.trustPoints,
        skills: user.skills
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -otp');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -otp -otpExpires')
      .populate('connections', 'name username trustPoints skills')
      .populate('createdProjects', 'title status');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/:id/connect', authenticateToken, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.userId;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ error: 'Cannot connect to yourself' });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingRequest = targetUser.connectionRequests.find(
      req => req.from.toString() === currentUserId && req.status === 'pending'
    );

    if (existingRequest) {
      return res.status(400).json({ error: 'Connection request already sent' });
    }

    const alreadyConnected = currentUser.connections.some(
      conn => conn.toString() === targetUserId
    );

    if (alreadyConnected) {
      return res.status(400).json({ error: 'Already connected to this user' });
    }

    targetUser.connectionRequests.push({
      from: currentUserId,
      status: 'pending'
    });

    await targetUser.save();

    // Create notification for the target user
    const notification = new Notification({
      userId: targetUserId,
      type: 'connection_request',
      message: `${currentUser.name || currentUser.username} wants to connect with you`,
      from: currentUserId,
      read: false
    });
    await notification.save();

    res.json({ message: 'Connection request sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/:id/accept-connection', authenticateToken, async (req, res) => {
  try {
    const requestId = req.body.requestId;
    const currentUserId = req.user.userId;

    const currentUser = await User.findById(currentUserId);
    const request = currentUser.connectionRequests.id(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Connection request not found' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ error: 'Request already processed' });
    }

    request.status = 'accepted';
    currentUser.connections.push(request.from);
    await currentUser.save();

    const requester = await User.findById(request.from);
    requester.connections.push(currentUserId);
    await requester.save();

    res.json({ message: 'Connection request accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users/:id/reject-connection', authenticateToken, async (req, res) => {
  try {
    const requestId = req.body.requestId;
    const currentUserId = req.user.userId;

    const currentUser = await User.findById(currentUserId);
    const request = currentUser.connectionRequests.id(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Connection request not found' });
    }

    request.status = 'rejected';
    await currentUser.save();

    res.json({ message: 'Connection request rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -otp -otpExpires')
      .limit(50);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rate-user', async (req, res) => {
  const { userId, points } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId, 
      { $inc: { trustPoints: points } }, 
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Forgot Password - Request Reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email, phoneNumber, username } = req.body;
    
    if (!email && !phoneNumber && !username) {
      return res.status(400).json({ error: 'Email, phone number, or username is required' });
    }

    const user = await User.findOne({
      $or: [
        { email },
        { phoneNumber },
        { username }
      ]
    });

    if (!user) {
      // Don't reveal if user exists for security
      return res.json({ 
        message: 'If an account exists with that information, a password reset OTP has been sent.' 
      });
    }

    // Generate reset OTP
    const resetOTP = generateOTP();
    const resetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    user.resetPasswordToken = resetOTP;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    console.log(`✅ Password Reset OTP for ${user.phoneNumber || user.email}: ${resetOTP}`);
    
    res.json({ 
      message: 'Password reset OTP sent',
      userId: user._id,
      phoneNumber: user.phoneNumber ? user.phoneNumber.replace(/\d(?=\d{4})/g, '*') : undefined,
      email: user.email ? user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : undefined,
      otp: resetOTP // Return OTP for demo purposes (remove in production)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset Password with OTP
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({ error: 'User ID, OTP, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.resetPasswordToken || user.resetPasswordToken !== otp) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    if (new Date() > user.resetPasswordExpires) {
      return res.status(400).json({ error: 'Reset token has expired. Please request a new one.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notification endpoints
app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId })
      .populate('from', 'name username')
      .populate('projectId', 'title')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/notifications/mark-all-read', authenticateToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.userId, read: false },
      { read: true }
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed sample projects endpoint
app.post('/api/projects/seed-sample', async (req, res) => {
  try {
    const sampleProjects = [
      {
        title: 'AI-Powered E-Learning Platform',
        description: 'Building an intelligent learning management system with AI tutors and personalized learning paths. Looking for full-stack developers and AI/ML engineers.',
        shortDescription: 'AI-powered learning platform',
        requiredSkills: ['React', 'Node.js', 'Python', 'AI/ML', 'MongoDB'],
        status: 'Open',
        membersNeeded: 5,
        skillLevel: 'Intermediate',
        type: 'Team',
        visibility: 'Public'
      },
      {
        title: 'Blockchain Voting System',
        description: 'Developing a secure, transparent voting system using blockchain technology. Need blockchain developers and security experts.',
        shortDescription: 'Secure blockchain voting system',
        requiredSkills: ['Blockchain', 'Solidity', 'Web3', 'Security'],
        status: 'Open',
        membersNeeded: 4,
        skillLevel: 'Advanced',
        type: 'Team',
        visibility: 'Public'
      },
      {
        title: 'Mobile Health Tracking App',
        description: 'Creating a comprehensive health and fitness tracking mobile application with real-time analytics and AI recommendations.',
        shortDescription: 'Health tracking mobile app',
        requiredSkills: ['React Native', 'Firebase', 'Node.js', 'UI/UX Design'],
        status: 'Open',
        membersNeeded: 6,
        skillLevel: 'Beginner',
        type: 'Team',
        visibility: 'Public'
      },
      {
        title: 'Smart Home IoT Dashboard',
        description: 'Building a unified dashboard to control and monitor all smart home devices. Integration with various IoT protocols required.',
        shortDescription: 'IoT smart home dashboard',
        requiredSkills: ['IoT', 'React', 'Python', 'MQTT', 'Raspberry Pi'],
        status: 'Open',
        membersNeeded: 3,
        skillLevel: 'Intermediate',
        type: 'Team',
        visibility: 'Public'
      },
      {
        title: 'Social Media Analytics Tool',
        description: 'Developing an analytics platform for social media managers to track engagement, sentiment, and growth metrics across platforms.',
        shortDescription: 'Social media analytics platform',
        requiredSkills: ['Python', 'Data Analytics', 'API Integration', 'React', 'Chart.js'],
        status: 'Open',
        membersNeeded: 4,
        skillLevel: 'Intermediate',
        type: 'Team',
        visibility: 'Public'
      }
    ];

    const createdProjects = [];
    for (const projectData of sampleProjects) {
      const existingProject = await Project.findOne({ title: projectData.title });
      if (!existingProject) {
        const project = new Project(projectData);
        await project.save();
        createdProjects.push(project);
      }
    }

    res.json({ 
      message: `Created ${createdProjects.length} sample projects`,
      projects: createdProjects 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});