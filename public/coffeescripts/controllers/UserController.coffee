puffbird.controller 'UserController', ['$location', 'notificationService', 'authService', 
	($location, notificationService, authService) -> 
		
		@.signup = (user) ->
			authService.signup user 
				.then ->
					notificationService.success 'Registration successful.'
					$location.path '/'

		@.login = (user) ->
			authService.login user 
				.then (success) ->
					if success 
						notificationService.success 'Login successful.' 
						$location.path '/'
					else 
						notificationService.error 'Login error.'

		@.logout = ->
			authService.logout()
				.then ->
					notificationService.success 'Logout successful.'
	]