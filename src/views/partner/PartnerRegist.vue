<template>
  <b-container>
    <h1>협력사 등록</h1>
    <b-card bg-variant="light">
      <b-form
        autocomplete="off"
        novalidate
        @submit.prevent="submitCreate"
      >
        <b-form-group
          label-cols-sm="2"
          label="협력사 명 : "
          label-align-sm="left"
          label-for="ptnrNm"
        >
          <b-input
            id="ptnrNm"
            v-model="partner.ptnrNm"
            v-validate="'required'"
            name="ptnrNm"
            placeholder="협력사명을 입력해주세요."
            data-vv-as="협력사명"
            :data-vv-scope="partnerFormScope"
            :state="stateValidation('ptnrNm', partnerFormScope)"
            :error="veeErrors.first('ptnrNm', partnerFormScope)"
          />
          <b-form-invalid-feedback :state="!veeErrors.has('ptnrNm', partnerFormScope)">
            {{ veeErrors.first('ptnrNm', partnerFormScope) }}
          </b-form-invalid-feedback>
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
            v-validate="'required'"
            name="empNm"
            placeholder="담당자명을 입력해주세요."
            data-vv-as="담당자"
            :data-vv-scope="partnerFormScope"
            :state="stateValidation('empNm', partnerFormScope)"
            :error="veeErrors.first('empNm', partnerFormScope)"
          />
          <b-form-invalid-feedback :state="!veeErrors.has('empNm', partnerFormScope)">
            {{ veeErrors.first('empNm', partnerFormScope) }}
          </b-form-invalid-feedback>
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
            v-validate="'rangeDateWithTime'"
            name="rangeDate"
            :with-time="true"
            data-vv-as="전시기간"
            :data-vv-scope="partnerFormScope"
            :state="stateValidation('rangeDate', partnerFormScope)"
            :error="veeErrors.first('rangeDate', partnerFormScope)"
          />
        </b-form-group>
        <b-form-group
          class=" text-right"
        >
          <b-btn type="submit">
            저장
          </b-btn>
        </b-form-group>
      </b-form>
    </b-card>
  </b-container>
</template>
<script>

import { mapActions } from 'vuex';

import RangeDatePicker from '@/components/date-picker/RangeDatePicker';

export default {
  name: 'PartnerRegist',
  metaInfo: {
    title: '협력사 등록',
  },
  components: {
    'range-date-picker': RangeDatePicker,
  },
  data () {
    return {
      partner: {
        ptnrNm: null,
        empNm: null,
        strDate: null,
        endDate: null,
      },
    };
  },
  computed: {
    partnerFormScope () {
      return Object.freeze('PARTNER_FORM_SCOPE');
    },
  },
  beforeMount () {
    // TODO 개발확인
    const _this = this;
    if (_this.$globalConsts.isLocal) {
      _this.partner.ptnrNm = '테스트 협력사';
      _this.partner.empNm = '테스트 협력사 관리자';
      _this.partner.strDate = '2018.10.31';
      _this.partner.endDate = '2020.10.31';
      _this.partner.strTime = '00:00';
      _this.partner.endTime = '23:59';
    }
  },
  mounted () {

  },
  methods: {

    ...mapActions('storePartner', [
      'createPartner',
    ]),

    submitCreate () {
      const _this = this;
      _this.checkValidation(_this.partnerFormScope).then(() => {
        return _this.createPartner(_this.partner);
      }).then(() => {
        alert(_this.$globalConsts.SUCCESS_SAVE_MSG);
        _this.$router.push({ path: '/partner/manage' });
      }).catch(err => {
        _this.$log.error(err);
        alert(_this.$globalConsts.SEVER_ERROR_MSG);
      });
    },

  },
};
</script>