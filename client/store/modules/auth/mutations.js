export const login = (state, token) => {
  state.token = token;
};

export const logout = state => {
  state.token = null;
};
