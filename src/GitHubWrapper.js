/**
 * [ description]
 */
var GitHubWrapper = ( function() {

    var that = {},
        xhrBaseOptions = {
            githubDomain : 'https://api.github.com'
        },

        /**
        * [createXHR description]
        * @return {[type]} [description]
        */
        createXHR = function () {
            try {
                return new window.XMLHttpRequest();
            } catch (e) {
            }
        },

        /**
        * [xhrOnReadyStateChange description]
        * @param  {[type]} success       [description]
        * @param  {[type]} failure       [description]
        * @param  {[type]} callbackScope [description]
        * @return {[type]}               [description]
        */
        xhrOnReadyStateChange = function (success, failure, callbackScope) {
            return function () {
                if (this.readyState === 4) {
                    if ((this.status >= 200 && this.status <= 300) || this.status === 304) {
                        success.apply(callbackScope || this, [JSON.parse(this.responseText), this.getAllResponseHeaders(), this.status]);
                    } else {
                        failure.apply(callbackScope || this, [JSON.parse(this.responseText), this.getAllResponseHeaders(), this.status]);
                    }
                }
            };
        },

        /**
        * [emptyFn description]
        * @return {[type]} [description]
        */
        emptyFn = function () {},

        /**
        * [buildParamsAsQueryString description]
        * @param  {[type]} params [description]
        * @return {[type]}        [description]
        */
        buildParamsAsQueryString = function (params) {

            var queryString = [],
                p;

            for (p in params) {
                if (params.hasOwnProperty(p)) {
                    queryString.push(p + "=" + params[p]);
                }
            }

            return (queryString.length == 0) ? '' : "?" + queryString.join('&');
        };

    /**
    * [getEncodedUserNameAndPassword description]
    * @param  {[type]} username [description]
    * @param  {[type]} password [description]
    * @return {[type]}          [description]
    */
    that.getEncodedUserNameAndPassword = function (username, password) {
        return Base64.encode(username + ':' + password);
    };

    /**
    * [callApi description]
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    */
    that.callApi = function (options) {
        var xhr = createXHR(),
            options = options || {},
            method = options.method || 'GET',
            async = true,
            auth = options.auth || null,
            authType = options.authType || 'OAUTH',
            username = options.username,
            password = options.password,
            url = xhrBaseOptions.githubDomain + options.apiUrl,
            success = options.success || emptyFn,
            failure = options.failure || emptyFn,
            callbackScope = options.callbackScope,
            params = options.params || {};

        if (method == 'GET') {
            url += buildParamsAsQueryString(params);
        }

        xhr.open(method, url);

        if (auth) {
            if (authType == 'OAUTH') {
                xhr.setRequestHeader('Authorization', 'token ' + options.accessToken);
            } else {
                xhr.setRequestHeader('Authorization', 'Basic ' + this.getEncodedUserNameAndPassword(username, password));
            }
        }

        xhr.onreadystatechange = xhrOnReadyStateChange(success, failure);

        if (method != 'GET') {
            xhr.send(JSON.stringify(params));
        } else {
            xhr.send();
        }
    };

    /**
    * [checkAuthParams description]
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    */
    that.checkAuthParams = function (options) {
        var authType = options.authType || 'OAUTH';
        
        if (authType == 'OAUTH') {
            if (options.accessToken === undefined) return false;
        } else {
            if (options.username === undefined || options.password === undefined) return false;
        }

        return true;
    };

    return that;
})();