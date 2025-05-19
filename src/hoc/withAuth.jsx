// src/hocs/withAuth.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem('authToken'); // Or however you store your token

    useEffect(() => {
      if (!authToken) {
        // Redirect to the login page if no token is found
        navigate('/login');
      }
      // In a more advanced setup, you might want to verify the token
      // with the backend here to ensure it's still valid.
    }, [authToken, navigate]);

    // If the token exists, render the wrapped component
    return authToken ? <WrappedComponent {...props} /> : null;
  };

  // Set a display name for easier debugging in React DevTools
  AuthWrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthWrapper;
};

export default withAuth;