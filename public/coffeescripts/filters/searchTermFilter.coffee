puffbird.filter 'searchTermFilter', [ ->
  (notes, terms) ->  
    filtered = []
    
    # if the notes are loaded
    if notes? and notes.length and terms? and terms.length
      angular.forEach notes, (note) ->
        for term in terms
          tagMatch = (noteTag for noteTag in note.tags when noteTag.indexOf(term) > -1).length > 0
          titleMatch = note.title.indexOf(term) > -1
          if (tagMatch or titleMatch)
            filtered.push note 
      filtered
    else 
      notes
]
