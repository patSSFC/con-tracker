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
    voteHistory = '/nyt_api/' + member + '/votes.json?api-key=43115978a94dd9f66543e486c78f855d:11:74987712'; // Returns members last 100 votes.
    requestRepos(callback);
  };

  module.voteRepos = voteRepos;
})(window);
