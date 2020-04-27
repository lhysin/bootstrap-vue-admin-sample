import '@babel/polyfill';

import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';

import '@/plugins/axios';
import '@/plugins/bootstrap-vue';
import '@/plugins/global-constants';
import '@/plugins/nprogress';
import '@/plugins/moment';
import '@/plugins/vee-validate';

// https://stackoverflow.com/questions/39438094/best-way-to-have-global-css-in-vuejs
// add global css
import '@/assets/css/main.css';

import $log from '@/plugins/vue-logger';
import $healthCheckerUtils from '@/utils/health-checker-utils';

Vue.config.productionTip = false;

$healthCheckerUtils.checkAdminServer().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}).catch(err => {
  $log.error(err);
});