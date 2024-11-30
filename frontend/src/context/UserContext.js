// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ user: null, setUser: () => {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/current_user');
        if (response.ok) {
          const userData = await response.json();
          console.log('User data fetched:', userData); // Debugging
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
        } else {
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser)); // Save to localStorage
    } else {
      localStorage.removeItem('user'); // Clear localStorage on logout
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};