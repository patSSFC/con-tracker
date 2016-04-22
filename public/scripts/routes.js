// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/', results.compile);
page('/about', voteRepos.about);
page('/politicians/:id', Filing.getFilings, voteRepos.getCRPID, Contributor.getContributors, voteRepos.getBioID, voteRepos.index);
// page('/politicians/:id', Filing.getFilings);
page();
