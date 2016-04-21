(function(module) {

  Filing = {};
  Filing.totalPerQuarter = [];
  Filing.all = [];

  Contributor = {};
  Contributor.contributors = [];

  var buildFiling = function(raw) {
    var filingInfo = {};
    filingInfo.committee_name = raw.committee_name;
    filingInfo.filed_date = raw.filed_date;
    filingInfo.tot_raised = raw.tot_raised;
    filingInfo.tot_spent = raw.tot_spent;
    return filingInfo;
  };

  Filing.getFilings = function (ctx, next) {$.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=P60007168'
    , function(data) {
    }).success(function(data) {
      console.log(data.results);
      // Filing.all = data.results;
      Filing.all = data.results.map(function(r) {
        return buildFiling(r);
      });
      console.log(Filing.all);
      // financeViews.createDoughnut();
      next();
    });
    // next();
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
      // financeViews.toHtml();
      next();
    });
  };

  // Filing.getFilings(financeViews.createDoughnut);
  // Contributor.getContributors(financeViews.toHtml);
  this.Filing = Filing;
  this.Contributor = Contributor;
})(window);
