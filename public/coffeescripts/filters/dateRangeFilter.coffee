puffbird.filter 'dateRangeFilter', [ ->
  (notes, fromDate, toDate) ->  
    result = []
    
    # date filters
    fromDate = (if (fromDate and not isNaN(Date.parse(fromDate))) then Date.parse(fromDate) else 0)
    toDate = (if (toDate and not isNaN(Date.parse(toDate))) then Date.parse(toDate) else new Date().getTime())
    
    # if the notes are loaded
    if notes and notes.length > 0
      angular.forEach notes, (note, index) ->
        noteDueDate = new Date(note.dueDate)
        result.push note  if fromDate <= noteDueDate and noteDueDate <= toDate
        return

      result
]