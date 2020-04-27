<template>
  <div>
    <b-container>
      <bar-chart
        ref="itemSalesBarChart"
        :chartdata="itemSalesBarChartData"
        :options="barChartCommonOptions"
        :height="250"
      />
      <doughnut-chart
        ref="weeklyServiceCntDoughnutChart"
        :chartdata="weeklyServiceCntDoughnutChartData"
        :options="doughnutChartCommonOptions"
        :height="250"
        :width="250"
      />
    </b-container>
    <b-container>
      <b-button @click="clickMe">
        test
      </b-button>
      <b-card>
        {{ testData }}
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import BarChart from '@/components/chart/BarChart';
import DoughnutChart from '@/components/chart/DoughnutChart';

export default {
  name: 'TheDashboard',
  metaInfo: {
    title: '대시보드',
  },
  components: {
    'bar-chart': BarChart,
    'doughnut-chart': DoughnutChart,
  },
  data () {
    const $filters = this.$filters;

    return {
      testData: null,
      barChartCommonOptions: {
        scaleOverride: true,
        scales: {
          yAxes: [
            {
              id: 'left-y-axis',
              position: 'left',
              scaleLabel: {
                labelString: '금액[만원]',
                position: 'top',
                display: true,
                fontColor: 'green',
              },
              ticks: {
                userCallback: function (value) {
                  return $filters.convertNumberAddCommaFilter(value);
                },
              },
              gridLines: {
                drawOnChartArea: false,
              },
            },
            {
              id: 'right-y-axis',
              position: 'right',
              scaleLabel: {
                labelString: '수량[건]',
                display: true,
                fontColor: 'red',
              },
              ticks: {
                userCallback: function (value) {
                  return $filters.convertNumberAddCommaFilter(value);
                },
              },
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                userCallback: function (value) {
                  if (!!value && value.length > 10) {
                    value = value.substring(0, 10) + '...';
                  }

                  return value;
                },
              },
            },
          ],
        },
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          drawOnChartArea: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'label',
          callbacks: {
            title: function (tooltipItems, data) {
              let value = data.labels[tooltipItems[0].index];
              if (!value) {
                return value;
              }
              if (value.length > 50) {
                value = value.substring(0, 50) + '...';
              }
              if (value.length > 25) {
                value = value.substring(0, 25) + '\n' + value.substring(25);
              }

              return value;
            },
            label: function (tooltipItem, data) {
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              if (tooltipItem.datasetIndex !== 2) {
                return (
                  $filters.convertNumberAddCommaFilter(value * 10000) +
                  '(원)'
                );
              } else {
                return (
                  $filters.convertNumberAddCommaFilter(value) + '(건)'
                );
              }
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },

      doughnutChartMainData: {
        borderWidth: 0.5,
        data: [923523553712, 892555555596, 956446564643, 847995582255],
        backgroundColor: [],
        borderColor: [],
        hoverBackgroundColor: [],
      },

      doughnutChartCommonOptions: {
        cutoutPercentage: 70,
        legend: {
          display: false,
        },

        tooltips: {
          mode: 'label',
          callbacks: {
            label: function (tooltipItem, data) {
              const allDataArray = data.datasets[tooltipItem.datasetIndex].data;
              const currentData = allDataArray[tooltipItem.index];
              const sumData = allDataArray.reduce(
                (sum, number) => sum + number,
                0,
              );
              const tooltipLabel = data.labels[tooltipItem.index];

              return (
                tooltipLabel + ': (' +
                parseFloat(((currentData / sumData) * 100).toFixed(1)) + '%) ' +
                $filters.convertNumberAddCommaFilter(currentData)
              );
            },
          },
        },
        responsive: false,
        maintainAspectRatio: false,
      },

      itemSalesBarChartData: {
        labels: ['1번상품', '2번상품', '3번상품'],
        datasets: [
          {
            data: [1000, 50000, 2000],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
          },
        ],
      },

      weeklyServiceCntDoughnutChartData: {
        labels: ['1번서비스', '2번서비스', '3번서비스'],
        datasets: [
          {
            data: [9999999, 123123],
            backgroundColor: [
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          },
        ],
      },
    };
  },

  beforeMount: function beforeMount () { },

  mounted: function mounted () {
    this.$refs.itemSalesBarChart.render();
    this.$refs.weeklyServiceCntDoughnutChart.render();
  },

  methods: {
    ...mapActions('storeUser', [
      'me',
    ]),

    clickMe () {
      const _this = this;

      _this.me().then(() => {
        _this.testData = JSON.stringify({
          '현재시각': _this.$moment(),
          '로그인유저': _this.$store.getters['storeUser/getLoginUser'],
        }, 0, 4);
      }).catch(err => {
        _this.$log.error('@/src/views/common/TheDashboard.vue clickMe() error =>', err);
      });
    },

  },
};
</script>