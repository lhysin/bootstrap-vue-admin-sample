<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="@/assets/images/avatar_2x.png"
        class="profile-img-card"
      >
      <login-form v-if="!hasAccessToken" />
      <sms-form v-if="hasAccessToken" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LoginForm from '@/views/login/components/LoginForm';
import SmsForm from '@/views/login/components/SmsForm';

export default {
  name: 'TheLogin',
  metaInfo: {
    title: '로그인',
  },
  components: {
    'login-form': LoginForm,
    'sms-form': SmsForm,
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters('storeToken', {
      'hasAccessToken': 'hasAccessToken',
    }),
  },
  mounted () {
  },
  methods: {

  },
};
</script>

<style scoped src="@/assets/css/login.css">
</style>