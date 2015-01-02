DAY = 1000 * 60 * 60  * 24

Date.prototype.endOfWeek = ->
  new Date( 
    @.getFullYear(), 
    @.getMonth(), 
    @.getDate() + 7 - @.getDay() 
  );

Date.prototype.endOfMonth = ->
  lastDay = new Date(@.getFullYear(), @.getMonth() + 1, 0);


Date.prototype.endOfYear = ->
  new Date @.getFullYear(), 11, 31

Date.prototype.daysBetween = (date) ->
  Math.round (date.getTime() - @.getTime()) / DAY 