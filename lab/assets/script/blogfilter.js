


// Get componenets of filter panel. 
const filterpanel = {

	// Get container of filter panel. 
	box: document.querySelector('div#container section.blog div.grid div.body div.filterpanel'),

	// Get buttons in filter panel. 
	applybtn: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody div.btnpanel div.applybtn'),
	clearbtn: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody div.btnpanel div.clearbtn'),

	// Get destination for filter groups in filter panel. 
	groupsdestination: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody ul.filterlist'),
	// Get group headers in filter panel. 
	// groupheaders: document.querySelectorAll('div#container section.blog div.grid div.body div.filterpanel div.panelbody ul.filterlist li.filtergroup h2.filterhead'),

	// Get switch for filter type (matching any single criterion vs matching all criteria). 
	anyallswitch: {
		anybtn: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody div.btnpanel div.row span.choice.any'),
		allbtn: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody div.btnpanel div.row span.choice.all'),
		checkbox: document.querySelector('div#container section.blog div.grid div.body div.filterpanel div.panelbody div.btnpanel div.row label.switch input.cb'),
	},

	// Get destination for list of applied filters. 
	taglistdestination: document.querySelector('div#container section.blog div.grid div.body div.appliedfilters ul.filtertaglist'),
};
// console.log('Filter panel:',filterpanel);


// Get componenets of search panel. 
const searchpanel = {

	// Get input field for search query. 
	queryfield: document.querySelector('div#container section.blog div.grid div.head div.modpanel input#filtersearchquery'),

	// Get clear button for search panel. 
	clearbtn: document.querySelector('div#container section.blog div.grid div.head div.modpanel label.searchclearbtn'),
};
// console.log('Search panel:',searchpanel);


/*****/


// Activate blog post filtering. 
activateBlogFilters();


/*****/


// Activate blog post filtering. 
function activateBlogFilters() {

	// Load post filter groups into filter panel. 
	loadFilterGroups();

	// Activate blog post search filter (if search query field exists). 
	activateBlogSearch();

	/****/

	// Activate blog post search filter. 
	function activateBlogSearch() {

		// Check if search panel query field exists. 
		if(!searchpanel.queryfield) return;

		// Activate input field to search blog posts. 
		searchpanel.queryfield.addEventListener('input',searchBlogPosts);
		searchpanel.clearbtn.addEventListener('click',clearSearchQuery);

		// Clear any previous search query. 
		clearSearchQuery();

		/***/

		// Show blog posts that match given search query. 
		function searchBlogPosts() {

			// Set filter style. 
			let dohardfilter = true;
			dohardfilter = false;

			// Do hard filter. 
			if(dohardfilter) {

				// TODO: Get search filter criteria. 
				let selectedfilteritems = [];

				// TODO: Load matching posts for given search filter criteria. 
				loadBlog(selectedfilteritems);

				// TODO: Load new post filter groups into filter panel. 
				loadFilterGroups();

				// 
				return;
			}

			// Do soft filter. 

			// Access loaded blog post cards. 
			let blogpostcards = document.querySelectorAll('div#container section.blog div.grid div.body div.posts ul.pagelist li.postpage ul.postlist li.postcard');
			// console.log('Blog post cards:',blogpostcards);

			// Initialize number of matching posts. 
			let numMatchingPosts = 0;

			// TODO: There's an easier way to do this. But this way doesn't work yet cuz its not an array; ts a collection of nodes. 
			// let matchingPosts = blogpostcards.filter( (card)=>checkForMatch( card.getAttribute('data-projectid').toUpperCase() ) )
			// Set number of matching posts. 
			// let numMatchingPosts = matchingPosts.length;
		
			// Go thru each blog post. 
			for(let postcard of blogpostcards) {

				// Get project id for given post. 
				let projectid = postcard.getAttribute('data-projectid');

				// Check for matching post. 
				let matchFound = checkForMatch(projectid);

				// Increment number of matching posts. 
				if(matchFound) numMatchingPosts++;

				// Update visibility state of post based on match. 
				updatePostState(postcard, matchFound);
			}

			// Set state of results block. 
			setResultState(numMatchingPosts);

			/**/

			// Check for matching post. 
			function checkForMatch(projectid) {

				// Capitalize project id. 
				projectid = projectid.toUpperCase();

				// Get search query of post filter. 
				let filtersearchquery = searchpanel.queryfield.value.toUpperCase();
				// Get list of words in search query. 
				let searchquerywords = filtersearchquery.split(' ');
				// console.log('Searching posts...', filtersearchquery, searchquerywords);

				// Check for matching post (by full query). 
				let matchFullQuery = projectid.includes(filtersearchquery);
				// Check for matching post (by each word). 
				let matchEveryWord = checkForMatchAllWords(projectid,searchquerywords);

				// Compile match criteria. 
				return (matchFullQuery || matchEveryWord);

				/**/

				// Check for matching post (by all words). 
				function checkForMatchAllWords(projectid,searchquerywords) {
			
					// Go thru each word in search query. 
					for(let word of searchquerywords) {
	
						let wordPresent = projectid.includes(word);
	
						// Return false if any query word is missing. 
						if(!wordPresent) return false;
					}
	
					// Return true if passed (no query words missing). 
					return true;
				}

				// Check for matching post (by any words). 
				function checkForMatchAnyWord(projectid,searchquerywords) {
			
					// Go thru each word in search query. 
					for(let word of searchquerywords) {
	
						let wordPresent = projectid.includes(word);
	
						// Return false if any query word is missing. 
						if(!wordPresent) return false;
					}
	
					// Return true if passed (no query words missing). 
					return true;
				}
			}

			// Update visibility state of post based on match. 
			function updatePostState(postcard,matchesQuery) {

				// Show matching post. 
				if(matchesQuery) postcard.classList.remove('gone');

				// Hide non-matching post. 
				else postcard.classList.add('gone');
			}
		}

		// Clear search query. 
		function clearSearchQuery() {

			// Clear search query. 
			searchpanel.queryfield.value = '';

			// Show all blog posts. 
			searchBlogPosts();
		}
	}

	// Load post filter groups into filter panel. 
	function loadFilterGroups() {
		console.log('Loading list of post filter groups');

		// Check if filter panel exists. 
		if(!filterpanel.box) return;
	
		// Initialize layout for filter groups. 
		let filtergroupslayout = '';
	
		// Go thru each filter group. 
		for(let filtergroup of postFilterData) {
			// console.log('Filter group:',filtergroup);
			
			// Add filter group to layout. 
			filtergroupslayout += `
			<!-- filtergroup -->
			<li class="filtergroup open" data-filtertypeid="${filtergroup.filtergroupid}">
	
				<!-- filterhead -->
				<h2 class="filterhead">
	
					<!-- caption -->
					<span class="caption">${filtergroup.filtername}</span>
					<!-- /caption -->
	
					<!-- icon -->
					<svg class="icon arrow up" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
					</svg>
					<!-- /icon -->
	
					<!-- icon -->
					<svg class="icon arrow dn" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
					</svg>
					<!-- /icon -->
	
				</h2>
				<!-- /filterhead -->
	
				<!-- filterbody -->
				<div class="filterbody">
	
					<!-- itemslist -->
					<ul class="itemslist">${ createFilterItemsListLayout(filtergroup) }</ul>
					<!-- /itemslist -->
					
				</div>
				<!-- /filterbody -->
				
			</li>
			<!-- /filtergroup -->`;
		}
	
		// Display filter groups in filter panel. 
		filterpanel.groupsdestination.innerHTML = filtergroupslayout;
	
		// Activate filter headers in filter panel. 
		activateFilterHeads();
	
		// Activate filter items in filter panel. 
		activateFilterItems();
	
		/***/
	
		// Create layout for filter items list. 
		function createFilterItemsListLayout(filtergroup) {
	
			// Get filter group id. 
			let filtergroupid = filtergroup.filtergroupid;
	
			// Get list of filter items. 
			let filteritemslist = filtergroup.filteritems;
			// console.log('Creating layout for filter items list',filteritemslist);
	
			// Initialize layout for filter items list. 
			let filteritemslistlayout = '';
	
			// Go thru each filter item in given list. 
			for(let filteritem of filteritemslist) {
				// console.log('Filter item:',filteritem);
	
				// Add filter item to layout. 
				filteritemslistlayout += createFilterItemLayout(filteritem);
			}
	
			// Return layout for criteria list. 
			return filteritemslistlayout;
	
			/**/
	
			// Create layout for given filter item. 
			function createFilterItemLayout(filteritem) {
	
				// Get value of current filter item. 
				let itemvalue = filteritem.value;
				if(!itemvalue) console.log('Filter item value:',itemvalue);
	
				// Get name of current filter item. 
				let itemname = filtergroup.filteritemnamer(itemvalue);
				// console.log('Filter item name:',itemname);
	
				// Create unique id for current filter item. 
				let uniqueitemid = filtergroupid + itemvalue;
	
				// Compile layout for filter item. 
				return `
				<!-- filteritem -->
				<li class="filteritem" data-filteritemvalueid="${itemvalue}" title="${itemvalue}">
		
					<!-- checkbox -->
					<input class="checkbox" type="checkbox" id="${uniqueitemid}">
					<!-- /checkbox -->
		
					<!-- front -->
					<label class="front" for="${uniqueitemid}">
		
						<!-- icon -->
						<svg class="icon check" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
							<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
						</svg>
						<!-- /icon -->
		
						<!-- caption -->
						<span class="caption">${itemname}</span>
						<!-- /caption -->
		
						<!-- matchcount -->
						<span class="matchcount">${ filteritem.frequency}</span>
						<!-- /matchcount -->
		
					</label>
					<!-- /front -->
					
				</li>
				<!-- /filteritem -->`;
			}
		}
	
		// Activate filter group headers in filter panel. 
		function activateFilterHeads() {
	
			// Get loaded headers in filter panel. 
			let filtergroupheaders = filterpanel.groupsdestination.querySelectorAll('li.filtergroup h2.filterhead');
		
			// Go thru each header in filter panel. 
			for(let header of filtergroupheaders) {
		
				// Enable header clicks to toggle group in filter panel. 
				header.addEventListener('click',toggleFilterGroup);
			}
	
			/**/
	
			// Toggle group in post filter panel. 
			function toggleFilterGroup(event) {
			
				// Get filter group header. 
				let filtergroupheader = event.currentTarget;
			
				// Get filter group. 
				let filtergroup = filtergroupheader.parentElement;
			
				// Toggle filter group. 
				filtergroup.classList.toggle('open');
			}
		}
	
		// Activate filter group items in filter panel. 
		function activateFilterItems() {
		
			// Get loaded items in filter panel. 
			let filterpanelcheckboxes = filterpanel.groupsdestination.querySelectorAll('li.filtergroup div.filterbody ul.itemslist li.filteritem input.checkbox');
		
			// Go thru each item in filter panel. 
			for(let checkbox of filterpanelcheckboxes) {
		
				// Enable toggle of filter item. 
				checkbox.addEventListener('input',applySelectedFilters);
			}
	
			// Enable apply button in filter panel. 
			filterpanel.applybtn.addEventListener('click',applySelectedFilters);
	
			// Enable clear button in filter panel. 
			filterpanel.clearbtn.addEventListener('click',clearAllAppliedFilters);
	
			// Enable checkbox for any/all switch. 
			filterpanel.anyallswitch.checkbox.addEventListener('input',applySelectedFilters);
			// Enable any label: Set filter mode to 'any'. 
			filterpanel.anyallswitch.anybtn.addEventListener('click', ()=>{ filterpanel.anyallswitch.checkbox.checked = false; applySelectedFilters(); } );
			// Enable all label: Set filter mode to 'all'. 
			filterpanel.anyallswitch.allbtn.addEventListener('click', ()=>{ filterpanel.anyallswitch.checkbox.checked = true; applySelectedFilters(); } );
		}
	}
}

// Toggle post filter panel. 
function toggleFilterPanel() {

	// Toggle filter panel. 
	filterpanel.box.classList.toggle('open');
}

// Clear all applied filter items. 
function clearAllAppliedFilters() {

	// Get loaded items in filter panel. 
	let filterpanelcheckboxes = filterpanel.groupsdestination.querySelectorAll('li.filtergroup div.filterbody ul.itemslist li.filteritem input.checkbox');

	// Go thru each item in filter panel. 
	for(let checkbox of filterpanelcheckboxes) {

		// Uncheck checkbox for current filter item. 
		checkbox.checked = false;
	}

	// Apply selected filter items to blog posts. 
	applySelectedFilters();
}

// Apply selected filter items. 
function applySelectedFilters() {

	// Initialize list of selected filter items. 
	let selectedfilteritems = [];

	// Get checkboxes for loaded filter items in filter panel. 
	let filterpanelcheckboxes = filterpanel.groupsdestination.querySelectorAll('li.filtergroup div.filterbody ul.itemslist li.filteritem input.checkbox');

	// Go thru each checkbox in filter panel. 
	for(let checkbox of filterpanelcheckboxes) {

		// Check if filter item selected. 
		if(checkbox.checked) {
			
			// Get box for filter item. 
			let filteritembox = checkbox.parentElement;
			let filtergroupbox = filteritembox.parentElement.parentElement.parentElement;
			// console.log('Filter group box:',filtergroupbox);
			// console.log('Filter item box:',filteritembox);
			// console.log('Filter item checkbox:',checkbox);

			// Get ids for selected filter item. 
			let filtertypeid = filtergroupbox.getAttribute('data-filtertypeid');
			let filtervalueid = filteritembox.getAttribute('data-filteritemvalueid');
			// console.log('Filter item ids:',filtertypeid,filtervalueid);

			// Get caption for selected filter item. 
			let filteritemcaptionbox = filteritembox.querySelector('span.caption');
			let filteritemcaption = filteritemcaptionbox.textContent;
			// console.log('Filter item caption:',filteritemcaption,filteritemcaptionbox);

			// Get unique id for selected filter item. 
			// let filteritemuniqueid = checkbox.id;
			// let filteritemuniqueid = filtertypeid + filtervalueid;
			// console.log('Filter item unique id:',filteritemuniqueid);

			// Save to list: details of selected filter item. 
			selectedfilteritems.push({
				filtertypeid:filtertypeid,
				filtervalueid:filtervalueid,
				caption:filteritemcaption,
			});
			console.log('Selected filter items:',selectedfilteritems);
		}
	}

	// Create layout for list of filter tags. 
	let filtertaglistlayout = selectedfilteritems.map(createFilterTagLayout).join('');
	// console.log('filtertaglistlayout:',filtertaglistlayout);

	// Display layout for list of filter tags. 
	filterpanel.taglistdestination.innerHTML = filtertaglistlayout;
	// console.log('Selected filter items:',selectedfilteritems);

	// Apply selected filter values to loaded blog posts. 
	loadBlog(selectedfilteritems);

	/****/

	// Create layout for filter tag. 
	function createFilterTagLayout(filteritem) {

		// Get unique id of selected filter item. 
		let filteritemuniqueid = filteritem.filtertypeid + filteritem.filtervalueid;

		// Get caption for selected filter item. 
		let filteritemcaption = filteritem.caption;

		// 
		return `
		<!-- filtertag -->
		<li class="filtertag">

			<!-- removebtn -->
			<label class="removebtn" for="${filteritemuniqueid}">

				<!-- caption -->
				<span class="caption">${filteritemcaption}</span>
				<!-- /caption -->

				<!-- icon -->
				<svg class="icon x" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
					<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
				<!-- /icon -->

			</label>
			<!-- /removebtn -->

		</li>
		<!-- /filtertag -->`;
	}
}


/*****/


// // TODO: Remove given filter tag from list of applied filter items. 
// function removeFilterTag(/* filteritemtag */) {
// 	// console.log('filteritemtag:',filteritemtag);

// 	// TODO: Uncheck associated item in fiter panel. 
// 	// selectedfilteritems.remove;

// 	// Apply selected filter items. 
// 	applySelectedFilters();
// }

// // Check post filter item. 
// function checkFilterItem(event) {

// 	// Get input checkbox. 
// 	let checkbox = event.currentTarget;

// 	// Check if checkbox is on. 
// 	let checkboxOn = checkbox.checked;
// 	console.log('Checkbox on:',checkboxOn,checkbox);

// 	// Apply filter item (if checkbox on). 
// 	if(checkboxOn) applyFilterItem();

// 	// Un-apply filter item (if checkbox not on). 
// 	else unapplyFilterItem();

// 	/**/

// 	// TODO: Apply filter item to blog posts. 
// 	function applyFilterItem() {

// 		// Get value of filter item. 
	
// 		// Update blog posts. 
	
// 		// Update filter items. 
// 	}
	
// 	// TODO: Un-apply filter item to blog posts. 
// 	function unapplyFilterItem(filteritem) {

// 		// Get value of filter item. 
	
// 		// Update blog posts. 
	
// 		// Update filter items. 
// 	}
// }
