puffbird.controller 'NotesController', ['NoteResource', 'notificationService',
  (NoteResource, notificationService) ->
    @.format = 'dd-MMM-yyyy'
    @.minDate = '1900-01-01'
    @.maxDate = '2100-01-01'
    @.showCreateNoteForm = no
    
    @.loadNotes = =>
      @.notes = NoteResource.query().$promise
        .then (notes) =>
          @.notes = notes;

    @.create = (note, form) =>
      if form.$invalid
        return notificationService.error 'Please fill the required fields.'
      newNote = new NoteResource note
      newNote.$save (note) =>
        notificationService.success 'Note has been created.'
        @.toggleCreateNoteForm()
        @.notes.push note

    @.clear = (form) ->
      form.$setPristine()
 
    @.delete = (note) =>
      note.isDeleted = true
      note.$delete( id: note._id, =>  
        notificationService.success 'Note deleted.'
      ) 

    @.toggleAccomplished = (note) ->
      note.accomplished = !note.accomplished
      NoteResource.update id: note._id, note

    @.toggleCreateNoteForm = =>
      @.showCreateNoteForm = !@.showCreateNoteForm

    @.openCalendar = ($event, calendarType) =>
      $event.preventDefault()
      $event.stopPropagation()
      if calendarType is 'from' 
        @.fromCalendarOpened = true  
      else if calendarType is 'to'
        @.toCalendarOpened = true
      else if calendarType is 'due'
        @.dueCalendarOpened = true
  ]
