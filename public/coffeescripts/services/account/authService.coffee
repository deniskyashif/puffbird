puffbird.factory 'authService',
	['$http', '$q', 'identityService', 'UserResource', 
  ($http, $q, identityService, UserResource) ->
    signup: (user) -> 
      $q (resolve, reject) -> 
        newUser = new UserResource user
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
	
