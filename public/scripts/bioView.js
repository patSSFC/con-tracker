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

  bioViews.renderBio = function () {
    var template = Handlebars.compile($('#bioTemplate').html());
    $('#bio-view').empty();
    $('#bio-view').append(template(bio));
    $('#fullTitle').addClass(partyColor(bio.info.party));
  };

  bioViews.index = function (ctx, next) {
    bioViews.loadBio(ctx.params.id, bioViews.renderBio);
    next();
  };

  bioViews.loadBio = function (member, callback) {
    bio.requestRepos(member, function (data, message) {
      callback(bio);
    });
  };

  module.bioViews = bioViews;
})(window);
