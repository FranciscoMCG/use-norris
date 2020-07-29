import { useEffect, useReducer } from 'react';

interface InitialState {
  response: any;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

enum ActionType {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
  NOT_FOUND = 'NOT_FOUND',
}

const { FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS, NOT_FOUND } = ActionType;

type ResourceAction =
  | { type: ActionType.FETCH_SUCCESS; payload: string }
  | {
      type: ActionType.FETCH_FAILURE;
      payload: { isError: boolean; errorMessage: string | null };
    }
  | { type: ActionType.FETCH_INIT }
  | { type: ActionType.NOT_FOUND; payload: string };

const initialState = {
  response: '',
  errorMessage: null,
  isLoading: false,
  isError: false,
};

const useNorrisReducer = (
  state: InitialState = initialState,
  action: ResourceAction
) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        response: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMessage,
      };
    case NOT_FOUND:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
};

const useNorris = (initialState: InitialState) => {
  const [state, dispatch] = useReducer(useNorrisReducer, initialState);
  const { response, errorMessage, isError, isLoading } = state;

  useEffect(() => {
    const fetchNorris = async () => {
      dispatch({ type: FETCH_INIT });
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await res.json();

        if (json.error) {
          dispatch({ type: NOT_FOUND, payload: json.error });
        }
        if (json.value) {
          dispatch({ type: FETCH_SUCCESS, payload: json });
        }
      } catch (error) {
        dispatch({
          type: FETCH_FAILURE,
          payload: { isError: true, errorMessage: error },
        });
      }
    };
    fetchNorris();
  }, []);

  return { response, errorMessage, isLoading, isError };
};

export default useNorris;
