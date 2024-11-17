// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({ user: null, setUser: () => {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Assuming user data is { firstName, lastName, email }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/current_user');
        if (response.ok) {
          const userData = await response.json();
          console.log('User data fetched:', userData); // Debugging
          setUser(userData);
        } else {
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
