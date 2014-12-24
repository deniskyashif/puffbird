puffbird.controller 'UserController', ['$location', 'notifier', 'identity', 'auth', 
	($location, notifier, identity, auth) -> 
		@.identity = identity

		@.signup = (user) ->
			auth.signup user 
				.then ->
					notifier.success 'Registration successful.'
					$location.path '/'

		@.login = (user) ->
			auth.login user 
				.then (success) ->
					if success 
						notifier.success 'Login successful.' 
						$location.path '/'
					else 
						notifier.error 'Login error.'

		@.logout = ->
			auth.logout()
				.then ->
					notifier.success 'Logout successful.'
	]