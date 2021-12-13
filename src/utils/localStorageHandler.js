  // return the token from the local storage
  export const getToken = () => {
    return localStorage.getItem('access_token') || null;
  }
  
  // remove the token and user from the local storage
  export const removeToken = () => {
    localStorage.removeItem('access_token');
  }
  
  // set the token from the local storage
  export const setToken = (token) => {
    localStorage.setItem('access_token', token);
  }