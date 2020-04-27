import $axios from '@/plugins/axios';
import $globalConsts from '@/plugins/global-constants';
import $log from '@/plugins/vue-logger';
import $moment from '@/plugins/moment';

const partnerUri = '/v1/partners';

const state = {
  partners: [],
  partner: {
    ptnrNo: null,
    ptnrNm: null,
    empNm: null,
    strDate: null,
    strTime: null,
    endDate: null,
    endTime: null,
  },
};

const mutations = {
  setPartners (state, payload) {
    state.partners = payload.partners;
  },
  setPartner (state, payload) {
    state.partner = payload.partner;
  },
};

const getters = {
  getPartners (state) {
    return state.partners;
  },
  getPartner (state) {
    return state.partner;
  },
};

const actions = {

  readPartners (context, criteria) {
    return new Promise(function (resolve) {
      $axios.get(partnerUri, { params: criteria }).then(res => {
        context.commit('setPartners', { partners: res.data.list });
        resolve({ totalRows: res.data.totalRows });
      }).catch(err => {
        $log.error(err);
      });
    });
  },

  readPartner (context, ptnrNo) {
    return new Promise(function (resolve) {
      $axios.get(`${partnerUri}/${ptnrNo}`).then(res => {
        const partner = res.data;

        convertDataForDisp(partner);

        context.commit('setPartner', { partner: partner });
        resolve();
      }).catch(err => {
        $log.error(err);
      });
    });
  },

  createPartner (context, partner) {
    convertDataForServer(partner);

    return new Promise(function (resolve, reject) {
      if (confirm($globalConsts.CONFIRM_CREATE_SAVE_MSG)) {
        $axios.post(partnerUri, partner).then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
      }
    });
  },

  updatePartner (context, partner) {
    convertDataForServer(partner);

    return new Promise(function (resolve, reject) {
      if (confirm($globalConsts.CONFIRM_UPDATE_SAVE_MSG)) {
        $axios.put(partnerUri, partner).then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
      }
    });
  },

};

const convertDataForDisp = function convertDataForDisp (partner) {
  if (partner.strDtime) {
    partner.strDate = $moment(partner.strDtime, $globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT).format($globalConsts.YYYY_MM_DD_FORMAT);
    partner.strTime = $moment(partner.strDtime, $globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT).format($globalConsts.HH_MM_FORMAT);
  }
  if (partner.endDtime) {
    partner.endDate = $moment(partner.endDtime, $globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT).format($globalConsts.YYYY_MM_DD_FORMAT);
    partner.endTime = $moment(partner.endDtime, $globalConsts.YYYY_MM_DD_HH_MM_SS_FORMAT).format($globalConsts.HH_MM_FORMAT);
  }
};

const convertDataForServer= function convertDataForServer (partner) {
  if (partner.strDate && partner.strTime) {
    partner.strDtime = partner.strDate + ' ' + partner.strTime + ':00';
  }
  if (partner.endDate && partner.endTime) {
    partner.endDtime = partner.endDate + ' ' + partner.endTime + ':00';
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};