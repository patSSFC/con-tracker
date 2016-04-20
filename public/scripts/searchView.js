(function (module) {
  var results = {};
  var availableTags = [];
  results.all = [];

  var getPoliticId = function (name) {
    var politicId = results.all.rows.filter(function (row) {
      return row.firstname + ' ' + row.lastname === name;
    }).map(function (row) {
      console.log('NAMES:: ' + row.firstname + ' ' + row.lastname + ' :: ' + row.fec_id);
      return row.fec_id;
    });

    console.log(politicId);
  };

  results.requestRepos = function () {
    $.ajax({
      url: '/database/',
      type: 'GET',

      success: function (data, message, xhr) {
        console.log(data);
        console.log(message);
        results.all = data;
        results.compile();
      },

      error: function (data, status) {
        console.log(data);
        console.log(status);
      },
    });
  };

  results.requestRepos();
  results.compile = function () {
    $(results.all.rows).each(function (i) {
      availableTags.push(results.all.rows[i].firstname + ' ' + results.all.rows[i].lastname);
      getPoliticId(results.all.rows[i].firstname + ' ' + results.all.rows[i].lastname);
    });
  };

  $(function () {

    $('#searchField').autocomplete({
        source: availableTags,
      });
    $('.searchBtn').on('click', function () {
      var userInput = $('#searchField').val();
      console.log(userInput);
    });
  });

  module.results = results;
  module.availableTags = availableTags;
})(window);
