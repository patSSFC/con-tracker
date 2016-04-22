console.log('LOADING ROUTES');
page('/', search.show, results.compile);
page('/about', aboutView.index);
page('/politicians/:id', Filing.getFilings, voteRepos.getCRPID, Contributor.getContributors, voteRepos.getBioID, voteRepos.index);
page();
