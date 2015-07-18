puffbird.factory 'notesService', ['NoteResource', (NoteResource) ->
  notes = []

  loadNotes = ->
    NoteResource.query().$promise
      .then (data) ->
        notes.length = 0
        data.forEach((item) -> notes.push item)

  createNote = (note) ->
    newNote = new NoteResource note
    newNote.$save (note) =>
      notes.push note

  updateNote = (note) ->
    NoteResource.update id: note._id, note

  deleteNote = (note) ->
    note.isDeleted = yes
    note.$delete( id: note._id)

  loadNotes: loadNotes
  deleteNote: deleteNote
  createNote: createNote
  notes: notes
  
  ]
  
