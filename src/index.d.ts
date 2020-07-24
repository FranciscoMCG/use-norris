interface InitialState {
  value: string;
}
declare const useNorris: (
  initialState: InitialState
) => {
  norris: InitialState;
  isLoading: boolean;
  error: string | null;
};
export default useNorris;
