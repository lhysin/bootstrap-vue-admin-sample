import Vue from 'vue';

import _globalFilters from '@/filters/global-filters';

const FiltersPlugin = {
  install: function (Vue) {
    Object.defineProperties(Vue.prototype, {
      $globalFilters: {
        get () {
          return _globalFilters;
        },
      },
    });
  },
};

Vue.use(FiltersPlugin);

// register global filters
Object.keys(_globalFilters).forEach(key => {
  Vue.filter(key, _globalFilters[key]);
});