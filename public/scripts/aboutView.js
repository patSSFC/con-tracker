(function(module){
  var about = {};

  aboutView.getSections = function(path, callback){
    $.getJSON(path, function(data){
      if (data.sections){
        about.sections = data.sections;
      }
      callback(about.sections);
    }).error(function(err){
      console.log('There was an error getting about JSON');
      callback(null);
    });
  };

  aboutView.renderData = function(data){
    var ctx = { sections: data };
    var template = (Handlebars.compile$('#aboutTemplate').text());

    $('#about-view').empty().append(template(ctx));
  };

  aboutView.index = function() {
    about.getSections(about.renderData);
  };

  module.aboutView = aboutView;

})(window);
