puffbird.factory 'userResource', ['$resource', ($resource) -> 
	$resource '/api/users/:id', 
        _id: '@id' 
        update: 
            method: 'PUT'
            isArray: false
]