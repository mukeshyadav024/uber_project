import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return; // prevent further execution
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user); // ✅ changed from `captain` to `user`
          setIsLoading(false); // stop loader
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error("User auth error:", error.response?.data || error.message);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]); // ✅ safe dependency

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
