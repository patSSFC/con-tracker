$('.searchBtn').on('click', function(){
  $('.search-contain').slideUp("slow");
  // var userInput = $('#searchField').val();

});
(function () {
  votingViews.loadVotes('B000574', votingViews.renderVotes);
  bioViews.loadBio('S6OR00110', bioViews.renderBio);
})();
