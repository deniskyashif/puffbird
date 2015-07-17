puffbird.controller 'FeedbackController', ['$location', 'FeedbackResource', 'notificationService', 
  ($location, FeedbackResource, notificationService) ->
    @.create = (feedback, form) ->
      if form.$invalid
        return notificationService.error 'Please fill out the required fields.'
      newFeedback = new FeedbackResource feedback
      newFeedback.$save (feedback) ->
        notificationService.success 'Your feedback has been sent.'
        $location.path '/'
]
