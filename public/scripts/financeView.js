(function(module) {

  financeViews = {};
  financeViews.chartDataSet = [];

  console.log(Filing.totalPerQuarter);

  financeViews.createDoughnut = function () {
    // buildChartData();
    console.log(Filing.totalPerQuarter);
    var ctx = $('#financial-canvas').get(0).getContext('2d');
    console.log(financeViews.chartDataSet);
    var data = buildChartData();
    console.log(data);

    var myDoughnutChart = new Chart(ctx).Doughnut(data,{
      maintainAspectRatio: true
    });
  };

  var buildChartData = function() {
    var r = 246, g = 70, b = 91;
    var rgbStart = 'rgb('+r+', '+g+', '+b+')';
    Filing.all.forEach(function(f) {
      var chartData = {};
      chartData.value = f.tot_raised;
      chartData.color = 'rgb('+r+', '+(g+10)+', '+(b+20)+')';
      chartData.highlight = '#fff';
      chartData.label = f.filed_date;
      financeViews.chartDataSet.push(chartData);
    });
    console.log(financeViews.chartDataSet);
    return financeViews.chartDataSet;
  };

  financeViews.toHtml = function() {
    var template = Handlebars.compile($('#top10template').text());
    var context = {contributors: Contributor.contributors};
    $('.contributor-list').append(template(context));
  };

  this.financeViews = financeViews;
  Filing.getFilings("blah", financeViews.createDoughnut);
  Contributor.getContributors(financeViews.toHtml);
})(window);
