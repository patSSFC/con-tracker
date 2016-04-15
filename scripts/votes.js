(function (module) {
  var repos = {};

  repos.all = [];

  var member = 'B000574';
  var voteHistory = 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + member + '/votes.json?api-key=43115978a94dd9f66543e486c78f855d:11:74987712';

  var votesArray = ['S J RES 23', 'H R 1927', 'H R 2130', 'H R 1644'];

  var findBill = function (targetArray, targetBill) {
    return targetBill.question === 'On Passage' &&
           targetArray.includes(targetBill.bill.number);
  };

  repos.requestRepos = function (callback) {
    $.ajax({
      url: voteHistory,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        var storage = data.results[0].votes;
        for (var i = 0; i < storage.length; i++) {
          if (findBill(votesArray, storage[i])) {
            var voteInfo = {};
            voteInfo.billID = storage[i].bill.number;
            voteInfo.title = storage[i].bill.title;
            voteInfo.position = storage[i].position;
            repos.all.push(voteInfo);
          }
        }
      }
    )
    .done(callback);
  };

  module.repos = repos;
})(window);
