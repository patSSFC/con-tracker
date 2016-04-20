(function(module) {

  Filing = {};
  Filing.totalPerQuarter = [];

  Contributor = {};
  Contributor.contributors = [];

  Filing.getFilings = function (next) {
    $.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168'
    , function(data) {
    }).done(function(data) {
      Filing.totalPerQuarter = data.results.map(function(r) {
        return r.tot_raised;
      });
    });
  }

  var buildContributor = function(proto) {
    var contribInfo = {};
    contribInfo.total = proto.total;
    contribInfo.org_name = proto.org_name;
    return contribInfo;
  }

  Contributor.getContributors = function (next) {
    $.getJSON('/opensecrets/?method=candContrib&cid=N00007360&cycle=2016&output=json', function(data) {
      Contributor.contributors = data.response.contributors.contributor;
    }).done(function(data, message, xhr) {
      var contribs = Contributor.contributors;
      contribs = contribs.map(function(c) {
        return buildContributor(c["@attributes"]);
      })
      Contributor.contributors = contribs;
      console.log(Contributor.contributors);
      Contributor.toHtml();
    });
  }

  Contributor.getContributors();
  this.Filing = Filing;
  this.Contributor = Contributor;
})(window);
