# use-norris

![Chuck Norris](./src/images/chuck-norris.png)

useNorris is a [React](http://reactjs.org/) custom Hook that fetches random jokes about our hero Chuck Norris.

It has been built with [TypeScript](www.typescriptlang.org/), [TSDX](https://github.com/formium/tsdx) and is the support for a training provided by the author.

### NPM

The package is hosted in the NPM registry and can be found [here](https://www.npmjs.com/package/@franciscomcg/use-norris).

### Install

```bash
npm i @franciscomcg/use-norris
```

or

```bash
yarn add @franciscomcg/use-norris
```

### Usage

```typescript
import * as React from 'react';

import useNorris from '@franciscomcg/use-norris';

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
```

### License

MIT © [FranciscoMCG](https://github.com/FranciscoMCG)
