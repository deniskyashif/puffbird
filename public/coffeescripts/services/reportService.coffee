puffbird.factory 'reportService', ['$http', ($http) -> 
  create: (data) ->
    $http.post('/api/report', data);
]