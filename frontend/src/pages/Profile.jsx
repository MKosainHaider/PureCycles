import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  background-color: #f3f4f6; /* Tailwind gray-100 */
  min-height: 100vh;
`;

const ProfileCard = styled.div`
  background-color: white; /* Tailwind white */
  border-radius: 0.5rem; /* Tailwind rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Tailwind shadow-md */
  padding: 2rem; /* Tailwind p-8 */
  max-width: 400px;
  margin: 2rem auto; /* Centering the card */
`;

const ProfilePage = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/profile', {
          withCredentials: true,
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('http://localhost:8000/api/users/profile', user, {
        withCredentials: true,
      });
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <NavBar />
      <ProfileCard>
        <h2 className="mb-6 text-2xl font-bold text-center">Profile</h2>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && <p className="mt-4 text-center text-green-500">{success}</p>}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="w-full p-3 mt-4 text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-600"
        >
          Back to Home
        </button>
      </ProfileCard>
      <Footer />
    </ProfileContainer>
  );
};

export default ProfilePage;
