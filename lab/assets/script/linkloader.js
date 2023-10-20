


// Get navigation sidebar. 
const headsidebar = document.querySelector('div#container header.navbar div.bin div.sidebar');
// console.log('headsidebar:',headsidebar);

// Get list destinations for header navigation. 
const headnavlistdestinationA = document.querySelector('div#container header.navbar div.bin div.sidebar div.navmenu.a ul.navlist');
// console.log('headnavlistdestinationA:',headnavlistdestinationA);
const headnavlistdestinationB = document.querySelector('div#container header.navbar div.bin div.sidebar div.navmenu.b ul.navlist');
// console.log('headnavlistdestinationB:',headnavlistdestinationB);


/*****/


// Load navigation links in header. 
loadNavLinks();

// Activate navigation sidebar. 
activateSidebar();


/*****/


// Create navigation item. 
function createNavLink(url,caption,icontag,newwindowmode,relativeurl) {

	// Compile layout for navigation item. 
	return `
	<!-- navitem -->
	<li class="navitem">
	
		<!-- navlink -->
		<a class="navlink" href="${ relativeurl ? getRelativeUrl(url) : url }" title="${caption}" ${ newwindowmode ? 'target="_blank"' : '' }>

			${ icontag ? createIcon(icontag) : '' }

			<!-- caption -->
			<span class="caption">${caption}</span>
			<!-- /caption -->
			
		</a>
		<!-- /navlink -->

	</li>
	<!-- /navitem -->`;

	/****/

	// Create layout for link icon. 
	function createIcon(icontag) {
		
		// Compile link icon. 
		return `
		<!-- icon -->
		<svg class="icon ${icontag}" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
			${ iconData[icontag] }
		</svg>
		<!-- /icon -->`;
	}
}

// Load navigation links in header. 
function loadNavLinks() {

	// Add page links to social. 
	headnavlistdestinationA.innerHTML = createLinkList(navLinkData.groupitemsidlist,true,true);

	// Add social links to social. 
	headnavlistdestinationB.innerHTML = createLinkList(socialLinkData.groupitemsidlist,true,false);

	/****/

	// Create layout for list of navigation links. 
	function createLinkList(linklist,newwindowmode,relativeurl) {

		// Initialize list of items. 
		let list = '';

		// Accumulate list of items. 
		for(link of linklist) {

			// Get url for link. 
			let url = link.linkurl;

			// Get caption for link. 
			let caption = link.linkname;

			// Get icon tag for link. 
			let icontag = link.icontag;

			// Compile navigation item. 
			list += createNavLink(url,caption,icontag,newwindowmode,relativeurl);
		}

		// Return list of items. 
		return list;
	}
}

// Activate navigation sidebar. 
function activateSidebar() {

	// Get all navigation togglers. 
	let allnavtogglers = document.querySelectorAll('.navtoggler');
	console.log('All nav togglers:',allnavtogglers);

	// Activate each navigation toggler. 
	for(let navtoggler of allnavtogglers) {
		navtoggler.addEventListener('click',toggleSidebar);
	}

	/****/

	// Toggle state of navigation sidebar. 
	function toggleSidebar() {
	
		// Check if sidebar already open. 
		let alreadyopen = headsidebar.classList.contains('active');
	
		// Close sidebar if already open. 
		if(alreadyopen) {
			headsidebar.classList.remove('active');
			document.body.classList.remove('freeze');
			document.documentElement.classList.remove('freeze');
		}
	
		// Open sidebar if not already open. 
		else {
			headsidebar.classList.add('active');
			document.body.classList.add('freeze');
			document.documentElement.classList.add('freeze');
		}
	}
}
