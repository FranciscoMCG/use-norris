import { renderHook } from '@testing-library/react-hooks';

import useNorris from '../';

const mockedValue = {
  value: 'this is a very good joke',
};

const initialState = {
  response: { value: '' },
  isLoading: false,
  errorMessage: '',
  isError: false,
};

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedValue),
  })
);

describe('useNorris', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should resolve', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useNorris(initialState)
    );
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalled();
    expect(result.current).toEqual({
      response: mockedValue,
      errorMessage: '',
      isLoading: false,
      isError: false,
    });
  });

  it('should return an error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('There is an error')
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useNorris({
        response: { value: '' },
        isLoading: false,
        errorMessage: '',
        isError: false,
      })
    );
    await waitForNextUpdate();
    expect(fetch).toHaveBeenCalled();
    expect(result.current).toEqual({
      errorMessage: 'There is an error',
      isLoading: false,
      response: { value: '' },
      isError: true,
    });
  });
});
