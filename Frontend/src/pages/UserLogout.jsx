import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
  
    logout();
  }, [navigate]);
  

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;
