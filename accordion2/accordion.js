

// Define accordion data. 
let acdata = [
	{
		groupname:'Profile',
		innersvg:'<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>',
		grouplist:[
			{
				name:'Posts',
				link:'javascript:void(0)'
			},
			{
				name:'Pictures',
				link:'javascript:void(0)'
			},
		]
	},
	{
		groupname:'Messages',
		innersvg:'<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>',
		grouplist:[
			{
				name:'New',
				link:'javascript:void(0)'
			},
			{
				name:'Sent',
				link:'javascript:void(0)'
			},
			{
				name:'Spam',
				link:'javascript:void(0)'
			},
		]
	},
	{
		groupname:'Settings',
		innersvg:'<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>',
		grouplist:[
			{
				name:'Password',
				link:'javascript:void(0)'
			},
			{
				name:'Language',
				link:'javascript:void(0)'
			},
		]
	},
	{
		groupname:'Logout',
		innersvg:'<path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>',
		grouplist:[
			// {
			// 	name:'Xyz',
			// 	link:'javascript:void(0)'
			// },
			// {
			// 	name:'Xyz',
			// 	link:'javascript:void(0)'
			// },
		]
	},
	// {
	// 	groupname:'Xyz',
	// 	innersvg:'xyz',
	// 	grouplist:[
	// 		{
	// 			name:'Xyz',
	// 			link:'javascript:void(0)'
	// 		},
	// 		{
	// 			name:'Xyz',
	// 			link:'javascript:void(0)'
	// 		},
	// 	]
	// },
];

// Initialize accordion content. 
let result = '';

// Create accordion elements. 
for(let acgroup of acdata) {
	result += `
	<!-- group -->
	<section class="group">`;
	result += `
		<!-- name -->
		<div class="name" onclick="this.parentElement.classList.toggle('active')">

			<!-- icon -->
			<svg class="icon" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
				${acgroup.innersvg}
			</svg>
			<!-- /icon -->
			
			<!-- caption -->
			<span class="caption">${acgroup.groupname}</span>
			<!-- /caption -->
			
		</div>
		<!-- /name -->
		
		<!-- aclist -->
		<ul class="aclist">`;
	for(let acitem of acgroup.grouplist) {
		// 
		result += `
			<!-- acitem -->
			<li class="acitem">
				
				<!-- aclink -->
				<a href="${acitem.link}" class="aclink">${acitem.name}</a>
				<!-- /aclink -->
				
			</li>
			<!-- /acitem -->`;
	}
	result += `
		</ul>
		<!-- /aclist -->
		
	</section>
	<!-- /group -->`;
	// result += ``;
}

// Add accrodion contents to page. 
document.getElementById('accordion').innerHTML = result;