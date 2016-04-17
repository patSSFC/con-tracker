(function (module) {
  bioView = {};
  bioView.renderBio = function (bio) {
    var template = Handlebars.compile($('#bioTemplate').html());
    return template(bio);
  };

  bioView.loadBio = function (member) {
    bio.returnBio(member, function (data, message) {
      console.log(JSON.stringify(data));
      console.log(bio);
    });
  };

  module.bioView = bioView;
})(window);
