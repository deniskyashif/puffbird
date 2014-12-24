app = angular
	.module 'puffbird', ['ngRoute', 'ngResource', 'ngCookies'] 
	.constant 'baseUrl', 'http://localhost:3030/'
	.constant 'title', 'Puffbird' 
	.constant 'toastr', toastr

app.config ($routeProvider, $locationProvider) ->
	routeUserChecks = 
		authenticated: 
			authenticate: (auth) ->
				auth.isAuthenticated()

	$routeProvider
		.when '/login',
			templateUrl: '/views/partials/account/login.html'
			controller: 'UserController'
		.when '/signup',
			templateUrl: '/views/partials/account/signup.html'
			controller: 'UserController'
		.when '/feedback',
			templateUrl: '/views/partials/feedback.html'
			controller: 'UserController'
		.when '/notes/create',
			templateUrl: '/views/partials/notes/create.html'
			controller: 'NoteController'
			resolve: routeUserChecks.authenticated
		.when '/notes',
			templateUrl: '/views/partials/notes/list.html'
			controller: 'NoteController'
			resolve: routeUserChecks.authenticated
		.when '/home',
			templateUrl: '/views/partials/home.html'
		.otherwise
			redirectTo: '/home'

app.run ($rootScope, $location) ->
	$rootScope.$on '$routeChangeError', (ev, current, previous, rejection) -> 
		if rejection is 'not authorized'
			$location.path '/'

(exports ? @).puffbird = app