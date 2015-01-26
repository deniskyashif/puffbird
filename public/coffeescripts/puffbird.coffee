app = angular
	.module 'puffbird', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap'] 
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
			controller: 'AccountController'
		.when '/signup',
			templateUrl: '/views/partials/account/signup.html'
			controller: 'AccountController'
		.when '/settings',
			templateUrl: '/views/partials/account/settings.html'
			controller: 'UsersController'
		.when '/feedback',
			templateUrl: '/views/partials/feedback.html'
			controller: 'FeedbackController',
		.when '/notes',
			templateUrl: '/views/partials/notes/list.html'
			controller: 'NotesController'
		.when '/home',
			templateUrl: '/views/partials/home.html'
		.otherwise
			redirectTo: '/home'

app.run ($rootScope, $location) ->
	$rootScope.$on '$routeChangeError', (ev, current, previous, rejection) -> 
		$location.path '/login' if rejection is 'not authorized'

(exports ? @).puffbird = app