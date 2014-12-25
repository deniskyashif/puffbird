puffbird.factory 'noteResource', ['$resource', ($resource) -> 
	$resource '/api/notes/:id', 
        _id: '@id', 
        update:  
            method: 'PUT' 
]