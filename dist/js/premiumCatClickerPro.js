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
//console.log(Object.keys(model.cats[0]));



/* ======== Octopus ======== */

var octopus = {
	init: function() {
		// set our current cat to the first one in the addEventListener
		model.currentCat = model.cats[0];
		adminToggleButton.init();
		catListView.init();
		catView.init();
		//if (model.adminMode == true) {
			adminView.init();
		//}

	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	getModelCat: function() {
		return Object.keys(model.cats[2]);
	},

	// set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
		adminView.render();
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
							if (model.adminMode == true) {
								model.adminMode = false;
								adminView.render();
							}
				};

			})(cat));

			// finally add the element to the list
			this.catListElem.appendChild(elem);

		};
	}
};

/* ======== View ======== */

var adminToggleButton = {
	init: function() {
		this.toggleButton = document.getElementById('admin-mode');

		this.toggleButton.addEventListener('click', function(){
			if (model.adminMode == false) {
				model.adminMode = true;
				adminView.render();

			} else {
					model.adminMode = false;
					adminView.render();
			}
		});
	},

	render: function() {


	}
};


var adminView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.adminNameElem = document.getElementById('1cat-name');
		this.adminImageElem = document.getElementById('1cat-img');
		this.adminCountElem = document.getElementById('1cat-count');

		//render the view (update the DOM elements with th right va)
		this.render();
	},

	render: function() {

		var currentCat = octopus.getCurrentCat();
		var modelCat = octopus.getModelCat();
		if (model.adminMode === true) {
			this.adminCountElem.textContent = modelCat[0];
			this.adminNameElem.textContent = modelCat[1];
			this.adminImageElem.textContent = modelCat[2];

			var adminNameInput = document.createElement("input"); //input element, text
			adminNameInput.setAttribute('type',"text");
			adminNameInput.setAttribute('name',"name");
			adminNameInput.setAttribute('value', currentCat.name);
			this.adminNameElem.appendChild(adminNameInput);

			var adminCountInput = document.createElement("input"); //input element, text
			adminCountInput.setAttribute('type',"text");
			adminCountInput.setAttribute('name',"name");
			adminCountInput.setAttribute('value', currentCat.clickCount);
			this.adminCountElem.appendChild(adminCountInput);

			var adminImageInput = document.createElement("input"); //input element, text
			adminImageInput.setAttribute('type',"text");
			adminImageInput.setAttribute('name',"name");
			adminImageInput.setAttribute('value', currentCat.imgSrc);
			this.adminImageElem.appendChild(adminImageInput);

			console.log(model.adminMode);

		} else {
				this.adminCountElem.textContent = '';
				this.adminNameElem.textContent = '';
				this.adminImageElem.textContent = '';
				console.log(model.adminMode);
				console.log(model.adminMode);
		}
	},
	reset: function() {

	},
};

// make it go
octopus.init();
};
