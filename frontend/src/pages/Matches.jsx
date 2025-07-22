import { useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { UserContext } from '../context/UserContext';

const Matches = () => {
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get('/users/matches', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map(m => (
          <li key={m._id}>{m.name} - {m.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
