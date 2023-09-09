export function isLoggedIn() {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token'); 
  // Return true if the token exists, false if it's not present
  return !!token;
}

export function logoutUser() {
  // Clear user authentication data from localStorage or sessionStorage
  localStorage.removeItem('token');
}