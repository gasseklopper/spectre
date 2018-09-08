window.onload=function(){

/* ======== Model ======== */
var model = {
	currentCat: null,
	adminMode: false,
	cats: [
					{
						clickCount: 0,
						name: 'tabby',
						imgSrc: 'assets/images/cats/cat1.jpg',
						imgAttribution: 'catworld.com',
					},
					{
						clickCount: 0,
						name: 'labby',
						imgSrc: 'assets/images/cats/cat2.jpg',
						imgAttribution: 'catworld.com',
					},
					{
						clickCount: 0,
						name: 'babby',
						imgSrc: 'assets/images/cats/cat3.jpg',
						imgAttribution: 'catworld.com',
					},
					{
						clickCount: 0,
						name: 'fabby',
						imgSrc: 'assets/images/cats/cat4.jpg',
						imgAttribution: 'catworld.com',
					},
					{
						clickCount: 0,
						name: 'gabby',
						imgSrc: 'assets/images/cats/cat5.jpg',
						imgAttribution: 'catworld.com',
					},
	]// Array cats
};



/* ======== Octopus ======== */

var octopus = {
	init: function() {
		// set our current cat to the first one in the addEventListener
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	// set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	}
};

/* ======== View ======== */

var catView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		// on click, increment the current cats counter
		this.catImageElem.addEventListener('click', function(e){
			octopus.incrementCounter();
		});

		//render the view (update the DOM elements with th right va)
		this.render();
	},

	render: function() {
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {
	init: function() {
		// store the DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');

		// render this view (update the DOM elements with the right var)
		this.render();
	},

	render: function() {
		// get the cats we´ll be rendering from the octupus
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = '';

		// loop over the cats
		for (var i = 0; i < cats.length; i++) {
			// this is the cat we´re currently looping over
			var cat = cats[i];

			// make a new cat list item and set its text
			var elem = document.createElement('li');
			elem.textContent = cat.name;

			// on click, setCurrentCat and render the catView
			//(this uses our closure-in-a-loop trick to connect the v
			// of the cat variable to the click event function)
			elem.addEventListener('click', (function(cat){
				return function() {
					octopus.setCurrentCat(cat);
					catView.render();
				};

			})(cat));

			// finally add the element to the list
			this.catListElem.appendChild(elem);

		};
	}
};

// make it go
octopus.init();
};
