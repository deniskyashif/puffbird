puffbird.controller 'UsersController',
  ['$location', 'UserResource', 'identityService', 'notificationService', 
  ($location, UserResource, identityService, notificationService) -> 
    @.currentUser = identityService.getCurrentUser()

    @.save = =>
      UserResource.update(id: @.currentUser._id, @.currentUser)
      identityService.setCurrentUser @.currentUser
      notificationService.success 'Update successful.'
      $location.path '/home'
  ]
