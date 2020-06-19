export const login = (state, { token, user }) => {
  state.token = token;
  state.user = user;
};

export const logout = state => {
  state.token = null;
  state.user = null;
};
