import _nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/assets/css/custom-nprogress.css';

_nProgress.configure({
  showSpinner: true,
  template: '<div class="bar" role="bar"><div class="peg"></div></div>',
});

export default _nProgress;