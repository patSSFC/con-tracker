(function(module) {

  financeViews = {};
  financeViews.chartDataSet = [];

  financeViews.createDoughnut = function () {
    $('#bio-style').show();
    var myDoughnutChart;
    destroyChart();
    $('#financial-canvas').empty();
    var ctx = $('#financial-canvas').get(0).getContext('2d');
    var data = buildChartData();

    var myDoughnutChart = new Chart(ctx).Doughnut(data);
    financeViews.currentChart = myDoughnutChart;
  };

  destroyChart = function() {
    if(financeViews.currentChart !== undefined) {
      financeViews.currentChart.destroy();
    }
  };

  var buildChartData = function() {
    Filing.all.forEach(function(f) {
      var chartData = {};
      chartData.value = f.tot_raised;
      chartData.color = '#BF55EC';
      chartData.highlight = '#BE90D4';
      chartData.label = f.filed_date;
      financeViews.chartDataSet.push(chartData);
    });
    return financeViews.chartDataSet;
  };
  this.financeViews = financeViews;
})(window);
