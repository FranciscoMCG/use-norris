import * as React from 'react';

import useNorris from '../../src';

const App = () => {
  const initialState = {
    value: '',
  };
  const { norris, error } = useNorris(initialState);

  if (error) {
    console.log(error);
  }

  if (norris) {
    return <p>{norris && norris.value}</p>;
  }

  return <p>Something went wrong</p>;
};

export default App;
