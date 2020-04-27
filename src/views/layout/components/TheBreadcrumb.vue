<template>
  <div class="b-breadcrumb-wrap">
    <b-breadcrumb>
      <template v-for="(item, index) in items">
        <b-breadcrumb-item
          :key="index"
          :href="item.href"
        >
          {{ item.text }}
        </b-breadcrumb-item>
      </template>
    </b-breadcrumb>
    <div class="b-breadcrumb-sub">
      <ul>
        <li class="u-partner">
          (주)협력사
        </li>
        <li class="u-name">
          <span>관리자님</span>
        </li>
        <li class="u-connect-time">
          <span>(2020.04.01)</span>
        </li>
        <li class="u-connect-ip">
          <span>[127.0.0.1]</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheBreadcrumb',
  data () {
    return {
      items: [
        {
          text: '협력사 관리',
          href: '#',
          active: false,
        },
        {
          text: '협력사 목록',
          href: '#',
          active: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.b-breadcrumb-wrap {
  margin: 0;
  background: #343a40;
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}

.breadcrumb {
  display: inline-flex;
  background-color: transparent !important;
  padding: 0 1rem !important;
}

/* breadcrumb-item disabled. */
.breadcrumb-item a {
  pointer-events: none;
  cursor: default;
}

.b-breadcrumb-wrap .b-breadcrumb-sub {
  display: inline-block;
  color: #e4e4e4;
  right: 1rem;
  padding: 0 1rem;
}

.b-breadcrumb-wrap .b-breadcrumb-sub ul li {
  display: inline-block;
  padding-left: 5px;
}

.b-breadcrumb-wrap .breadcrumb-item a,
.b-breadcrumb-wrap .breadcrumb-item a:link {
  color: #e4e4e4;
  opacity: 0.5;
}

.b-breadcrumb-wrap .breadcrumb-item a:hover,
.b-breadcrumb-wrap .breadcrumb-item a:active {
  color: #e4e4e4;
  opacity: 1;
}

.b-breadcrumb-wrap .breadcrumb-item.active {
  color: #fff;
}
</style>