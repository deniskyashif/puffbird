puffbird.factory('httpErrorHandlerInterceptor',
  ['$q', '$location', 'identityService', 'notificationService',
  ($q, $location, identityService, notificationService) -> 
    processError = (err) ->
      if (err.status / 100 | 0) == 4 
        notificationService.error 'Not authenticated'
        identityService.setCurrentUser null
        return $location.path '/'
      msg = err.data.message or err.statusText
      notificationService.error msg
      
    responseError: (serverError) -> 
        processError serverError if serverError?
        $q.reject serverError
])
