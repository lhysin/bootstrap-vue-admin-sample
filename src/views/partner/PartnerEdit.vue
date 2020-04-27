<template>
  <b-container>
    <h1>협력사 수정</h1>
    <b-card bg-variant="light">
      <b-form
        autocomplete="off"
        novalidate
        @submit.prevent="submitUpdate"
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
          <b-btn
            type="submit"
          >
            저장
          </b-btn>
        </b-form-group>
      </b-form>
    </b-card>
  </b-container>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

import RangeDatePicker from '@/components/date-picker/RangeDatePicker';

export default {
  name: 'PartnerEdit',
  metaInfo: {
    title: '협력사 수정',
  },
  components: {
    'range-date-picker': RangeDatePicker,
  },
  data () {
    return {
      partner: {},
    };
  },
  computed: {
    partnerFormScope () {
      return Object.freeze('PARTNER_FORM_SCOPE');
    },
  },
  beforeMount () {
    const _this = this;
    const ptnrNo = _this.$route.params.ptnrNo;
    _this.readPartner(ptnrNo).then(() => {
      _this.partner = Object.assign({}, _this.getPartner());
    });
  },
  methods: {

    ...mapGetters('storePartner', [
      'getPartner',
    ]),

    ...mapActions('storePartner', [
      'readPartner',
      'updatePartner',
    ]),

    submitUpdate () {
      const _this = this;

      _this.compareEqObj(_this.partner, _this.getPartner()).then(() => {
        return _this.checkValidation(_this.partnerFormScope);
      }).then(() => {
        return _this.updatePartner(_this.partner);
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