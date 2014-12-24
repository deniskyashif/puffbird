puffbird.controller 'PageController',  ['auth','title', (auth, title) -> 
        @.title = title
        @.auth = auth
    ]