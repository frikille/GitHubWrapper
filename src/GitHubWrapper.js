/*
*/
var GitHubWrapper = (function() {

	var that = {},
		xhrBaseOptions = {
			githubDomain : 'https://api.github.com',
			contentType : 'application/json'
		};

	var createXHR = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrOnReadyStateChange = function (success, failure) {
		return function () {
			if (this.readyState == 4) {
				if (this.status >= 200 && this.status <= 300 || this.status == 304) {
					success(JSON.parse(this.responseText), this.getAllResponseHeaders());
				} else {
					failure(JSON.parse(this.responseText), this.getAllResponseHeaders(), this.status);
				}
			}	
		}
	};

	var emptyFn = function () {};

	that.getEncodedUserNameAndPassword = function () {
		return Base64.encode('username:password');
	}

	that.callApi = function (options) {
		var xhr = createXHR(),
			method = options.method || 'GET',
			async = true,
			auth = options.auth || null,
			url = xhrBaseOptions.githubDomain + options.apiUrl,
			success = options.success || emptyFn,
			failure = options.failure || emptyFn;

		xhr.open(method, url);

		xhr.onreadystatechange = xhrOnReadyStateChange(success, failure);

		if (options.auth) {
			xhr.setRequestHeader('Authorization', 'Basic ' + this.getEncodedUserNameAndPassword());
		}

		xhr.send();
	};

	return that;
})();