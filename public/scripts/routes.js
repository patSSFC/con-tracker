// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/', results.compile);
page('/about', voteRepos.about);
page('/politicians/:id', voteRepos.index);
page();
