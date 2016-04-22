// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/', results.compile);
page('/about', aboutView.index);
page('/politicians/:id', voteRepos.getCRPID, voteRepos.getBioID, voteRepos.index);
page();
