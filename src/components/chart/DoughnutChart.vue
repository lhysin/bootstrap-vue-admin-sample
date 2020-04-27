<script>
import { Doughnut } from 'vue-chartjs';
import mixinChart from '@/components/chart/mixin';
export default {
  extends: Doughnut,
  mixins: [mixinChart],
};
</script>