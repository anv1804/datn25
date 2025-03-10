export const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // or use cookies
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem('token'); // or use cookies
}; 