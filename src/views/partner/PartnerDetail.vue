<template>
  <b-container>
    <h1>공급사 상세</h1>
    <b-card bg-variant="light">
      <b-form>
        <b-form-group
          label-cols-sm="2"
          label="공급사 명 : "
          label-align-sm="left"
          label-for="ptnrNm"
        >
          <b-input
            id="ptnrNm"
            v-model="partner.ptnrNm"
            name="ptnrNm"
            :readonly="true"
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="2"
          label="당담자 명 : "
          label-align-sm="left"
          label-for="empNm"
        >
          <b-input
            id="empNm"
            v-model="partner.empNm"
            name="empNm"
            :readonly="true"
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="2"
          label="전시기간 : "
          label-align-sm="left"
          label-for="strDtAndEndDt"
        >
          <range-date-picker
            ref="rangeDate"
            v-model="partner"
            name="rangeDate"
            :with-time="true"
            :disabled="true"
            data-vv-as="전시기간"
          />
        </b-form-group>
        <b-form-group
          class=" text-right"
        >
          <router-link
            v-if="isEditable()"
            :to="`/partner/edit/${$route.params.ptnrNo}`"
            class="btn btn-secondary"
          >
            수정
          </router-link>
        </b-form-group>
      </b-form>
    </b-card>
  </b-container>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

import RangeDatePicker from '@/components/date-picker/RangeDatePicker';

export default {
  name: 'PartnerDetail',
  metaInfo: {
    title: '공급사 상세',
  },
  components: {
    'range-date-picker': RangeDatePicker,
  },
  computed: {
    ...mapGetters('storePartner', {
      'partner': 'getPartner',
    }),
  },
  beforeMount () {
    const _this = this;
    const ptnrNo = _this.$route.params.ptnrNo;
    _this.readPartner(ptnrNo);
  },
  methods: {
    ...mapActions('storePartner', [
      'readPartner',
    ]),
  },
};
</script>