<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheLogout',
  metaInfo: {
    title: '로그아웃',
  },
  created () {
    const _this = this;
    _this.logout().then(() => {
      _this.$router.push({ path: '/login' });
    }).catch(err => {
      _this.$log.error(err);
    });
  },
  methods: {
    ...mapActions('storeUser', [
      'logout',
    ]),
  },
  // avoid warning message
  render: function (h) {
    return h();
  },
};
</script>