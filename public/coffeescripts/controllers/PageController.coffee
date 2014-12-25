puffbird.controller 'PageController',  ['authService', 'title', (authService, title) -> 
        @.title = title
        @.auth = authService
    ]