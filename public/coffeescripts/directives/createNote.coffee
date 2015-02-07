puffbird.directive 'createNote', [ () ->
    require: '^NotesController'
    restrict: 'AE'
    templateUrl: 'views/directives/createNote.html'
]