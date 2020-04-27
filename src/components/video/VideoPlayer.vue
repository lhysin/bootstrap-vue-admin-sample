<script>
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';

/**
 * https://github.com/surmon-china/vue-video-player
 * https://docs.videojs.com/tutorial-options.html
 */
export default {

  name: 'VideoPlayer',

  mixins: [videoPlayer],

};
</script>
