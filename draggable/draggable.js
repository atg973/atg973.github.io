


// Get desktop window container. 
const desktop = document.querySelector('div#container div.desktop');


/*****/

// Initialize count of desktop windows. 
let windowcount = 0;
console.log('Window count:',windowcount);

// Increment count of desktop windows. 
windowcount+=5;
console.log('Window count:',windowcount);


/*****/


// Activate desktop. 
activateDesktop();


/*****/


// Activate initial desktop windows. 
function activateDesktop() {

	// Get all current desktop windows. 
	let alldesktopwindows = document.querySelectorAll('div#container div.desktop div.window');

	// Go thru all desktop windows. 
	for(let dw of alldesktopwindows) {
		// Activate desktop window. 
		activateDesktopWindow(dw);

		// Position desktop window. 
		positionDesktopWindow(dw);
	}

	/****/

	// Activate desktop window. 
	function activateDesktopWindow(dw) {
		console.log('Now activating:',dw);

		// Activate movement of desktop window. 
		makeMovable(dw/* ,'div.headbar' */);

		// Activate controls of desktop window. 
		makeControllable(dw);

		// Activate levels of desktop window. 
		makeLevelable(dw);

	}

	// Position desktop window. 
	function positionDesktopWindow(dw) {

		// Define positioning differential. 
		let dx = 32;
		let dy = 48;

		// Get desk level of current window. 
		let index = dw.style.getPropertyValue('--i') * 1;

		// Position desktop window. 
		dw.style.top = `${index*dy}px`;
		dw.style.left = `${index*dx}px`;
	}
}
