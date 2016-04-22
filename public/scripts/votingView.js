(function (module) {
  votingViews = {};
  var setVoteColor = function (bills) {
    var b = bills.map(function (bill) {
      if (bill.position && bill.position === 'Yes') {
        bill.positionClass = 'position-yes';
      } else {
        bill.positionClass = 'position-no';
      }

      return bill;
    });
    return b;
  };

  votingViews.renderVotes = function (bills) {
    console.log('my votes :: ' + JSON.stringify(bills));
    var ctx = { bills: setVoteColor(bills) };
    var template = Handlebars.compile($('#votesTemplate').text());

    $('#voting-view').empty().append(template(ctx));
  };

  votingViews.loadVotes = function (member, callback) {
    voteRepos.returnVotes(member, function (data, message) {
      console.log(voteRepos.all);
      callback(voteRepos.all);
    });
  };

  module.votingViewsw = votingViews;
})(window);
