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
    $('#bio-view').append(template(bio));
    $('#fullTitle').addClass(partyColor(bio.info.party));
  };


  bioViews.loadBio = function (member, callback) {
    bio.returnBio(member, function (data, message) {
      callback(bio);
    });
  };

  bioViews.index = function (ctx, next) {
    bioViews.loadBio(ctx.params.id, bioViews.renderBio);
    next();
  };

  module.bioViews = bioViews;
})(window);
