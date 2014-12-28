puffbird.factory('httpErrorHandlerInterceptor', ['$q', 'notificationService',  ($q, notificationService) -> 
  processError = (err) ->
    notificationService.error err.message if err.message              

  responseError: (serverError) -> 
      processError serverError.data if serverError.data
      $q.reject serverError
])