import { renderHook, act } from '@testing-library/react-hooks';

import useNorris from '../';

describe('useNorris', () => {
  it('fetches Chuck Norris joke', async () => {
    global.fetch = jest.fn();

    await act(() => {
      renderHook(() => useNorris({ value: 'this is a very good joke' }));
    });

    expect(global.fetch).toBeCalledWith(
      'https://api.chucknorris.io/jokes/random'
    );
    expect(global.fetch).toBeCalledTimes(1);
  });
});
