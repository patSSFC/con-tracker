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

  Filing.getFilings = function (ctx, next) {
    $.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=' + ctx.params.id
    , function(data) {
    }).success(function(data) {
      Filing.all = data.results.map(function(r) {
        return buildFiling(r);
      });
      financeViews.createDoughnut();
      next();
    }).error(
      function (data, status) {
        console.log(data);
        console.log(status);
      });
  };

  var buildContributor = function(proto) {
    var contribInfo = {};
    contribInfo.total = proto.total;
    contribInfo.org_name = proto.org_name;
    return contribInfo;
  };

  Contributor.getContributors = function (ctx, next) {
    $.getJSON('/opensecrets/?method=candContrib&cid=' + ctx.crpId + '&output=json', function(data) {
      Contributor.contributors = data.response.contributors.contributor;
    }).success(function(data, message, xhr) {
      var contribs = Contributor.contributors;
      contribs = contribs.map(function(c) {
        return buildContributor(c['@attributes']);
      });
      bio.contributors = contribs;
      next();
    });
  };

  module.Filing = Filing;
  module.Contributor = Contributor;
})(window);
