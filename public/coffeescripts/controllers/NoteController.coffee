puffbird.controller 'NoteController', ['$location', 'NoteResource', 'notificationService', 
  ($location, NoteResource, notificationService) ->
    @.notes = []
    @.stats = {}

    resetStats = ->
      all: 0
      today: 0
      tomorrow: 0
      thisWeek: 0
      thisMonth: 0
      thisYear: 0
      timeless: 0

    @.loadNotes = =>
      @.notes = NoteResource.query().$promise
        .then (notes) =>
          @.notes = notes;
          @.updateStats()

    @.updateStats = =>
      @.stats = resetStats()
      @.stats.all = @.notes.length
      currentDate = new Date()

      for note in @.notes 
        if !note.dueDate
          @.stats.timeless++
        else
          days = currentDate.daysBetween new Date(note.dueDate) 
          if days < 0
            @.stats.past++
          else 
            @.stats.today++ if days == 0
            @.stats.tomorrow++ if days == 1 
            @.stats.thisWeek++ if days < currentDate.daysBetween(currentDate.endOfWeek()) + 1
            @.stats.thisYear++ if days < currentDate.daysBetween(currentDate.endOfYear()) + 1



    @.create = (note) ->
      newNote = new NoteResource note
      newNote.$save ->
        notificationService.success 'Note has been created.'
        $location.path '/notes'

    @.delete = (note) =>
      note.$delete( id: note._id, =>
          notificationService.success 'Note deleted.'
          @.loadNotes()) 

  ]
