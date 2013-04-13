/**
 * [ description]
 * @param  {[type]} namespace        [description]
 * @param  {[type]} undefined)       [description]
 */
(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			ownRepositories : '/user/repos',
			getRepository : '/repos/{0}/{1}',
			listContributors : '/repos/{0}/{1}/contributors',
			listTags : '/repos/{0}/{1}/tags',
			listBranches : '/repos/{0}/{1}/branches'
		},
		apiMethods = {
			ownRepositories : 'GET',
			getRepository : 'GET',
			listContributors : 'GET',
			listTags : 'GET',
			listBranches : 'GET'
		};

	/**
	 * [getUserRepositories description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	that.getUserRepositories = function (options) {
		var options = options || {};

		options.auth == true;

		options.method = apiMethods['ownRepositories'];
		options.apiUrl = apiUrls['ownRepositories'];

		GitHubWrapper.callApi(options);
	};

	/**
	 * [getRepository description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
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

	/**
	 * [listRepositoryContributors description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
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

	/**
	 * [listRepositoryTags description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
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

	/**
	 * [listRepositoryBranches description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
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