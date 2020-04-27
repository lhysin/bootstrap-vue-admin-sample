<template>
  <b-container fluid>
    <video-player
      :options="videoOption"
    />
  </b-container>
</template>

<script>

import VideoPlayer from '@/components/video/VideoPlayer';

export default {
  name: 'VideoPlayerSample',
  metaInfo: {
    title: '영상 재생 샘플',
  },
  components: {
    'video-player': VideoPlayer,
  },
  data () {
    return {

      videoOption: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
        }],
        poster: '/static/images/author.jpg',
      },
    };
  },
};
</script>