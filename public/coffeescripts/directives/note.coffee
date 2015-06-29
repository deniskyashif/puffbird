puffbird.directive 'note', ['NoteResource', 'notificationService', 
  (NoteResource, notificationService) ->
    restrict: 'AE'
    scope: 
      note: '='
    link: (scope, element, attrs) ->
      scope.delete = (note) ->
        note.isDeleted = yes
        note.$delete( id: note._id, ->  
          notificationService.success 'Note deleted.'
        ) 
      scope.toggleAccomplished = (note) ->
        note.accomplished = !note.accomplished
        NoteResource.update id: note._id, note
    templateUrl: 'views/directives/note.html'
]
