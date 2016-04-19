// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/about', voteRepos.about);
page('/politicians/:id', voteRepos.index);
page();
