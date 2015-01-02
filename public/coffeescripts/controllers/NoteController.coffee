puffbird.controller 'NoteController', ['$location', 'NoteResource', 'notificationService', 
  ($location, NoteResource, notificationService) ->
    @.notes = []
    @.stats = {}

    @.loadNotes = =>
      @.notes = NoteResource.query().$promise
        .then (notes) =>
          @.notes = notes;
          @.stats = calculateStats(notes)

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
      NoteResource.update note

    calculateStats = (notes) =>
      stats = 
        all: notes.length
        today: 0
        tomorrow: 0
        thisWeek: 0
        thisMonth: 0
        thisYear: 0
        timeless: 0
        past: 0

      currentDate = new Date()

      for note in notes 
        if !note.dueDate
          ++stats.timeless
        else
          days = currentDate.daysBetween new Date(note.dueDate) 
          if days < 0
            ++stats.past
          else 
            ++stats.today if days == 0
            ++stats.tomorrow if days == 1 
            ++stats.thisWeek if days < currentDate.daysBetween(currentDate.endOfWeek()) + 1
            ++stats.thisMonth if days < currentDate.daysBetween(currentDate.endOfMonth()) + 1
            ++stats.thisYear if days < currentDate.daysBetween(currentDate.endOfYear()) + 1
      stats
  ]
