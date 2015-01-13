puffbird.controller 'NoteController', ['$location', 'NoteResource', 'notificationService',
  ($location, NoteResource, notificationService) ->
    @.format = 'dd-MMM-yyyy'
    @.minDate = '1900-01-01'
    @.maxDate = '2100-01-01'
    
    @.loadNotes = =>
      @.notes = NoteResource.query().$promise
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

    @.toggleAccomplished = (note) ->
      note.accomplished = !note.accomplished
      NoteResource.update id: note._id, note

    @.openCalendar = ($event, calendarType) =>
      $event.preventDefault()
      $event.stopPropagation()
      if calendarType is 'from' 
        @.fromCalendarOpened = true  
      else if calendarType is 'to'
        @.toCalendarOpened = true
  ]
