(function (module) {
  bioViews = {};
  bioViews.renderBio = function (bio) {
    var template = Handlebars.compile($('#bioTemplate').html());
    $('#bio-view').append(template(bio.info));
  };

  bioViews.loadBio = function (member, callback) {
    bio.returnBio(member, function (data, message) {
      callback(bio);
    });
  };

  module.bioViews = bioViews;
})(window);
