import { useState, useEffect } from 'react';

interface InitialState {
  value: string;
}

const useNorris = (initialState: InitialState) => {
  const [norris, setNorris] = useState<InitialState>(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNorris = async () => {
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await res.json();
        setNorris(json);
      } catch (error) {
        setError(error);
      }
    };
    fetchNorris();
  }, []);

  return { norris, error };
};

export default useNorris;
