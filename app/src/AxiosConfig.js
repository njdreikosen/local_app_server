import axios from 'axios';

const axiosInterceptor = axios.interceptors.request.use(function (config) {
    console.log("baseURL: " + config.baseURL);
    console.log("URL: " + config.url);
    if (config.url !== '/login') {
      //const token = JSON.parse(sessionStorage.getItem('token'))['token'];
      config.headers.Authorization = 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))['token'];
    }
    config.baseURL = 'http://192.168.1.100:4000';
    return config;
  }, function (err) {
    console.log("interceptorErr: " + err);
    return Promise.reject(err);
});

export default axiosInterceptor;
