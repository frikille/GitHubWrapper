(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			ownRepositories = '/user/repos',
			getRepository = '/repos/{0}/{1}',
			listContributors = '/repos/{0}/{1}/contributors',
			listTags = '/repos/{0}/{1}/tags',
			listBranches = '/repos/{0}/{1}/branches'
		},
		apiMethods = {
			ownRepositories = 'GET',
			getRepository = 'GET',
			listContributors = 'GET',
			listTags = 'GET',
			listBranches = 'GET'
		};

	that.getUserRepositories = function (options) {
		var options = options || {};

		if (!GitHubWrapper.checkAuthParams()) {
			throw new Error('This method requires authorization, but no username and/or password in the options.');
		}

		options.auth == true;

		options.method = apiMethods['ownRepositories'];
		options.apiUrl = apiUrls['ownRepositories'];

		GitHubWrapper.callApi(options);
	};

	that.getRepository = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (repo === undefined || user === undefined) {
			throw new Error('This method requires user and repo, but no user and/or repo in the options.');
		}

		options.method = apiMethods['getRepository'];
		options.apiUrl = apiUrls['getRepository'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

	that.listRepositoryContributors = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (repo === undefined || user === undefined) {
			throw new Error('This method requires user and repo, but no user and/or repo in the options.');
		}

		options.method = apiMethods['listContributors'].format(user, repo);

		GitHubWrapper.callApi(options);

	};

	that.listRepositoryTags = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (repo === undefined || user === undefined) {
			throw new Error('This method requires user and repo, but no user and/or repo in the options.');
		}

		options.method = apiMethods['listTags'].format(user, repo);

		GitHubWrapper.callApi(options);

	};

	that.listRepositoryBranches = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (repo === undefined || user === undefined) {
			throw new Error('This method requires user and repo, but no user and/or repo in the options.');
		}

		options.method = apiMethods['listBranches'];
		options.apiUrl = apiUrls['listBranches'].format(user, repo);

		GitHubWrapper.callApi(options);

	};

	namespace.Repositories = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));