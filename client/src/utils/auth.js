// Simple auth utility to manage current user
// In a real app, this would use proper authentication context

export const getCurrentUserId = () => {
  // Try to get from localStorage (set after login)
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.id || user._id;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
  }
  
  // For development: return a default user ID if available
  const defaultUserId = localStorage.getItem('defaultUserId');
  if (defaultUserId) {
    return defaultUserId;
  }
  
  // If no user found, return null (should redirect to login)
  return null;
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
    }
  }
  return null;
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  if (user.id || user._id) {
    localStorage.setItem('defaultUserId', user.id || user._id);
  }
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('defaultUserId');
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken() && !!getCurrentUser();
};

