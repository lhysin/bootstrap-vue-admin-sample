<template>
  <b-form
    name="form"
    @submit.prevent="submitVeritySms"
  >
    <b-form-group>
      <label for="smsNo">인증번호</label>
      <b-form-input
        v-model="smsNo"
        v-validate="'required'"
        type="text"
        class="form-control"
        name="smsNo"
        data-vv-as="인증번호"
        :data-vv-scope="smsFormScope"
        :state="stateValidation('smsNo', smsFormScope)"
      />
      <b-form-invalid-feedback :state="!veeErrors.has('smsNo', smsFormScope)">
        {{ veeErrors.first('smsNo', smsFormScope) }}
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <button class="btn btn-primary btn-block">
        <span>인증확인</span>
      </button>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      smsFormScope: 'SMS_FORM_SCOPE',
      smsNo: null,
    };
  },

  mounted () {
    const _this = this;

    if (_this.$globalConsts.isLocal) {
      this.smsNo = '123456';
    }
  },

  methods: {
    ...mapActions('storeUser', ['veritySms']),

    submitVeritySms () {
      const _this = this;

      _this
        .checkValidation(_this.$validator, _this.smsFormScope).then(() => {
          return _this.veritySms({
            smsNo: _this.smsNo,
          });
        }).then(() => {
          _this.$log.debug('@/views/login/SmsForm.vue submitSmsAuth() Success');
        }).catch(err => {
          _this.$log.error('@/views/login/SmsForm.vue submitSmsAuth() Fail', err);
        });
    },
  },
};
</script>