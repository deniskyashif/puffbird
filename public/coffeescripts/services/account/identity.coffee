puffbird.factory 'identity', ['$window', 'UserResource' ,($window, UserResource) -> 
	user = null

	if $window.bootstrappedUserObject
		user = new UserResource()
		angular.extend user, $window.bootstrappedUserObject

	currentUser: user
	isAuthenticated: -> 
		!!@.currentUser
] 