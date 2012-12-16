(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			getSingleUser = '/users/:user',
			getAuthenticatedUser = '/user',
			updateAuthenticatedUser = '/user'
		},
		apiMethods = {
			getSingleUser = 'GET',
			getAuthenticatedUser = 'GET',
			updateAuthenticatedUser = 'PATCH'
		};

	that.getAuthenticatedUserData = function (options) {
		var options = options || {};

		if (!GitHubWrapper.checkAuthParams()) {
			throw new Error('This method requires authorization, but no username and/or password in the options.');
		}

		options.auth == true;

		options.method = apiMethods['getAuthenticatedUser'];
		options.apiUrl = apiUrls['getAuthenticatedUser'];

		GitHubWrapper.callApi(options);
	};

	that.updateAuthenticatedUser = function (options) {
		var options = options || {};

		if (!GitHubWrapper.checkAuthParams()) {
			throw new Error('This method requires authorization, but no username and/or password in the options.');
		}

		options.auth == true;

		options.method = apiMethods['updateAuthenticatedUser'];
		options.apiUrl = apiUrls['updateAuthenticatedUser'];

		GitHubWrapper.callApi(options);
	}

	namespace.Users = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));