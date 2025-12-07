import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const fetchUser = React.useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      setUser(response.data);
    } catch (error) {
      // Only logout if we had a token (token was invalid/expired)
      // If there's no token, this is expected and we should just continue
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired, clear it
        if (token) {
          console.log('Token invalid or expired, clearing...');
          logout();
        }
        // If no token, this is expected - user is simply not logged in
      } else {
        console.error('Error fetching user:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      // No token, user is not authenticated
      setUser(null);
      setLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser(response.data.user);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (name, username, phoneNumber, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        username,
        phoneNumber,
        email,
        password
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        userId,
        otp
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUser(response.data.user);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'OTP verification failed' 
      };
    }
  };

  const resendOTP = async (userId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/resend-otp', {
        userId
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to resend OTP' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    verifyOTP,
    resendOTP,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

