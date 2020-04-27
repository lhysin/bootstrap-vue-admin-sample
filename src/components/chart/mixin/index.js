export default {
  props: {
    chartdata: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },

  methods: {
    render () {
      this.renderChart(this.chartdata, this.options);
    },
  },
};