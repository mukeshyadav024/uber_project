import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        // Optional: log the error
        // console.error("Logout failed:", error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    };

    logout();
  }, [token, navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default CaptainLogout;
