<template>
  <nav class="layout-footer footer">
    <div class="container-fluid container-p-x pb-3 pt-3 text-center">
      <span class="footer-text font-weight-bolder">
        관리자 사이트입니다. 인증받은 사용자만 이용이 가능합니다.
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>
<style lang="scss" scoped>
.layout-footer.footer {
  background: #f4f4f4;
  margin-top: 50px;

  .footer-text {
    font-size: 0.7rem;
    line-height: 1.2em;
    display: inline-block;
  }
}
</style>
