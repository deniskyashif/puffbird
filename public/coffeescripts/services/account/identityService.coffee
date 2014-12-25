puffbird.factory 'identityService', ['$window', 'userResource', ($window, userResource) -> 
	user = null

	if $window.bootstrappedUserObject
		user = new userResource()
		angular.extend user, $window.bootstrappedUserObject

	currentUser: user
	isAuthenticated: -> 
		!!@.currentUser
] 