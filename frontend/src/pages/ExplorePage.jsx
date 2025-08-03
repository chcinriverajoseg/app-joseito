// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { fetchExploreProfiles } from '@/api/user';
import UserCard from '@/components/ui/UserCard';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';

const ExplorePage = () => {
  const { user } = useUser();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await fetchExploreProfiles(user.token);
        setProfiles(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Error al cargar perfiles.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProfiles();
    }
  }, [user?.token]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {profiles.map((profile) => (
        <UserCard key={profile._id} user={profile} />
      ))}
    </div>
  );
};

export default ExplorePage;
