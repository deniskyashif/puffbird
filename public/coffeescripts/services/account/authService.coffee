puffbird.factory 'authService', ['$http', '$q', 'identityService', 'userResource', 
	($http, $q, identityService, userResource) ->
		signup: (user) -> 
			$q (resolve, reject) -> 
				newUser = new userResource user
				newUser.$save()
					.then ->
						identityService.currentUser = user
						resolve user
					,(err) ->
						reject err
		login: (user) ->
			$q (resolve, reject) -> 
				$http.post '/login', user 
					.success (response) -> 
						if response.success
					        user = new userResource() 
					        angular.extend user, response.user  
					        identityService.currentUser = user  
					        resolve true
						else 
							resolve false
		logout: ->
			$q (resolve, reject) -> 
				$http.post '/logout' 
					.then -> 
						delete identityService.currentUser
						resolve()
		isAuthenticated: ->
			identityService.isAuthenticated()
	]