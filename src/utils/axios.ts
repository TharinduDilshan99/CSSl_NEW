// import axios from 'axios';

// const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/' });

// // ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 && !window.location.href.includes('/login')) {
//       window.location.pathname = '/login';
//     }
//     return Promise.reject((error.response && error.response.data) || 'Wrong Services');
//   }
// );

// export default axiosServices;







import axios from 'axios';

const axiosServices_Mock = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/', headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/', headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices_Mock.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

// ==============================|| AXIOS - FOR ACTUAL SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export { axiosServices, axiosServices_Mock };

export default axiosServices_Mock
