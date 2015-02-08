puffbird.controller 'NotesController', ['NoteResource', 'notificationService',
  (NoteResource, notificationService) ->
    @.showCreateNoteForm = no
    @.format = 'dd-MMM-yyyy'
    @.minDate = '1900-01-01'
    @.maxDate = '2100-01-01'
    @.today = (new Date()).toLocaleDateString('en-US')
    @.endOfWeek = (new Date()).endOfWeek().toLocaleDateString('en-US')
    @.dateOptions = 
      formatYear: 'yy'
      startingDay: 1
      
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

    @.generateReport = (x) =>
      console.log x

    @.toggleAccomplished = (note) ->
      note.accomplished = !note.accomplished
      NoteResource.update id: note._id, note

    @.toggleCreateNoteForm = =>
      @.showCreateNoteForm = !@.showCreateNoteForm

    @.openCalendar = ($event, calendarType) =>
      $event.preventDefault()
      $event.stopPropagation()
      if calendarType is 'from' 
        @.fromCalendarOpened = yes  
      else if calendarType is 'to'
        @.toCalendarOpened = yes
      else if calendarType is 'due'
        @.dueCalendarOpened = yes
  ]
