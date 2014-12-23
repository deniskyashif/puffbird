puffbird.controller 'UserController', ['$location', 'notifier', 'identity', 'authorization', 
	($location, notifier, identity, authorization) -> 
		@.identity = identity

		@.signup = (user) ->
			authorization.signup user 
				.then ->
					notifier.success 'Registration successful'
					$location.path '/'

		@.login = (user) ->
			authorization.login user 
				.then (success) ->
					if notifier.success 'Login successful'
					else notifier.error 'Login error'

		@.logout = ->
			authorization.logout
				.then ->
					notifier.success 'Logout successful'
	]