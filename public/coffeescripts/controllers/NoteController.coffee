puffbird.controller 'NoteController', ['$location', 'NoteResource', 'notificationService', 
  ($location, NoteResource, notificationService) ->
    @.notes = []

    @.loadNotes = =>
      @.notes = NoteResource.query()
        .$promise
        .then (notes) =>
          @.notes = notes;

    @.create = (note) ->
      newNote = new NoteResource note
      newNote.$save ->
        notificationService.success 'Note has been created.'
        $location.path '/notes'

    @.delete = (note) =>
      note.$delete( id: note._id, =>
          notificationService.success 'Note deleted.'
          @.loadNotes()
          ) 
  ]