DAY = 1000 * 60 * 60  * 24

Date::endOfWeek = ->
  new Date( 
    @.getFullYear(), 
    @.getMonth(), 
    @.getDate() + 7 - @.getDay() 
  )

Date::endOfMonth = ->
  lastDay = new Date(@.getFullYear(), @.getMonth() + 1, 0)


Date::endOfYear = ->
  new Date @.getFullYear(), 11, 31

Date::daysBetween = (date) ->
  Math.round (date.getTime() - @.getTime()) / DAY 
