(function (module) {
  bioViews = {};
  bioViews.renderBio = function (bio) {
    var template = Handlebars.compile($('#bioTemplate').html());
    return template(bio);
  };

  bioViews.loadBio = function (member) {
    bio.returnBio(member, function (data, message) {
      console.log(JSON.stringify(data));
      console.log(bio);
    });
  };

  module.bioViews = bioViews;
})(window);
