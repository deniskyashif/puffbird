app = angular
	.module 'puffbird', ['ngRoute', 'ngResource', 'ngCookies'] 
	.constant 'title', 'Puffbird' 
	.constant 'toastr', toastr

app.config ($routeProvider, $httpProvider) ->
	$httpProvider.interceptors.push 'httpErrorHandlerInterceptor'

	routeUserChecks = 
		authenticated: 
			authenticate: (authService) ->
				authService.isAuthenticated()

	$routeProvider
		.when '/login',
			templateUrl: '/views/partials/account/login.html'
			controller: 'UserController'
			controllerAs: 'userCtrl'
		.when '/signup',
			templateUrl: '/views/partials/account/signup.html'
			controller: 'UserController'
			controllerAs: 'userCtrl'
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
		$location.path '/login' if rejection is 'not authorized'

(exports ? @).puffbird = app