import { useState, useEffect } from 'react';

type Norris = { value: string };

type InitialState = Norris;

interface UseNorris {
  norris: Norris;
  isLoading: boolean;
  error: string | null;
}

const useNorris = (initialState: InitialState): UseNorris => {
  const [norris, setNorris] = useState<InitialState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNorris = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await res.json();
        setNorris(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchNorris();
  }, []);

  return { norris, isLoading, error };
};

export default useNorris;
