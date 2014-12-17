app.controller 'PageController',  ['title', (title) -> 
		self = this
		
		self.title = title

		self.pesho = ->
			alert 'gosho'
	]