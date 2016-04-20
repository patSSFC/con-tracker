(function (module) {
  bioViews = {};

  var partyColor = function (party) {
    if (party === 'D') {
      return 'democrat';
    } else if (party === 'R') {
      return 'republican';
    } else {
      return 'other';
    }
  };


  bioViews.renderBio = function (bio) {
    var template = Handlebars.compile($('#bioTemplate').html());
    $('#bio-view').append(template(bio.info));
    $('#bio-view').addClass(partyColor(bio.info.party));
  };



  bioViews.loadBio = function (member, callback) {
    bio.returnBio(member, function (data, message) {
      callback(bio);
    });
  };

  module.bioViews = bioViews;
})(window);
