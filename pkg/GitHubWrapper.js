/*The MIT License
*
* Copyright (c) 2012 Flowy Ltd. (Peter Balazs)
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
/* VERSION: 0.2.0.8*/

/**
 * [ description]
 */
var GitHubWrapper = ( function() {

    var that = {},
        authType,
        accessToken,
        encodedUserNameAndPassword,
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

    that.init = function (config) {
        if (config.authType == 'BASIC' || config.authType == 'OAUTH') {
            authType = config.authType;
        } else {
            authType = 'NONE';
        }

        if (authType == 'OAUTH') {
            accessToken = config.accessToken;
        }

        if (authType == 'BASIC') {
            encodedUserNameAndPassword = getEncodedUserNameAndPassword(config.username, config.password);
        }
    }

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
            // authType = options.authType || 'OAUTH',
            // username = options.username,
            // password = options.password,
            url = options.url || xhrBaseOptions.githubDomain + options.apiUrl,
            success = options.success || emptyFn,
            failure = options.failure || emptyFn,
            callbackScope = options.callbackScope,
            params = options.params || {};

        if (method == 'GET') {
            url += buildParamsAsQueryString(params);
        }

        xhr.open(method, url);

        if (auth && authType == 'NONE') {
            throw new Error('The method [' + url + '] requires authentication but no authentication credentials were set!');
        }

        if (authType == 'OAUTH') {
            xhr.setRequestHeader('Authorization', 'token ' + accessToken);
        }

        if (authType == 'BASIC') {
            xhr.setRequestHeader('Authorization', 'Basic ' + encodedUserNameAndPassword);
        }

        xhr.onreadystatechange = xhrOnReadyStateChange(success, failure, callbackScope);

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

		GitHubWrapper.callApi(options);
	}

	namespace.Activity = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));
/**
 * [ description]
 * @param  {[type]} namespace [description]
 * @param  {[type]} undefined [description]
 * @return {[type]}           [description]
 */
(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			listUserAllIssues : '/issues',
			listUserIssuesOfOwnedAndMemberRepositories : '/user/issues/',
            listIssuesForRepository : '/repos/{0}/{1}/issues',
			getIssue : '/repos/{0}/{1}/issues/{2}',
			createIssue : '/repos/{0}/{1}/issues',
			editIssue : '/repos/{0}/{1}/issues/{2}',
			listAssignees : '/repos/{0}/{1}/assignees',
			listCommentsOnIssue : '/repos/{0}/{1}/issues/{2}/comments',
			getComment : '/repos/{0}/{1}/issues/comments/{2}',
			createComment : '/repos/{0}/{1}/issues/{2}/comments',
			editComment : '/repos/{0}/{1}/issues/comments/{2}',
			deleteComment : '/repos/{0}/{1}/issues/comments/{2}',
			listLabels : '/repos/{0}/{1}/labels',
			createLabel : '/repos/{0}/{1}/labels/',
			listLabelsOnIssue : '/repos/{0}/{1}/issues/{2}/labels',
			addLabelToIssue : '/repos/{0}/{1}/issues/{2}/labels',
			removeLabelFromIssue : '/repos/{0}/{1}/issues/{2}/labels/:name',
			replaceLabelsOnIssue : '/repos/{0}/{1}/issues/{2}/labels',
			listMilestones : '/repos/{0}/{1}/milestones',
			getMilestone : '/repos/{0}/{1}/milestones/{2}',
			createMilestone : '/repos/{0}/{1}/milestones',
			updateMilestone : '/repos/{0}/{1}/milestones/{2}'
		},
		apiMethods = {
			listUserAllIssues : 'GET',
			listUserIssuesOfOwnedAndMemberRepositories : 'GET',
            listIssuesForRepository : 'GET',
			getIssue : 'GET',
			createIssue : 'POST',
			editIssue : 'PATCH',
			listAssignees : 'GET',
			listCommentsOnIssue : 'GET',
			getComment : 'GET',
			createComment : 'POST',
			editComment : 'PATCH',
			deleteComment : 'DELETE',
			listLabels : 'GET',
			createLabel : 'POST',
			listLabelsOnIssue : 'GET',
			addLabelToIssue : 'POST',
			removeLabelFromIssue : 'DELETE',
			replaceLabelsOnIssue : 'PUT',
			listMilestones : 'GET',
			getMilestone : 'GET',
			createMilestone : 'POST',
			updateMilestone : 'PATCH'
		};

	/*
	* Returns all issues of the current user.
	* 
	* Authorization required!
    *
    * Example options config object:
    * {
    *   username : 'username',
    *   password : 'password',
    *   success : function(responseText, responseHeaders, status) {
    *       //callback function on success
    *    },
    *   failure : function(responseText, responseHeaders, status) {
    *       //callback function on failure
    *    },
    *   params : {
    *       filter : 'all', //availaible values: assigned, created, mentioned, subscribed, all
    *       state : 'open, //available values: open, closed
    *       labels : 'label1,label2',
    *       sort: 'created', //available values: created, updated, comments
    *       direction : 'ASC', //available values: ASC, DESC
    *       since : 'YYYY-MM-DDTHH:MM:SSZ' //ISO-8601 format
    *   }
    * }
	* 
	*/
	that.listUserAllIssues = function (options) {
		var options = options || {};

		options.auth == true;

		options.method = apiMethods['listUserAllIssues'];
		options.apiUrl = apiUrls['listUserAllIssues'];

		GitHubWrapper.callApi(options);
	};

    /*
    * Returns all issues of the current user.
	* 
	* Authorization required!
    *
    * Example options config object:
    * {
    *   username : 'username',
    *   password : 'password',
    *   success : function(responseText, responseHeaders, status) {
    *       //callback function on success
    *    },
    *   failure : function(responseText, responseHeaders, status) {
    *       //callback function on failure
    *    },
    *   params : {
    *       filter : 'all', //availaible values: assigned, created, mentioned, subscribed, all
    *       state : 'open, //available values: open, closed
    *       labels : 'label1,label2',
    *       sort: 'created', //available values: created, updated, comments
    *       direction : 'ASC', //available values: ASC, DESC
    *       since : 'YYYY-MM-DDTHH:MM:SSZ' //ISO-8601 format
    *   }
    * }
	* 
	*/
	that.listUserIssuesOfOwnedAndMemberRepositories = function (options) {
		var options = options || {};

		options.auth == true;

		options.method = apiMethods['listUserIssuesOfOwnedAndMemberRepositories'];
		options.apiUrl = apiUrls['listUserIssuesOfOwnedAndMemberRepositories'];

		GitHubWrapper.callApi(options);
	};
    
    /**
     * [listIssuesForRepository description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    that.listIssuesForRepository = function (options) {
        var options = options || {},
            user = options.user,
            repo = options.repo;
            
        if (user === undefined || repo === undefined) {
    		throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['listIssuesForRepository'];
		options.apiUrl = apiUrls['listIssuesForRepository'].format(user, repo);

		GitHubWrapper.callApi(options);
    };

    /**
     * [getIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.getIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['getIssue'];
		options.apiUrl = apiUrls['getIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [createIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.createIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['createIssue'];
		options.apiUrl = apiUrls['createIssue'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [editIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.editIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['editIssue'];
		options.apiUrl = apiUrls['editIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [listAssignees description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.listAssignees = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['listAssignees'];
		options.apiUrl = apiUrls['listAssignees'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [listCommentsOnIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.listCommentsOnIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['listCommentsOnIssue'];
		options.apiUrl = apiUrls['listCommentsOnIssue'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [getComment description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.getComment = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			commentId = options.commentId;

		if (user === undefined || repo === undefined || commentId === undefined) {
			throw new Error('required but missing parameters: [user, repo, commentId]');
		}

		options.method = apiMethods['getComment'];
		options.apiUrl = apiUrls['getComment'].format(user, repo, commentId);

		GitHubWrapper.callApi(options);
	};

    /**
     * [createComment description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.createComment = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['createComment'];
		options.apiUrl = apiUrls['createComment'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [editComment description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.editComment = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			commentId = options.commentId;

		if (user === undefined || repo === undefined || commentId === undefined) {
			throw new Error('required but missing parameters: [user, repo, commentId]');
		}

		options.method = apiMethods['editComment'];
		options.apiUrl = apiUrls['editComment'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [deleteComment description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.deleteComment = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			commentId = options.commentId;

		if (user === undefined || repo === undefined || commentId === undefined) {
			throw new Error('required but missing parameters: [user, repo, commentId]');
		}

		options.method = apiMethods['deleteComment'];
		options.apiUrl = apiUrls['deleteComment'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [listLabels description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.listLabels = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['listLabels'];
		options.apiUrl = apiUrls['listLabels'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [createLabel description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.createLabel = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['createLabel'];
		options.apiUrl = apiUrls['createLabel'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [listLabelsOnIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.listLabelsOnIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['listLabelsOnIssue'];
		options.apiUrl = apiUrls['listLabelsOnIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [addLabelToIssue description]
     * @param {[type]} options [description]
     */
	that.addLabelToIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['addLabelToIssue'];
		options.apiUrl = apiUrls['addLabelToIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [removeLabelFromIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.removeLabelFromIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['removeLabelFromIssue'];
		options.apiUrl = apiUrls['removeLabelFromIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [replaceLabelsOnIssue description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.replaceLabelsOnIssue = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			issueNumber = options.issueNumber;

		if (user === undefined || repo === undefined || issueNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, issueNumber]');
		}

		options.method = apiMethods['replaceLabelsOnIssue'];
		options.apiUrl = apiUrls['replaceLabelsOnIssue'].format(user, repo, issueNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [listMilestones description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.listMilestones = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['listMilestones'];
		options.apiUrl = apiUrls['listMilestones'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [getMilestone description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.getMilestone = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			milestoneNumber = options.milestoneNumber;

		if (user === undefined || repo === undefined || milestoneNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, milestoneNumber]');
		}

		options.method = apiMethods['getMilestone'];
		options.apiUrl = apiUrls['getMilestone'].format(user, repo, milestoneNumber);

		GitHubWrapper.callApi(options);
	};

    /**
     * [createMilestone description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.createMilestone = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo;

		if (user === undefined || repo === undefined) {
			throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['createMilestone'];
		options.apiUrl = apiUrls['createMilestone'].format(user, repo);

		GitHubWrapper.callApi(options);
	};

    /**
     * [updateMilestone description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
	that.updateMilestone = function (options) {
		var options = options || {},
			user = options.user,
			repo = options.repo,
			milestoneNumber = options.milestoneNumber;

		if (user === undefined || repo === undefined || milestoneNumber === undefined) {
			throw new Error('required but missing parameters: [user, repo, milestoneNumber]');
		}

		options.method = apiMethods['updateMilestone'];
		options.apiUrl = apiUrls['updateMilestone'].format(user, repo, milestoneNumber);

		GitHubWrapper.callApi(options);
	};

	namespace.Issues = that;

}(window.GitHubWrapper || (window.GitHubWrapper = {})));

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
Base64 = { //http://www.webtoolkit.info/javascript-base64.html
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = Base64._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	    }

	    return output;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	}		

}
String.prototype.format = function () {
	var str = this,
		args = arguments;
	return str.replace(String.prototype.format.regex, function(item) {
		var intVal = parseInt(item.substring(1, item.length - 1)),
			replace;
		if (intVal >= 0) {
			replace = args[intVal];
		} else if (intVal === -1) {
			replace = "{";
		} else if (intVal === -2) {
			replace = "}";
		} else {
			replace = "";
		}
		return replace;
	});
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
