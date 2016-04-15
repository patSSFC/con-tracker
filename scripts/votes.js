(function (module) {
  var repos = {};

  repos.all = [];

  var member = 'B000574';
  var voteHistory = 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + member + '/votes.json?api-key=43115978a94dd9f66543e486c78f855d:11:74987712';

  var votesArray = ['H R 757', 'H R 1644', 'H R 1927'];

  var findBill = function (targetArray, targetBill) {
    return targetArray.includes(targetBill);
  };

  repos.requestRepos = function (callback) {
    $.ajax({
      url: voteHistory,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        var storage = data.results[0].votes;
        for (var i = 0; i < storage.length; i++) {
          if (findBill(votesArray, storage[i].bill.number)) {
            repos.all.push(storage[i].bill.number);
          }
        }
      }
    )
    .done(callback);
  };

  module.repos = repos;
})(window);
