<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    htmlAttrs: {
      lang: 'ko',
      amp: true,
    },
    titleTemplate: '관리자 - %s',
  },
};
</script>