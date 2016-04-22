console.log('LOADING ROUTES');
page('/', search.show, results.compile);
page('/about', aboutView.index);
page('/politicians/:id', voteRepos.getCRPID, voteRepos.getBioID, voteRepos.index);
page();
