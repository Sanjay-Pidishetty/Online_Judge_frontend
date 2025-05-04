import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Problem {
  id: string;
  title: string;
  description: string;
  language: string;
  input: string;
  output: string;
  difficulty: string;
  constraints: string;
  timeLimit: number;
}

const WelcomePage: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {token} = useAuth();

  useEffect(() => {
    if (!token) {
      setError('User is not authenticated. Please log in.');
      setLoading(false);
      return;
    }
    // Fetch the problems from the API
    axios
      .get<Problem[]>('http://localhost:8080/problem/getAll',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProblems(response.data);  // Set problems data
        setLoading(false);  // Set loading to false
      })
      .catch((err) => {
        setError('Failed to fetch problems');
        console.log(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Problem List</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <h3>{problem.title}</h3>
            <p>{problem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelcomePage;
