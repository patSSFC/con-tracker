// page('/', app.initIndexPage);
console.log('LOADING ROUTES');
page('/about', voteRepos.about);
page('/politician/:id', voteRepos.index);
page();
