export const login = (state, { token, email }) => {
  state.token = token;
  state.email = email;
};

export const logout = state => {
  state.token = null;
  state.email = null;
};
