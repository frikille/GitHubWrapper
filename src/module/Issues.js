(function (namespace, undefined) {

	var that = {},
		apiUrls = {
			listUserAllIssues : '/issues',
			listUserIssuesOfOwnedAndMemberRepositories : '/user/issues/',
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

	that.listUserAllIssues = function (options) {

	};

	that.listUserIssuesOfOwnedAndMemberRepositories = function (options) {

	};

	that.getIssue = function (options) {

	};

	that.createIssue = function (options) {

	};

	that.editIssue = function (options) {

	};

	that.listAssignees = function (options) {

	};

	that.listCommentsOnIssue = function (options) {

	};

	that.getComment = function (options) {

	};

	that.createComment = function (options) {

	};

	that.editComment = function (options) {

	};

	that.deleteComment = function (options) {

	};

	that.listLabels = function (options) {

	};

	that.createLabel = function (options) {

	};

	that.listLabelsOnIssue = function (options) {

	};

	that.addLabelToIssue = function (options) {

	};

	that.removeLabelFromIssue = function (options) {

	};

	that.replaceLabelsOnIssue = function (options) {

	};

	that.listMilestones = function (options) {

	};

	that.getMilestone = function (options) {

	};

	that.createMilestone = function (options) {

	};

	that.updateMilestone = function (options) {

	};

}(window.GitHubWrapper || (window.GitHubWrapper = {})));