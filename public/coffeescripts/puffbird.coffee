app = angular
	.module 'puffbird', ['ngRoute', 'ngResource', 'ngCookies'] 
	.constant 'baseUrl', 'http://localhost:3030/'
	.constant 'title', 'Puffbird' 
	.constant 'toastr', toastr

app.config ($routeProvider, $locationProvider) ->
	routeUserChecks = 
		authenticated: 
			authenticate: (authService) ->
				authService.isAuthenticated()

	$routeProvider
		.when '/login',
			templateUrl: '/views/partials/account/login.html'
			controller: 'UserController'
			controllerAs: 'usrCtrl'
		.when '/signup',
			templateUrl: '/views/partials/account/signup.html'
			controller: 'UserController'
			controllerAs: 'usrCtrl'
		.when '/feedback',
			templateUrl: '/views/partials/feedback.html'
			controller: 'FeedbackController',
			controllerAs: 'fbCtrl'
		.when '/notes/create',
			templateUrl: '/views/partials/notes/create.html'
			controller: 'NoteController'
			controllerAs: 'noteCtrl'
			resolve: routeUserChecks.authenticated
		.when '/notes',
			templateUrl: '/views/partials/notes/list.html'
			controller: 'NoteController'
			controllerAs: 'noteCtrl'
			resolve: routeUserChecks.authenticated
		.when '/home',
			templateUrl: '/views/partials/home.html'
			controller: 'HomeController'
			controllerAs: 'homeCtrl'
		.otherwise
			redirectTo: '/home'

app.run ($rootScope, $location) ->
	$rootScope.$on '$routeChangeError', (ev, current, previous, rejection) -> 
		if rejection is 'not authorized' then $location.path '/login'

(exports ? @).puffbird = app