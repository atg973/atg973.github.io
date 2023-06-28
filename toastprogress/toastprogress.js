


// Define initial duration of toast message. 
const default_toastduration = 12000;
// Define animation time. 
const dt = 500;

// Initialize toast count. 
let toastcount = 0;

// Get toaster inputs. 
const displaybtns = document.querySelectorAll('div#container div.showbtn');
const inputcontent = document.querySelector('div#container main.main input.message');
const inputduration = document.querySelector('div#container main.main input.duration');

// Get toaster list. 
const toasterlist = document.querySelector('div#container ul.toasterlist');


/*****/


// Activate toaster. 
activateToaster();


/*****/


// Activate toaster. 
function activateToaster() {

	// Enable toaster control buttons. 
	for(btn of displaybtns) {
		btn.addEventListener('click',chooseNewToast);
	}

	/****/
	
	// Start showing new toast. 
	function chooseNewToast(event) {
	
		// Get selected display button. 
		let selectedbtn = event.currentTarget;
		// Get id of selected message type. 
		let newmsgtypeid = selectedbtn.getAttribute('data-msgtypeid');
		
		// Add new toast item to page. 
		popNewToast(newmsgtypeid);

		/****/

		// Add new toast item to page. 
		function popNewToast(newmsgtypeid) {
		
			// Generate new toast id. 
			let newtoastid = getNewToastId();

			// Create new toast layout. 
			let newtoastlayout = createToastLayout(newtoastid,newmsgtypeid);
			// Add new toast to on-page list. 
			toasterlist.insertAdjacentHTML('afterbegin', newtoastlayout );
			// toasterlist.insertAdjacentHTML('beforeend', newtoastlayout );

			// Get element for new toast item. 
			let newtoastitem = document.getElementById(newtoastid);
			console.log('newtoastitem:',newtoastitem);

			// Show new toast message. 
			showNewToast(newtoastitem);

			/***/

			// Generate new toast id. 
			function getNewToastId() {
	
				// Increment toast count. 
				toastcount++;
	
				// Return new toast id. 
				return `toast${toastcount}`;
			}
		
			// Create layout for new toast message. 
			function createToastLayout(toastid,msgtypeid) {
			
				// Get message type. 
				let msgtype = msgTypeData[msgtypeid];
			
				// Return message layout. 
				return `
				<!-- toastitem -->
				<li class="toastitem gone" id="${toastid}" style="--i:${toastcount};">

					<!-- toast -->
					<div class="toast ${msgtypeid}">
	
						<!-- image -->
						<div class="image">
			
							<!-- icon -->
							<svg class="icon ${msgtype.icontag}" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
								${ iconData[msgtype.icontag] }
							</svg>
							<!-- /icon -->
		
						</div>
						<!-- /image -->
		
						<!-- message -->
						<div class="message">
			
							<!-- head -->
							<h1 class="head">${ msgtype.header }</h1>
							<!-- /head -->
				
							<!-- textcopy -->
							<p class="textcopy">${ inputcontent.value || msgtype.defaultmessage }</p>
							<!-- /textcopy -->
		
						</div>
						<!-- /message -->
		
						<!-- controls -->
						<div class="controls">
		
							<!-- closebtn -->
							<div class="closebtn btn">
		
								<!-- icon -->
								<span class="icon">&times;</span>
								<!-- /icon -->
		
							</div>
							<!-- /closebtn -->
		
						</div>
						<!-- /controls -->
						
					</div>
					<!-- /toast -->

				</li>
				<!-- /toastitem -->`;
			}
	
			// Show new toast message. 
			function showNewToast() {
	
				// Get duration of toast (converting input sec to msecs). 
				let toastduration = inputduration.value * 1000;
			
				// Reveal new toast item. 
				setTimeout(slideToastIn,100);
				// slideToastIn();
		
				// Create new toast timer (for inner line animation). 
				newtoastitem.style.setProperty('--toastduration',`${toastduration}ms`);
	
				// Create new toast timer (for outer window animation). 
				setTimeout(slideToastOut, toastduration);
				// console.log('newtoasttimer:',newtoasttimer);
		
				// Enable close button for new toast. 
				let newtoastclosebtn = newtoastitem.querySelector('div.closebtn')
				newtoastclosebtn.addEventListener('click',slideToastOut);
	
				/****/
			
				// Reveal selected toast item. 
				function slideToastIn() {
					// Allow view of new toast message. 
					newtoastitem.classList.add('active');
					newtoastitem.classList.remove('gone');
				}
	
				// Close selected toast item. 
				function slideToastOut() {
				
					// Hide selected toast item. 
					newtoastitem.classList.remove('active');
				
					// Remove selected toast item (after delay). 
					setTimeout(removeToast,4000);
		
					/****/
				
					// Remove selected toast item. 
					function removeToast() {
						// Remove from page. 
						newtoastitem.remove();
					}
				}
			}
		}
	}
}
