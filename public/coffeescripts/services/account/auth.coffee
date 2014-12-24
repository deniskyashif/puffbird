puffbird.factory 'auth', ['$http', '$q', 'identity', 'UserResource', 
	($http, $q, identity, UserResource) ->
		signup: (user) -> 
			$q (resolve, reject) -> 
				newUser = new UserResource user
				newUser.$save()
					.then ->
						identity.currentUser = user
						resolve user
					,(err) ->
						reject err
		login: (user) ->
			$q (resolve, reject) -> 
				$http.post '/login', user 
					.success (response) -> 
						if response.success
					        user = new UserResource() 
					        angular.extend user, response.user  
					        identity.currentUser = user  
					        resolve true
						else 
							resolve false
		logout: ->
			$q (resolve, reject) -> 
				$http.post '/logout' 
					.then -> 
						delete identity.currentUser
						resolve()
		isAuthenticated: ->
			identity.isAuthenticated()
	]