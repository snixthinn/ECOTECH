const authState = {
  user: {
    name: "Eco Hero",
    email: "hero@ecotech.app",
  },
  isAuthenticated: true,
};

export function getAuthState() {
  return authState;
}

export function login(name, email) {
  authState.user = { name, email };
  authState.isAuthenticated = true;
}

export function logout() {
  authState.isAuthenticated = false;
}
