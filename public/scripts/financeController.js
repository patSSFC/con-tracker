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
    console.log('sup');
    console.log(ctx);
    $.getJSON('/sunlight_finance//new_filing/?format=json&page=1&page_size=10&candidate_id=' + ctx.params.id
    , function(data) {
    }).success(function(data) {
      console.log(data.results);
      console.log('id' + ctx.params.id);
      // Filing.all = data.results;
      Filing.all = data.results.map(function(r) {
        return buildFiling(r);
      });
      console.log(Filing.all);
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
    console.log('ctx' + ctx);
    console.log('crp' + ctx.crpId);
    $.getJSON('/opensecrets/?method=candContrib&cid=' + ctx.crpId + '&output=json', function(data) {
      Contributor.contributors = data.response.contributors.contributor;
    }).success(function(data, message, xhr) {
      console.log(data);
      var contribs = Contributor.contributors;
      contribs = contribs.map(function(c) {
        return buildContributor(c['@attributes']);
      });
      bio.contributors = contribs;
      // Contributor.list = contribs;
      console.log('contrib in controller' + Contributor.contributors);
      // financeViews.toHtml();
      next();
    });
  };

  // Filing.getFilings(financeViews.createDoughnut);
  // Contributor.getContributors(financeViews.toHtml);
  module.Filing = Filing;
  module.Contributor = Contributor;
})(window);

//P60007168
