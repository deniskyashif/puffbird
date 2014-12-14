app.controller 'PageController', 
	['title', 'author', (title) -> 
		self = this
		
		self.title = title
	]