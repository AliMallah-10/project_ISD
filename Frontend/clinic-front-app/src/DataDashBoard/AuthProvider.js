// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

// Define the initial state and reducer for managing authentication
const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null, // You can store user information here
};

const authReducer = (state, action) => {
  switch (action.type) {
    // Handle authentication actions (e.g., login, logout)
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Token Refreshing Code
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("/refresh-token-endpoint", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the token in local storage
        localStorage.setItem("token", data.newToken);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };

  // Automatic Logout on Inactivity Code
  const startInactivityTimer = () => {
    const inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds

    const logout = () => {
      // Log the user out and clear the token
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, inactivityTimeout);
    };

    // Set up initial timer
    let logoutTimer = setTimeout(logout, inactivityTimeout);

    // Attach event listeners to reset the timer on user activity
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
  };

  useEffect(() => {
    startInactivityTimer();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
