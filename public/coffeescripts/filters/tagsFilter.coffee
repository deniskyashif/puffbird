puffbird.filter 'tagsFilter', [ ->
  (notes, tags) ->  
    filtered = []
    
    # if the notes are loaded
    if notes? and notes.length > 0 and tags? and tags.length > 0
      angular.forEach notes, (note) ->
        for tag in tags
          isContained = (noteTag for noteTag in note.tags when noteTag.indexOf(tag) > -1).length > 0
          filtered.push note if isContained
      filtered
    else 
      notes
]