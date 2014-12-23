puffbird.factory 'notifier', ['toastr', (toastr) -> 
	toastr.options =
		positionClass: 'toast-top-full-width' 
	
	success: (msg) ->
		toast.success msg
	error: (msg) ->
		toast.error msg
]