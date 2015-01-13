puffbird.filter 'isInDateRange', [ ->
  (date, from, to) ->  
    from <= date and date <= to
]