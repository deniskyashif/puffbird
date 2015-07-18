puffbird.controller 'AccountController',
  ['$location', 'notificationService', 'authService', 'identityService',
  ($location, notificationService, authService, identityService) -> 
    
    @.identityService = identityService

    @.signup = (user) ->
      authService.signup user 
        .then ->
          notificationService.success 'Registration successful.'
          $location.path '/'
        ,(err) ->
          console.log err
          notificationService.error err.message

    @.login = (user) ->
      authService.login user 
        .then (success) ->
          if success 
            notificationService.success 'Login successful.' 
            $location.path '/notes'
          else 
            notificationService.error 'Could not login.'

    @.logout = ->
      authService.logout()
        .then ->
          notificationService.success 'Logout successful.'
          $location.path '/home'

    @.getCurrentUserAlias = ->
      currentUser = identityService.getCurrentUser()
      if currentUser
        if currentUser.firstName or currentUser.lastName
          alias = currentUser.firstName + ' ' + currentUser.lastName
        else
          alias = currentUser.username
      alias
  ]
