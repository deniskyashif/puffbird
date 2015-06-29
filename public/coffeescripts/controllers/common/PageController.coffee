puffbird.controller 'PageController', ['identityService', 'authService', 'title',
  (identityService, authService, title) -> 
    @.title = title
    @.authService = authService
    @.identityService = identityService
]
