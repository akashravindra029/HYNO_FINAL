import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    emergencyContact: ''
  });

  // Helper function to get user profiles from localStorage
  const getUserProfiles = () => {
    const profiles = localStorage.getItem('userProfiles');
    return profiles ? JSON.parse(profiles) : {};
  };

  // Helper function to save user profiles to localStorage
  const saveUserProfiles = (profiles) => {
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedAdmin = localStorage.getItem('isAdmin');

    if (savedUser && savedAuth === 'true') {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(savedAdmin === 'true');

      // Load user-specific profile
      const profiles = getUserProfiles();
      const userProfileData = profiles[parsedUser.email] || {
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        medicalHistory: '',
        emergencyContact: ''
      };
      setUserProfile(userProfileData);
    }
  }, []);

  const login = async (email, password, name) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in real app, this would call an API
        if (email && password) {
          const profiles = getUserProfiles();
          const existingProfile = profiles[email];

          const mockUser = {
            id: 1,
            name: name || existingProfile?.name || 'John Doe',
            email: email,
            role: email.includes('admin') ? 'admin' : 'user'
          };

          setUser(mockUser);
          setIsAuthenticated(true);
          setIsAdmin(mockUser.role === 'admin');

          // Load or create user-specific profile
          const userProfileData = existingProfile || {
            name: name || mockUser.name,
            email: email,
            phone: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            medicalHistory: '',
            emergencyContact: ''
          };
          setUserProfile(userProfileData);

          // Save to localStorage
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', mockUser.role === 'admin' ? 'true' : 'false');

          // Save user-specific profile
          profiles[email] = userProfileData;
          saveUserProfiles(profiles);

          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const adminLogin = async (email, password) => {
    // Simulate admin API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && email.includes('admin')) {
          const profiles = getUserProfiles();
          const existingProfile = profiles[email];

          const mockAdmin = {
            id: 1,
            name: existingProfile?.name || 'Admin User',
            email: email,
            role: 'admin'
          };

          setUser(mockAdmin);
          setIsAuthenticated(true);
          setIsAdmin(true);

          // Load or create user-specific profile
          const userProfileData = existingProfile || {
            name: mockAdmin.name,
            email: email,
            phone: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            medicalHistory: '',
            emergencyContact: ''
          };
          setUserProfile(userProfileData);

          localStorage.setItem('user', JSON.stringify(mockAdmin));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', 'true');

          // Save user-specific profile
          profiles[email] = userProfileData;
          saveUserProfiles(profiles);

          resolve(mockAdmin);
        } else {
          reject(new Error('Invalid admin credentials'));
        }
      }, 1000);
    });
  };

  const socialLogin = async (provider) => {
    // Simulate social login
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = `user@${provider.toLowerCase()}.com`;
        const profiles = getUserProfiles();
        const existingProfile = profiles[email];

        const mockUser = {
          id: Date.now(),
          name: existingProfile?.name || `${provider} User`,
          email: email,
          role: 'user'
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        setIsAdmin(false);

        // Load or create user-specific profile
        const userProfileData = existingProfile || {
          name: mockUser.name,
          email: email,
          phone: '',
          address: '',
          dateOfBirth: '',
          gender: '',
          medicalHistory: '',
          emergencyContact: ''
        };
        setUserProfile(userProfileData);

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'false');

        // Save user-specific profile
        profiles[email] = userProfileData;
        saveUserProfiles(profiles);

        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  };

  const signup = async (userData) => {
    // Simulate signup API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user'
          };

          setUser(newUser);
          setIsAuthenticated(true);
          setIsAdmin(false);

          // Create user-specific profile
          const userProfileData = {
            name: userData.name,
            email: userData.email,
            phone: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            medicalHistory: '',
            emergencyContact: ''
          };
          setUserProfile(userProfileData);

          localStorage.setItem('user', JSON.stringify(newUser));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', 'false');

          // Save user-specific profile
          const profiles = getUserProfiles();
          profiles[userData.email] = userProfileData;
          saveUserProfiles(profiles);

          resolve(newUser);
        } else {
          reject(new Error('Invalid signup data'));
        }
      }, 1000);
    });
  };

  const forgotPassword = async (email) => {
    // Simulate forgot password API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email) {
          // In a real app, this would send a reset email
          console.log(`Password reset email sent to ${email}`);
          resolve({ message: 'Password reset email sent successfully' });
        } else {
          reject(new Error('Email is required'));
        }
      }, 1000);
    });
  };

  const updateProfile = (profileData) => {
    const updatedProfile = { ...userProfile, ...profileData };
    setUserProfile(updatedProfile);

    // Save to user-specific profile
    const profiles = getUserProfiles();
    profiles[user.email] = updatedProfile;
    saveUserProfiles(profiles);
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    userProfile,
    login,
    adminLogin,
    socialLogin,
    logout,
    signup,
    forgotPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
