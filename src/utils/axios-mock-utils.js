import vuex from '@/store';
import $globalConsts from '@/plugins/global-constants';
import $log from '@/plugins/vue-logger';

import lowerCase from 'lodash/lowerCase';

import drop from 'lodash/fp/drop';
import filter from 'lodash/fp/filter';
import orderBy from 'lodash/fp/orderBy';
import take from 'lodash/fp/take';
import flow from 'lodash/fp/flow';

export default {

  activeAxiosMock () {

    if (!$globalConsts.isLocal) {
      throw new Error('available only local profile.');
    }

    return new Promise(function (resolve) {
      // setup axios-mock-adapter
      import('@/mock').then(() => {
        $log.warn('axios-mock-adapter is available.');
        vuex.dispatch('storeUser/mockLogin');
        resolve();
      });
    });
  },

  arrayPagination (array, criteria, filters) {

    if (!Array.isArray(array)) {
      return {
        list: array,
        totalRows: array.length,
      };
    }

    return {

      list: flow(
        filter(filters),
        orderBy(criteria.orderColId, lowerCase(criteria.orderType)),
        drop((criteria.page - 1) * criteria.size),
        take(criteria.size),
      )(array),

      totalRows: flow(
        filter(filters),
      )(array).length,

    };
  },

};
