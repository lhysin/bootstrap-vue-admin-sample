<template>
  <b-form
    name="form"
    @submit.prevent="submitLogin"
  >
    <b-form-group>
      <label for="adminId">사용자 ID</label>
      <b-input
        v-model="adminId"
        v-validate="'required'"
        type="text"
        class="form-control"
        name="adminId"
        data-vv-as="사용자 ID"
        :data-vv-scope="loginFormScope"
        :state="stateValidation('adminId', loginFormScope)"
      />
      <b-form-invalid-feedback :state="!veeErrors.has('adminId', loginFormScope)">
        {{ veeErrors.first('adminId', loginFormScope) }}
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <label for="password">비밀번호</label>
      <b-input
        v-model="password"
        v-validate="'required'"
        type="password"
        class="form-control"
        name="password"
        data-vv-as="비밀번호"
        :data-vv-scope="loginFormScope"
        :state="stateValidation('password', loginFormScope)"
      />
      <b-form-invalid-feedback :state="!veeErrors.has('password', loginFormScope)">
        {{ veeErrors.first('password', loginFormScope) }}
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group>
      <button class="btn btn-primary btn-block">
        <span>로그인</span>
      </button>
    </b-form-group>
  </b-form>
</template>

<script>

import { mapActions } from 'vuex';

export default {

  data () {
    return {
      loginFormScope: 'LOGIN_FORM_SCOPE',
      adminId: null,
      password: null,
    };
  },

  mounted () {
    const _this = this;

    if (_this.$globalConsts.isLocal) {
      this.adminId = 'test';
      this.password = 'test';
    }
  },

  methods: {

    ...mapActions('storeUser', [
      'login',
    ]),

    submitLogin () {
      const _this = this;

      _this.checkValidation(_this.$validator, _this.loginFormScope).then(() => {
        return _this.login({
          adminId: _this.adminId,
          password: _this.password,
        });
      }).then(() => {
        _this.$log.debug('@/views/login/LoginForm.vue submitLogin() Success');
      }).catch(err => {
        _this.$log.error('@/views/login/LoginForm.vue submitLogin() Fail.', err);
      });

    },

  },
};
</script>