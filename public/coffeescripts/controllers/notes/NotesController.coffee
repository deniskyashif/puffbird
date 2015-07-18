puffbird.controller 'NotesController',
  ['$window', 'notesService', 'NoteResource', 'reportService', 'notificationService', 'ngDialog',
  ($window, notesService, NoteResource, reportService, notificationService, ngDialog) ->
    @.notes = notesService.notes
    @.format = 'dd-MMM-yyyy'
    @.minDate = '1900-01-01'
    @.maxDate = '2100-01-01'
    @.today = (new Date()).toLocaleDateString('en-US')
    @.endOfWeek = (new Date()).endOfWeek().toLocaleDateString('en-US')
    @.dateOptions = 
      formatYear: 'yy'
      startingDay: 1
      
    @.loadNotes = =>
      notesService.loadNotes()

    @.create = (note) =>
      notesService.createNote(note)
 
    @.delete = (note) ->
      notesService.deleteNote(note)

    @.generateReport = (notes) ->
      reportService.create(notes)
        .then (response) ->
          $window.open response.data
          
    @.toggleAccomplished = (note) ->
      note.accomplished = !note.accomplished
      notesService.updateNote note

    @.openCalendar = ($event, calendarType) =>
      $event.preventDefault()
      $event.stopPropagation()
      if calendarType is 'from' 
        @.fromCalendarOpened = yes  
      else if calendarType is 'to'
        @.toCalendarOpened = yes
      else if calendarType is 'due'
        @.dueCalendarOpened = yes

    @.openDialog = =>
      ngDialog.open({
        template: '../../../views/directives/createNote.html',
        className: 'ngdialog-theme-default'
      })
  ]
