(function(module){
  var aboutView = {};

  aboutView.getSections = function(path, callback){
    $.getJSON(path, function(data){
      if (data.sections){
        aboutView.sections = data.sections;
      }
      callback(aboutView.sections);
    }).error(function(err){
      console.log('There was an error getting about JSON');
      callback(null);
    });
  };

  aboutView.renderData = function(data){
    var ctx = { sections: data };
    var template = (Handlebars.compile($('#aboutTemplate').text()));

    $('#about-view').show().append(template(ctx));
  };

  aboutView.index = function() {
    aboutView.getSections('../data/about.json', aboutView.renderData);
    $('#bio-style').hide();
    $('#voting-view').hide();
  };

  module.aboutView = aboutView;

})(window);
