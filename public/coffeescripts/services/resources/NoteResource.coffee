puffbird.factory 'NoteResource', ['$resource', ($resource) -> 
  $resource '/api/notes/:id', _id: '@id', 
    update:  
      method: 'PUT' 
      params: 
        _id: '@id'
    delete:
      method: 'DELETE'
      params: 
        _id: '@id'
]
