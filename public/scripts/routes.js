// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/', results.compile);
page('/about', aboutView.about);
page('/politicians/:id', voteRepos.getCRPID, voteRepos.getBioID, voteRepos.index);
page();
