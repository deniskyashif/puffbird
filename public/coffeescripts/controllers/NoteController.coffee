puffbird.controller 'NoteController', ['$location', 'NoteResource', 'notificationService', 
  ($location, NoteResource, notificationService) ->
    @.notes = NoteResource.query()
      .$promise
      .then (notes) =>
        console.log notes
        @.notes = notes;

    @.create = (note) ->
      newNote = new NoteResource note
      newNote.$save ->
        notificationService.success 'Note has been created.'
        $location.path '/notes'
  ]