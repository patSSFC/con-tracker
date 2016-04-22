(function (module) {
  var bio = {};
  var fecID;
  var bioHistory;

  var buildBio = function (proto) { // Takes a legislator object and creates a new legislator object with specific properties.
    var bioInfo = {};
    bioInfo.twitter = 'http://www.twitter.com/' + proto.twitter_id;
    bioInfo.title = proto.title + '. ' + proto.first_name + ' '+ proto.last_name + ' (' + proto.party + ')';
    bioInfo.state = proto.state;
    bioInfo.website = proto.website;
    bioInfo.phone = proto.phone;
    bioInfo.party = proto.party;
    bioInfo.image = buildPic(proto.twitter_id, proto.party);
    bioInfo.contact = [['website', proto.website], ['phone', proto.phone], ['twitter', proto.twitter_id]];
    return bioInfo;
  };

  var buildPic = function(url, party) {
    if (url) {
      return 'https://twitter.com/' + url + '/profile_image?size=original';
    } else if (party === 'D') {
      return 'https://pbs.twimg.com/profile_images/105063456/Model_D_logo_400x400.JPG';
    } else if (party === 'R') {
      return 'https://upload.wikimedia.org/wikipedia/commons/7/78/R_de_color_Rojo.PNG';
    } else {
      return 'http://worldartsme.com/images/green-number-3-clipart-1.jpg';
    }
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

  bio.contributor = Contributor;

  module.bio = bio;
})(window);
