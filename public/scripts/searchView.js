(function (module) {
  var results = {};
  var search = {};
  var availableTags = [];
  results.all = [];

  var getFecId = function (name) {
    var fecId = results.all.rows.filter(function (row) {
      return row.firstname + ' ' + row.lastname === name;
    }).map(function (row) {
      return row.fec_id;
    });

    return fecId;
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
      getFecId(results.all.rows[i].firstname + ' ' + results.all.rows[i].lastname);

    });
  };

  $(function () {

    $('#searchField').autocomplete({
      source: availableTags,
    });
    $('.searchBtn').on('click', function (a) {
      a.preventDefault();
      var userInput = $('#searchField').val();
      var fecid = getFecId(userInput) || '';
      page('/politicians/' + fecid[0]);

    });
  });
  search.show = function (ctx, next) {
    $('#about-view').hide();
    $('#mainSearch').append($('.search-contain'));
    $('.search-section').css('height', '700px', 'padding', '45px');
    next();
  };
  module.search = search;
  module.results = results;
  module.availableTags = availableTags;
})(window);
