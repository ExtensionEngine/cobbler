export const login = (state, { token, email, role }) => {
  state.token = token;
  state.email = email;
  state.role = role;
};

export const logout = state => {
  state.token = null;
  state.email = null;
  state.role = null;
};
