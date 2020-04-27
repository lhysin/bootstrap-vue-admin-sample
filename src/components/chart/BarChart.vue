<script>
import { Bar } from 'vue-chartjs';
import mixinChart from '@/components/chart/mixin';
export default {
  extends: Bar,
  mixins: [mixinChart],
};
</script>