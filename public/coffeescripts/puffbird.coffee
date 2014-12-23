exports = this

exports.puffbird = angular
	.module 'puffbird', ['ngRoute', 'ngResource', 'ngCookies'] 
	.constant 'baseUrl', 'http://localhost:3030/'
	.constant 'title', 'Puffbird' 
	.constant 'toastr', toastr
