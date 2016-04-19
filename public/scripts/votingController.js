(function (module) {
  var voteRepos = {};
  var member;
  var voteHistory;
  var votesArray = ['S J RES 23', 'H R 1927', 'H R 2130', 'H R 1644']; // Specific bills we want to store

  voteRepos.all = [];

  var findBill = function (targetArray, targetBill) {
    return targetBill.question === 'On Passage' && // 'On Passage' means they're voting to pass the bill.
           targetArray.includes(targetBill.bill.number);
  };

  var buildBill = function (proto) { // Takes a bill object and creates a new bill object with specific properties.
    var voteInfo = {};
    voteInfo.billID = proto.bill.number;
    voteInfo.title = proto.bill.title;
    voteInfo.position = proto.position;
    voteInfo.desription = proto.description;
    return voteInfo;
  };

  var requestRepos = function (callback) {
    $.ajax({
      url: voteHistory,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        var storage = data.results[0].votes;
        for (var i = 0; i < storage.length; i++) {
          if (findBill(votesArray, storage[i])) {
            voteRepos.all.push(buildBill(storage[i]));
          }
        }
      }
    )
    .done(callback);
  };

  voteRepos.returnVotes = function (member, callback) {
    member = member;
    voteHistory = '/nyt_api/' + member + '/votes.json'; // Returns members last 100 votes.
    console.log('my vote history :: ' + voteHistory);
    requestRepos(callback);
  };

  voteRepos.index = function (ctx, next) {
    console.log('In the index');
    votingViews.loadVotes(ctx.params.id, votingViews  .renderVotes);
    next();
  };

  voteRepos.about = function (ctx, next) {
    console.log('ABOUT!' + JSON.stringify(ctx));
  };

  module.voteRepos = voteRepos;
})(window);
