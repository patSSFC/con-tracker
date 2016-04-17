(function (module) {
  votingViews = {};
  votingViews.renderVotes = function (votes) {
    var ctx = { votes: votes };
    var template = Handlebars.compile($('#votesTemplate').html());
    $('#voting-view').html(template(ctx));
  };

  votingViews.loadVotes = function (member) {
    voteRepos.returnVotes(member, function (data, message) {
      console.log(JSON.stringify(data));
      console.log(voteRepos.all);
    });

  };

  module = votingViews;
})(window);