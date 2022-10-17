


// Get key input boxes. 
const keyInputBox0 = document.getElementById('keyInputBox0');
const keyInputBox1 = document.getElementById('keyInputBox1');
const keyInputBox2 = document.getElementById('keyInputBox2');
const keyInputBox3 = document.getElementById('keyInputBox3');
const keyInputBox4 = document.getElementById('keyInputBox4');
const keyInputBox5 = document.getElementById('keyInputBox5');
const keyInputBox6 = document.getElementById('keyInputBox6');

// Get main output box. 
const ouputBox = document.getElementById('outputBox');



/*****/


// Clear form. 
function clearForm() {
	
	// Clear input. 
	clearInput();
	// Clear output. 
	clearOutput();
	
	/****/
	
	// Clear input. 
	function clearInput() {
		keyInputBox0.value = '';
		keyInputBox1.value = '';
		keyInputBox2.value = '';
		keyInputBox3.value = '';
		keyInputBox4.value = '';
		keyInputBox5.value = '';
		keyInputBox6.value = '';
	}
	
	// Clear output. 
	function clearOutput() {
		// 
		ouputBox.innerHTML = '';
	}
}

// Output: Show results on page. 
function showOutput() {

	// Initialize list of input keys. 
	let inputKeys = [];
	let inputKeyIndexes = [];
	
	// Initialize list of indexes for matching scales. 
	let matchingScales = [];

	// Save list of input keys. 
	saveInputKeys();

	// Get matching key scales. 
	getMatchingScales(inputKeys);
	console.log('Matching scale indexes:',matchingScales);
	
	// Show matching key scales. 
	showMatchingScales();
	console.log('Matching scale indexes:',matchingScales);

	/****/

	// Input: Save input keys to list. 
	// Eb -> DE -> 3
	function saveInputKeys() {
	
		// 
		inputKeys = [
			convertKey(keyInputBox0.value),
			convertKey(keyInputBox1.value),
			convertKey(keyInputBox2.value),
			convertKey(keyInputBox3.value),
			convertKey(keyInputBox4.value),
			convertKey(keyInputBox5.value),
			convertKey(keyInputBox6.value),
		];
		// inputKeys[0] = convertKey(keyInputBox0.value);
		// inputKeys[1] = convertKey(keyInputBox1.value);
		// inputKeys[2] = convertKey(keyInputBox2.value);
		// inputKeys[3] = convertKey(keyInputBox3.value);
		// inputKeys[4] = convertKey(keyInputBox4.value);
		// inputKeys[5] = convertKey(keyInputBox5.value);
		// inputKeys[6] = convertKey(keyInputBox6.value);
		console.log('User input converted:', inputKeys);
		
		// Get keyid for each given input key. 
		let allKeyIds = keyList.map( item => item.keyid );
		// console.log('All key ids:', allKeyIds);

		// Get index for each input key. 
		let i = inputKeys.map( key => allKeyIds.indexOf(key) );

		// Add all valid indices to list. 
		if(i[0]>-1) inputKeyIndexes.push(i[0]);
		if(i[1]>-1) inputKeyIndexes.push(i[1]);
		if(i[2]>-1) inputKeyIndexes.push(i[2]);
		if(i[3]>-1) inputKeyIndexes.push(i[3]);
		if(i[4]>-1) inputKeyIndexes.push(i[4]);
		if(i[5]>-1) inputKeyIndexes.push(i[5]);
		if(i[6]>-1) inputKeyIndexes.push(i[6]);
		console.log('Indexes for user input:',inputKeyIndexes);
		
		/****/

		// TODO: Convert input key. 
		function convertKey(rawkey) {
			// 
			return rawkey;
		}
	}
	
	// Process: Get key scales that match user input (scale contains all input keys). 
	function getMatchingScales(keyInput) {
	
		// Go thru each key scale. 
		for(let i in scaleList) {

			// Get key scale. 
			let keyScale = scaleList[i];

			// Check if key scale matches input. 
			let scaleMatchesInput = checkForMatchingScale(keyInput,keyScale);
			// console.log(1*i,'scaleMatchesInput:',scaleMatchesInput);

			// Save index of key scale if matches input. 
			if(scaleMatchesInput) matchingScales.push(i);
		}
	
		/****/
	
		// Check if key scale matches input keys (scale contains all input keys). 
		function checkForMatchingScale(keyInput,keyScale) {
		
			// Go thru each input key. 
			for(let keyIndex of inputKeyIndexes) {
		
				// Exclude if input key is missing from given list. 
				let missingAKey = !(keyScale.keyindexlist).includes(keyIndex);
				if( missingAKey ) return false;
			}
		
			// Return true if no input keys missing from given list. 
			return true;
		}
	}
	
	// Show key scales that match user input. 
	function showMatchingScales() {

		// Initialize result. 
		let result = '';

		// 
		// for(let scaleSet of matchingScales) {

		// Open set. 
		result += `
		<!-- set -->
		<div class="set">`;

		// 
		// for(let scaleIndex of scaleSet) {
		// for(let scaleIndex of matchingScales) {
		for(let i in matchingScales) {

			// Get index of matching scale. 
			scaleIndex = matchingScales[i];
			console.log(`i${i}`,scaleIndex);

			// Get scale name. 
			let scalename = scaleList[scaleIndex].scalename;
			console.log(`\tscalename: ${scalename}`);
			
			// Get scale naming indicator. 
			let scalenamingkey = scaleList[scaleIndex].namingkey || ( /* 'keyid' || 'keyflatname' || */ 'keysharpname');
			console.log(`\tscalenamingkey: ${scalenamingkey}`);

			// Get list of key indexes for scale. 
			let keyindexlist = scaleList[scaleIndex].keyindexlist;
			console.log(`\tkeyindexlist: [ ${keyindexlist.join(' ')}]`);
			// Get key list for scale. 
			let keylist = formatKeyList( keyindexlist, scalenamingkey );
			console.log(`\tkeylist: [ ${keylist.join(' ')}]`);

			// Add scale representation to page result. 
			result += `
			<!-- scale -->
			<div class="scale" data-scaleindex="${ scaleIndex }">

				<!-- scalename -->
				<span class="scalename">${ scalename }</span>
				<!-- /scalename -->

				<!-- scalekeys -->
				<span class="scalekeys">${ keylist.join(' ') }</span>
				<!-- /scalekeys -->
				
			</div>
			<!-- /scale -->`;

			// 
			// result += ``;
		}

		// Close set. 
		result += `
		</div>
		<!-- /set -->`;
		
		// }

		// Clear previous result. 
		ouputBox.innerHTML = '&nbsp;';

		// Show result of matching scales on screen. 
		ouputBox.innerHTML = result;

		// Activate clicks on scale buttons. 
		activateScaleBtns();

		/***/

		// TODO: Format keys by index (converting numbers to letters). 
		function formatKeyList( keyindexlist, namingkey = 'keyid' ) {
			console.log('\tnamingkey:',namingkey);

			// Define naming key (flats, sharps, etc). 
			// namingkey = xyz;

			// Convert index to key name. 
			return keyindexlist.map( index => ( keyList[index][namingkey] ) );
		}

		// Activate clicks on scale buttons. 
		function activateScaleBtns() {
			// 
			let allScaleBtns = document.querySelectorAll('div#container main.main div.item div.output div.scale');
			for(let scalebtn of allScaleBtns) {
				// Show selected scale when clicked. 
				scalebtn.addEventListener('click',showScale);
			}

			/**/

			// TODO: Show selected scale. 
			function showScale(event) {

				// Get selected scale index. 
				let scaleBtn = event.currentTarget;

				// Get selected scale index. 
				let scaleIndex = 1 * scaleBtn.getAttribute('data-scaleindex');

				console.log('Selected scale index:',scaleIndex);
				window.alert(scaleIndex);
			}
		}
	}
}


