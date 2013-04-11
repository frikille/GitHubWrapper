/**
 * [ description]
 * @param  {[type]} namespace  [description]
 * @param  {[type]} undefined) [description]
 */
(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			listNotifications : '/notifications',
			markAsRead : '/notifications'
		},
		apiMethods = {
			listNotifications : 'GET',
			markAsRead : 'PUT'
		};

	/* Listing user's all notifications
	 * Parameters:
	 * all: Optional boolean true to show notifications marked as read
	 * participating: Optional boolean true to show only notifications in which the user is directly participating or mentioned.
	 * since: Optional time filters out any notifications updated before the given time. 
	 *		The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Example: “2012-10-09T23:39:01Z”.
	 *
	 */
	that.getUserNotifications = function (options) {
		var options = options || {};

		options.auth == true;
		options.method = apiMethods['listNotifications'];
		options.apiUrl = apiUrls['listNotifications'];

		if (!GitHubWrapper.checkAuthParams(options)) {
			throw new Error('This method requires authorization, but no username:password or access_token in the options.');
		}

		GitHubWrapper.callApi(options);

	};

	/*
	 * Marking a notification as “read” removes it from the default view on GitHub.com
	 *
	 * Params: 
	 *  id notification id
	 * 	unread Boolean Changes the unread status of the threads.
	 *  read Boolean inverse of read
	 */
	that.markNotificationAsRead = function (options) {
		var options = options || {};

		options.auth == true;
		options.method = apiMethods['markAsRead'];
		options.apiUrl = apiUrls['markAsRead'];

		if (!GitHubWrapper.checkAuthParams(options)) {
			throw new Error('This method requires authorization, but no username:password or access_token in the options.');
		}

		GitHubWrapper.callApi(options);
	}

	namespace.Activity = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));