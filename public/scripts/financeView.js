(function(module) {

  financeViews = {};

  console.log(Filing.totalPerQuarter);
  financeViews.createDoughnut = function () {
    console.log(Filing.totalPerQuarter);
    var ctx = $('#financial-canvas').get(0).getContext('2d');
    var data = [
      {
        value: Filing.totalPerQuarter[0]/1000000,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Test'
      },
      {
        value: Filing.totalPerQuarter[1]/1000000,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Test'
      },
      {
        value: Filing.totalPerQuarter[2]/1000000,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Test'
      }
    ];

    var myDoughnutChart = new Chart(ctx).Doughnut(data,{
      maintainAspectRatio: true
    });
  };

  financeViews.toHtml = function() {
    var template = Handlebars.compile($('#top10template').text());
    var context = {contributors: Contributor.contributors};
    $('.contributor-list').append(template(context));
  };

  this.financeViews = financeViews;
})(window);
