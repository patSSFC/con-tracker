(function (module) {
  var bio;

  var fecID = 'S6OR00110';
  var bioHistory = 'https://congress.api.sunlightfoundation.com/legislators?fec_ids=' + fecID + '&apikey=a59f2c8227c949fe90f7ccb1c0cba86f'; // pull bio info on member by fecID

  var buildBio = function (proto) { // Takes a legislator object and creates a new legislator object with specific properties.
    var bioInfo = {};
    bioInfo.twitter = 'http://www.twitter.com/' + proto.twitter_id;
    bioInfo.title = proto.title + '. ' + proto.first_name + " " + proto.last_name + ' (' + proto.party + ')';
    bioInfo.state = proto.state;
    bioInfo.website = proto.website;
    bioInfo.phone = proto.phone;
    return bioInfo;
  };

  repos.requestRepos = function (callback) {
    $.ajax({
      url: bioHistory,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        bio = buildBio(data.results[0]);
      }
    )
    .done(callback);
  };

  module.bio = bio;
})(window);
