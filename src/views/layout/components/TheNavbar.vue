<template>
  <div>
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-nav>
        <b-nav-item to="/">
          Home
        </b-nav-item>
        <b-nav-item-dropdown
          text="협력사"
          right
        >
          <b-dropdown-item to="/partner/manage">
            협력사 관리
          </b-dropdown-item>
          <b-dropdown-item to="/item/manage">
            상품 관리
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          text="전시"
          right
        >
          <b-dropdown-item to="/display/manage">
            전시 관리
          </b-dropdown-item>
          <b-dropdown-item to="/promotion/manage">
            프로모션 관리
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- TODO 개발전용 -->
        <b-nav-item
          v-if="!$globalConsts.isPrd"
          to="/sample"
        >
          샘플모음
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          href="#"
          right
          @click.prevent="submitLogout"
        >
          로그아웃
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'TheNavbar',
  methods: {

    submitLogout () {
      const _this = this;

      const msg = '로그아웃을 진행하시겠습니까?';
      if (confirm(msg)) {
        _this.$router.push('/logout');
      }
    },

  },
};
</script>