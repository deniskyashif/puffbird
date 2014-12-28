puffbird.factory 'identityService', ['$cookieStore', ($cookieStore) -> 
  cookieStorageUserKey = 'puffbirdApplicationUser'
  currentUser = null

  getCurrentUser: ->
    savedUser = $cookieStore.get cookieStorageUserKey
    if savedUser then savedUser else currentUser
  setCurrentUser: (user) ->
    if user 
      $cookieStore.put cookieStorageUserKey, user
    else 
      $cookieStore.remove cookieStorageUserKey
    currentUser = user 
  isAuthenticated: ->
    !!@.getCurrentUser()
]