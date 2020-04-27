import Vue from 'vue';
import VueRouter from 'vue-router';
import vuex from '@/store';
import VueMeta from 'vue-meta';
import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';

import nProgress from '@/plugins/nprogress';

import flattenDeep from 'lodash/flattenDeep';

// vuejs deploy with amazon s3
// error-page redirect
// https://stackoverflow.com/questions/43095823/vue-js-router-history-mode-and-aws-s3-routingrules

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

// babel-wildcard lazyloading error
// import * as routers from './modules';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('@/router/modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const routers = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;

  return modules;
}, {});

Vue.use(VueRouter);

const childrenRouters = [];
Object.keys(routers).forEach(key => {
  childrenRouters.push(routers[key].filter(route => {
    if ($globalConsts.isPrd && route.meta.notPrd) {
      return false;
    } else {
      return true;
    }
  }));
});

const routes = [

  {
    path: '/login',
    name: 'TheLogin',
    beforeEnter: loginChecker,
    component: () => import('@/views/login/TheLogin'),
  },
  {
    path: '/logout',
    name: 'TheLogout',
    component: () => import('@/views/login/TheLogout'),
  },
  {
    path: '/',
    children: flattenDeep(childrenRouters),
    component: () => import('@/views/layout'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/error-page/404.vue'),
  },

];

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
});

// add global guard
router.beforeEach((to, from, next) => {
  nProgress.start();
  authenticationGuard(to, from, next);
});
router.afterEach(() => {
  nProgress.done();
});

const loginChecker= function loginChecker (to, from, next) {

  // you store your logged in state
  if (vuex.getters['storeUser/isLogin']) {
    next('/');
  } else {

    if (vuex.getters['storeToken/hasAccessToken']) {
      vuex.dispatch('storeUser/me').then(() => {
        next('/');
      }).catch(() => {
        vuex.commit('storeToken/init');
        vuex.commit('storeUser/init');
        next();
      });
    } else {
      next();
    }
  }

};

const authenticationGuard = function authenticationGuard (to, from, next) {

  if (isNotAvailGuard(to)) {
    next();

    return;
  }

  if (vuex.getters['storeUser/isLogin']) {
    if (isAccessMenu(to.meta)) {
      next();

      // 화면 접근 이력
      $axios.post('/histories/menus', null, { notRetry: true });

    } else {
      alert($globalConsts.MENU_AUTH_ERROR_MSG);
      // 권한 없는 페이지 접근시 로직 정의 필요
      // next('/logout');
    }
  } else {
    next('/login');
  }

};

const isAccessMenu = function isAccessMenu (meta) {

  let isAccess = false;
  if (!meta) {
    throw new Error('meta is undefined.');
  }

  if (meta.menuCd === 'DASHBOARD') {
    isAccess = true;
  }
  if (!isAccess) {
    const accessMenus = vuex.getters['storeUser/getAccessMenus'];

    const findedAccessMenu = accessMenus.find(accessMenu => accessMenu.menuCd === meta.menuCd);

    if (meta.writeOnly && !findedAccessMenu.write) {
      isAccess = false;
    } else if (findedAccessMenu.read) {
      isAccess = true;
    }

  }

  return isAccess;
};

const isNotAvailGuard = function isNotAvailGuard (to) {
  return to.path === '/login' ||
    to.path === '/logout' ||
    to.name === 'PageNotFound';
};

export default router;
