puffbird.factory('httpErrorHandlerInterceptor', ['$q', '$location', 'notificationService', 
  ($q, $location, notificationService) -> 
    processError = (err) ->
      if (err.status / 100 | 0) == 4 
        notificationService.error 'Not authenticated'
        return $location.path '/'
      msg = err.data.message or err.statusText
      notificationService.error msg
      
    responseError: (serverError) -> 
        processError serverError if serverError?
        $q.reject serverError
])