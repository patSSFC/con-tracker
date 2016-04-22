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

  var verifyProperty = function(contact) { // Is this working?
    contact.forEach(function(ele) {
      if (!ele[1]) {
        $('#' + ele[0]).addClass('hide');
      }
    });
  };

  bioViews.renderBio = function (bio) {
    var template = Handlebars.compile($('#bioTemplate').html());
    $('#bio-view').append(template(bio));
    $('#fullTitle').addClass(partyColor(bio.info.party));
    // verifyProperty(bio.info.contact);
  };




  bioViews.loadBio = function (member, callback) {
    bio.returnBio(member, function (data, message) {
      callback(bio);
    });
  };

  module.bioViews = bioViews;
})(window);
