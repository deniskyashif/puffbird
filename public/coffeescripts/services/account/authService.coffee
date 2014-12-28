puffbird.factory 'authService', ['$http', '$q', 'identityService', 'userResource', 
	($http, $q, identityService, userResource) ->
		signup: (user) -> 
			$q (resolve, reject) -> 
				newUser = new userResource user
				newUser.$save()
					.then ->
						resolve user
					,(err) ->
						reject err
		login: (user) ->
			$q (resolve, reject) -> 
				$http.post '/login', user 
					.success (response) -> 
						if response.success
			        identityService.setCurrentUser response.user  
			        resolve true
						else 
							resolve false
		logout: ->
			$q (resolve, reject) -> 
				$http.post '/logout' 
					.then -> 
						identityService.setCurrentUser null
						resolve()
		isAuthenticated: ->
			identityService.isAuthenticated()
	]