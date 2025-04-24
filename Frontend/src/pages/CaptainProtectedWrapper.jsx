import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false); // Allow access
        } else {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      })
      .catch((error) => {
        // console.error("Error verifying captain token:", error.response?.data || error.message);
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional: show a spinner or full-page loader
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
