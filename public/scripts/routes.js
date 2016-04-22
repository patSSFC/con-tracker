console.log('LOADING ROUTES');
page('/about', aboutView.index);
page('/', search.show, results.compile);
page('/politicians/:id', voteRepos.getCRPID, voteRepos.getBioID, voteRepos.index);
page();
