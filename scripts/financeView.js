(function(module) {

function createDoughnut () {
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
}

function populateContributors() {
  var template = Handlebars.compile($(''))
  var context = {contributors: Contributor.contributors};

}

Filing.getFilings(createDoughnut);

})(window);
