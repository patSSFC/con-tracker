(function (module) {
  var bio = {};
  var fecID;
  var bioHistory;

  var buildBio = function (proto) { // Takes a legislator object and creates a new legislator object with specific properties.
    var bioInfo = {};
    bioInfo.twitter = 'http://www.twitter.com/' + proto.twitter_id;
    bioInfo.title = proto.title + '. ' + proto.first_name + " " + proto.last_name + ' (' + proto.party + ')';
    bioInfo.state = proto.state;
    bioInfo.website = proto.website;
    bioInfo.phone = proto.phone;
    return bioInfo;
  };

  var requestRepos = function (callback) {
    $.ajax({
      url: bioHistory,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        bio.info = buildBio(data.results[0]);
      }
    )
    .done(callback);
  };

  bio.returnBio = function (member, callback) {
      fecID = member;      
      bioHistory = '/sunlight_congress/legislators?fec_ids=' + fecID;
      requestRepos(callback);
  };

  module.bio = bio;
})(window);
