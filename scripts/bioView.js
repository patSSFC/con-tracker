(function(module) {

  Filing.filings = [];
  Filing.totalPerQuarter = [];

  function Filing(file) {
    for (var prop in file) {
      if(file.hasOwnProperty(prop)) {
        this[prop] = file[prop];
      }
    }
  }

  // var testRequest = "http://realtime.influenceexplorer.com/api//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168&apikey=a59f2c8227c949fe90f7ccb1c0cba86f";

  $.getJSON(testRequest, function(data) {
    Filing.filings = data.results;
  }).done(function(data) {
    Filing.totalPerQuarter = data.results.map(function(r) {
      return r.tot_raised;
    });

    var ctx = $('#financial-canvas').get(0).getContext('2d');
    console.log(Filing.filings);
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

  });
    // console.log(Filing.totalPerQuarter);

  this.Filing = Filing;
})(window);
