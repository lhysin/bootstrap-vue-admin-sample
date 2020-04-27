import Vue from 'vue';
import vuex from '@/store';
import axios from 'axios';
import nProgress from '@/plugins/nprogress';
import $globalConsts from '@/plugins/global-constants';
import $router from '@/router';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let config = {
  baseURL: $globalConsts.VUE_APP_ADMIN_HOST || $globalConsts.VUE_APP_ADMIN_HOST || '',
  timeout: 300 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: {
    common: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {

    nProgress.start();

    if (vuex.getters['storeToken/hasAccessToken']) {
      config.headers.common['Authorization'] = 'Bearer ' + vuex.getters['storeToken/getAccessToken'];
    }

    // Do something before request is sent
    return config;
  },

  function (error) {

    nProgress.done();

    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {

    nProgress.done();

    // Do something with response data
    return response;
  },
  function (error) {

    nProgress.done();

    // https://gist.github.com/edmondburnett/38ed3451de659dc43fa3f24befc0073b

    if (error.config && error.config.url && !error.config.notRetry) {
      const config = error.config;

      const isTokenUrl = config.url.indexOf('/oauth/token') > -1;

      // http status 400 => Invalid refresh token
      // http status 401 => Invalid refresh token (expired) or Invalid access token
      // http status 401 => expire access token
      if (error.response && error.response.status === 401 && !isTokenUrl) {

        return vuex.dispatch('storeUser/refreshToken').then(() => {
          config.headers['Authorization'] = 'Bearer ' + vuex.getters['storeToken/getAccessToken'];

          return axios.request(config);
        }).catch(err => {
          if (!!err && !!err.response &&
            (err.response.status === 400 || err.response.status === 401)) {
            vuex.dispatch('storeUser/initTokenAndLoginUser');
            alert($globalConsts.INVALID_TOKEN_MSG);
            $router.push({ path: '/login' }).catch(error => {
              // forced routing
              if (error.name !== 'NavigationDuplicated') {
                return Promise.reject(error);
              }
            });
          }

          return Promise.reject(err);
        });
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }

  },
);

const AxiosPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $axios: {
        get () {
          return _axios;
        },
      },
    });
  },
};

Vue.use(AxiosPlugin);

export default _axios;
