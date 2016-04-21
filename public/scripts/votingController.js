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
        console.log("VOTES :: " + JSON.stringify(storage));
        voteRepos.all = [];
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
    votingViews.loadVotes(ctx.bioguideId , votingViews.renderVotes);
    next();
  };

  voteRepos.getBioID = function (ctx, next){
    $.ajax({
      url:'/sunlight_congress/legislators?crp_id=' + ctx.crpId + '&all_legislators=true',
      type: 'GET',
    }).success(function(data, message, xhr){
      console.log("bioguideID " + data);
      console.log("bioguide message " + message);
      if (data.results[0]){
        ctx.bioguideId = data.results[0].bioguide_id
        next()
      } else {
        console.log('no bioguide id');
        next()
      }
    })
  };

  voteRepos.getCRPID = function (ctx, next) {
    console.log("FEC ID" + ctx.params.id);

    $.ajax({
      url: '/database/',
      type: 'GET'
    }).success(
      function (data, message, xhr) {
        ctx.crpId = data.rows.filter(function(row){
          return row.fec_id === ctx.params.id
        }).map(function(row){
          return row.crp
        })
        console.log("CRP::: " + ctx.crpId);
        next()
      }).error(
        function (data, status) {
          console.log(data);
          console.log(status);
          next()
        })
  }


  voteRepos.about = function (ctx, next) {
    console.log('ABOUT!' + JSON.stringify(ctx));
  };

  module.voteRepos = voteRepos;
})(window);
