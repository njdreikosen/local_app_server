import axios from 'axios';

const axiosInterceptor = axios.interceptors.request.use(
  function (config) {
    // If the user is just logging in, the token is still undefined
    if (config.url !== '/login' && config.url !== '/signup') {
      config.headers.Authorization = 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))['token'];
    }
    // Add the server address as the base URL
    config.baseURL = 'http://192.168.1.100:4000';
    return config;
  }, function (err) {
    console.log("interceptorErr: " + err);
    return Promise.reject(err);
});

export default axiosInterceptor;
