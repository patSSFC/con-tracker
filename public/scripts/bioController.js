(function (module) {
  var bio = {};

  var buildBio = function (proto) { // Takes a legislator object and creates a new legislator object with specific properties.
    var bioInfo = {};
    bioInfo.twitter = 'http://www.twitter.com/' + proto.twitter_id;
    bioInfo.title = proto.title + '. ' + proto.first_name + ' '+ proto.last_name + ' (' + proto.party + ')';
    bioInfo.state = proto.state;
    bioInfo.website = proto.website;
    bioInfo.phone = proto.phone;
    bioInfo.party = proto.party;
    bioInfo.image = 'https://twitter.com/' + proto.twitter_id + '/profile_image?size=original';
    return bioInfo;
  };

  bio.requestRepos = function (member, callback) {
    $.ajax({
      url: '/sunlight_congress/legislators?fec_ids=' + member,
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        bio.info = buildBio(data.results[0]);
      }
    )
    .done(callback);
  };

  module.bio = bio; // Originally we added a "contributor" property to run the template only once.
})(window);
