import Vue from 'vue';

import _moment from 'moment';

_moment.locale('ko');

const MomentPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $moment: {
        get () {
          return _moment;
        },
      },
    });
  },
};

Vue.use(MomentPlugin);

export default _moment;