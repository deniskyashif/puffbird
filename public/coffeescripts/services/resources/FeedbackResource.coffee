puffbird.factory 'FeedbackResource', ['$resource', ($resource) -> 
  $resource '/api/feedback/:id', _id: '@id',
    delete:
      method: 'DELETE'
      params: 
        _id: '@id'
]