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

  Contributor.contributors = [];

  function Contributor(contrib) {
    for (var prop in contrib) {
      if(contrib.hasOwnProperty(prop)) {
        this[prop] = contrib[prop];
      }
    }
  }


  var filingsRequest = "http://realtime.influenceexplorer.com/api//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168&apikey=a59f2c8227c949fe90f7ccb1c0cba86f";
  var contribRequest = "http://www.opensecrets.org/api/?method=candContrib&cid=N00007360&cycle=2016&apikey=0250595e734190ea51d62e7b981ea2d5&output=json";

  Filing.getFilings = function (next) {
    $.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168&apikey=a59f2c8227c949fe90f7ccb1c0cba86f', function(data) {
      Filing.filings = data.results;
    }).done(function(data) {
      Filing.totalPerQuarter = data.results.map(function(r) {
        return r.tot_raised;
      });
      next();
    });
  }

  Contributor.getContributors = function (next) {
    $.getJSON('/opensecrets/?method=candContrib&cid=N00007360&cycle=2016&output=json', function(data) {
      // console.log(data.response.contributors.contributor[0]["@attributes"]);
      Contributor.contributors = data.response.contributors.contributor;
    }).done(function() {
      console.log(Contributor.contributors[0]["@attributes"].org_name);
    });
  }

  Contributor.getContributors();
  this.Filing = Filing;
})(window);
