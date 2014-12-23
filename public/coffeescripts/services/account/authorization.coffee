puffbird.factory 'authorization', ['$http', '$q', 'identity', 'UserResource', 
	($http, $q, identity, UserResource) ->
		signup: (user) -> 
			$q (resolve, reject) -> 
				new UserResource user
					.$save()
					.then ->
						identity.currentUser = user
						resolve user, 
						(response) -> 
							reject response
		login: (user) ->
			$q (resolve, reject) -> 
				$http.post '/login', user 
					.$promise
					.then (response) -> 
						if response.success
					        user = new UserResource()
							angular.extend user, response.user 
							identity.currentUser = user 
							resolve true
						resolve false
		logout: ->
			$q (resolve, reject) -> 
				$http.post '/logout' 
					.$promise
					.then -> 
						delete identity.currentUser
						resolve()
		isAuthenticated: ->
			identity.isAuthenticated()
	]