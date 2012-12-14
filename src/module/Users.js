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

	that.getAuthenticatedUserData = function () {
	}

	namespace.Users = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));