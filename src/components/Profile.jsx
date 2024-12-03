import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://dashmeafrica-backend.vercel.app/api/userProfile/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className='text-center p-5 m-5'>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <p><strong>Full name</strong> {user.fullName}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
