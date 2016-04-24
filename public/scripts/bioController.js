(function (module) {
  var bio = {};

  var buildBio = function (proto) { // Takes a legislator object and creates a new legislator object with specific properties.
    var bioInfo = {};
    if (proto){
      bioInfo.twitter = 'http://www.twitter.com/' + (proto.twitter_id === undefined ? '' : proto.twitter_id);
      bioInfo.title = verify(proto.title) + '. ' + verify(proto.first_name) + ' '+ verify(proto.last_name) + ' (' + verify(proto.party) + ')';
      bioInfo.state = verify(proto.state);
      bioInfo.website = verify(proto.website);
      bioInfo.phone = verify(proto.phone);
      bioInfo.party = verify(proto.party);
      bioInfo.image = buildImage(verify(proto.twitter_id), verify(proto.party));
      return bioInfo;
    } else {
      // handle error here
    }


  };

  var verify = function(str) {
    if (str) {
      return str;
    } else {
      return '';
    }
  };

  var buildImage = function(twitter, party) {
    if (twitter) {
      return 'https://twitter.com/' + twitter + '/profile_image?size=original';
    } else if (party === 'D') {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/68/Blue_square_D.PNG';
    } else if (party === 'R') {
      return 'http://cf.mp-cdn.net/98/04/2447b67f82daa1ac749162954f08.jpg';
    } else {
      return 'http://my.mastersindigitalmarketing.org/dianamaria/wp-content/uploads/sites/1243/2015/10/3.png';
    }
  };

  bio.requestRepos = function (member, callback) {
    $.ajax({
      url: '/sunlight_congress/legislators?crp_id=' + member + '&all_legislators=true',
      method: 'GET',
    }).success(
      function (data, message, xhr) {
        bio.info = buildBio(data.results[0]);
      }
    )
    .done(callback);
  };

  module.bio = bio;
})(window);
