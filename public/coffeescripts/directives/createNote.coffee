puffbird.directive 'createNote', [ ->
  restrict: 'AE'
  scope: 
    ctrl: '='
  templateUrl: 'views/directives/createNote.html'
  link: (scope, element, attrs) ->
    calendarOpened = no
]