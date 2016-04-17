(function (module) {
  votingViews = {};
  votingViews.renderVotes = function (bills) {
    console.log('my votes :: ' + JSON.stringify(bills));
    var ctx = { bills: bills };
    var template = Handlebars.compile($('#votesTemplate').text());
    $('#voting-view').append(template(ctx));
  };

  votingViews.loadVotes = function (member, callback) {
    voteRepos.returnVotes(member, function (data, message) {
      console.log(voteRepos.all);
      callback(voteRepos.all);
    });

  };

  module = votingViews;
})(window);
