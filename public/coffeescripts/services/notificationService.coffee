puffbird.factory 'notificationService', ['toastr', (toastr) -> 
	toastr.options = 
    closeButton: true
		
	success: (msg) ->
		toastr.success msg
	error: (msg) ->
		toastr.error msg
]