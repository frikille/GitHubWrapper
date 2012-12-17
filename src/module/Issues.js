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
			createComment : '/repos/{0}/{1}/issues/{2}/comments'
			editComment : '/repos/{0}/{1}/issues/comments/{2}',
			deleteComment : '/repos/{0}/{1}/issues/comments/{2}',
			listLabels : '/repos/{0}/{1}/labels',
			createLabel : '/repos/{0}/{1}/labels/',
			listLabelsOnIssue : '/repos/{0}/{1}/issues/{2}/labels',
			addLabelToIssue : '/repos/{0}/{1}/issues/{2}/labels',
			removeLabelFromIssue : '/repos/{0}/{1}/issues/{2}/labels/:name',
			replaceLabelsOnIssue : '/repos/{0}/{1}/issues/{2}/labels'
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

	namespace.Issues = that;

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

		if (!GitHubWrapper.checkAuthParams()) {
			throw new Error('This method requires authorization, but no username and/or password in the options.');
		}

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

		if (!GitHubWrapper.checkAuthParams()) {
			throw new Error('This method requires authorization, but no username and/or password in the options.');
		}

		options.auth == true;

		options.method = apiMethods['listUserIssuesOfOwnedAndMemberRepositories'];
		options.apiUrl = apiUrls['listUserIssuesOfOwnedAndMemberRepositories'];

		GitHubWrapper.callApi(options);
	};
    
    
    that.listIssuesForRepository : function (options) {
        var options = options || {},
            user = option.user,
            repo = options.repo;
            
        if (user === undefined || repo === undefined) {
    		throw new Error('required but missing parameters: [user, repo]');
		}

		options.method = apiMethods['listIssuesForRepository'];
		options.apiUrl = apiUrls['listIssuesForRepository'].format(user, repo);

		GitHubWrapper.callApi(options);
    };

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

}(window.GitHubWrapper || (window.GitHubWrapper = {})));
