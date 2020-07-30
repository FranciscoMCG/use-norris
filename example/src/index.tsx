import * as React from 'react';

import useNorris from '../../src';

const App = () => {
  const initialState = {
    response: '',
    isLoading: false,
    isError: false,
    errorMessage: null,
  };
  const { response, isLoading, isError, errorMessage } = useNorris(
    initialState
  );

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (response) {
    return <p>{response.value}</p>;
  }
  return <p>Something went wrong</p>;
};

export default App;
