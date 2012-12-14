(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			listNotifications = '/notifications',
			markAsRead = '/notifications'
		},
		apiMethods = {
			listNotifications = 'GET',
			markAsRead = 'PUT'
		};

	namespace.Activity = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));