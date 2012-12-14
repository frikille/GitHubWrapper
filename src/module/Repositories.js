(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			ownRepositories = '/user/repos',
			getRepository = '/repos/:owner/:repo',
			listContributors = '/repos/:owner/:repo/contributors',
			listTags = '/repos/:owner/:repo/tags',
			listBranches = '/repos/:owner/:repo/branches'
		},
		apiMethods = {
			ownRepositories = 'GET',
			getRepository = 'GET',
			listContributors = 'GET',
			listTags = 'GET',
			listBranches = 'GET'
		};

	namespace.Repositories = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));