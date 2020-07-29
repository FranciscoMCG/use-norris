import { renderHook } from '@testing-library/react-hooks';

import useNorris from '../';

const mockedResponse = {
  value: 'this is a very good joke',
};

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedResponse),
  })
);
describe('useNorris', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should resolve', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNorris({ value: '' })
    );
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalled();
    expect(result.current).toEqual({
      error: null,
      isLoading: false,
      norris: mockedResponse,
    });
  });

  it('should return an error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('There is an error')
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useNorris({ value: '' })
    );
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalled();
    expect(result.current).toEqual({
      error: 'There is an error',
      isLoading: true,
      norris: { value: '' },
    });
  });
});
