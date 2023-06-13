// auth.js

let isAuthenticated = false;
let userRole = '';

export function login(username, password) {
  // Simulate an API call to authenticate the user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        isAuthenticated = true;
        userRole = 'admin';
        resolve();
      } else if (username === 'sales' && password === 'sales') {
        isAuthenticated = true;
        userRole = 'sales';
        resolve();
      } else if (username === 'purchase' && password === 'purchase') {
        isAuthenticated = true;
        userRole = 'purchase';
        resolve();
      } else if (username === 'inventory' && password === 'inventory') {
        isAuthenticated = true;
        userRole = 'inventory';
        resolve();
      } else if (username === 'accounts' && password === 'accounts') {
        isAuthenticated = true;
        userRole = 'accounts';
        resolve();
      } else {
        isAuthenticated = false;
        userRole = '';
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

export function logout() {
  // Simulate logging out the user
  isAuthenticated = false;
  userRole = '';
}

export function getAuthStatus() {
  return isAuthenticated;
}

export function getUserRole() {
  return userRole;
}
