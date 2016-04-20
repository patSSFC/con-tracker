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
  Contributor.context = {};

  function Contributor(contrib) {
    for (var prop in contrib) {
      if(contrib.hasOwnProperty(prop)) {
        this[prop] = contrib[prop];
      }
    }
  }


  Filing.getFilings = function (next) {
    $.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168&apikey=a59f2c8227c949fe90f7ccb1c0cba86f', function(data) {
    }).done(function(data) {
      Filing.totalPerQuarter = data.results.map(function(r) {
        return r.tot_raised;
      });
      console.log(Filing.totalPerQuarter);
      financeViews.createDoughnut();
    });
  };

  var buildContributor = function(proto) {
    var contribInfo = {};
    contribInfo.total = proto.total;
    contribInfo.org_name = proto.org_name;
    return contribInfo;
  };

  Contributor.getContributors = function (next) {
    $.getJSON('/opensecrets/?method=candContrib&cid=N00007360&cycle=2016&output=json', function(data) {
      Contributor.contributors = data.response.contributors.contributor;
    }).done(function(data, message, xhr) {
      var contribs = Contributor.contributors;
      contribs = contribs.map(function(c) {
        return buildContributor(c['@attributes']);
      });
      Contributor.contributors = contribs;
      financeViews.toHtml();
    });
  };

  Contributor.getContributors();
  this.Filing = Filing;
  this.Contributor = Contributor;
})(window);
