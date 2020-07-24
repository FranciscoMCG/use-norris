import * as React from 'react';

import useNorris from '../../src';

const App = () => {
  const initialState = {
    value: '',
  };
  const { norris, isLoading, error } = useNorris(initialState);

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (norris) {
    return <p>{norris && norris.value}</p>;
  }

  return <p>Something went wrong</p>;
};

export default App;
