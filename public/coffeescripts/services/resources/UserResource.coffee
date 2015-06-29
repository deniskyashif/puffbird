puffbird.factory 'UserResource', ['$resource', ($resource) -> 
  $resource '/api/users/:id', _id: '@id', 
    _id: '@id' 
    update: 
      method: 'PUT'
      params: 
        _id: '@id'
]
