/**
 * [ description]
 * @param  {[type]} namespace               [description]
 * @param  {[type]} undefined)              [description]
 */
(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			getSingleUser : '/users/:user',
			getAuthenticatedUser : '/user',
			updateAuthenticatedUser : '/user'
		},
		apiMethods = {
			getSingleUser : 'GET',
			getAuthenticatedUser : 'GET',
			updateAuthenticatedUser : 'PATCH'
		};

	/**
	 * [getAuthenticatedUserData description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	that.getAuthenticatedUserData = function (options) {
		var options = options || {};

		options.auth == true;

		options.method = apiMethods['getAuthenticatedUser'];
		options.apiUrl = apiUrls['getAuthenticatedUser'];

		GitHubWrapper.callApi(options);
	};

	/**
	 * [updateAuthenticatedUser description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	that.updateAuthenticatedUser = function (options) {
		var options = options || {};

		options.auth == true;

		options.method = apiMethods['updateAuthenticatedUser'];
		options.apiUrl = apiUrls['updateAuthenticatedUser'];

		GitHubWrapper.callApi(options);
	}

	namespace.Users = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));