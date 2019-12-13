
// This prevents the page from scrolling down to where it was previously.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded.Cross-browser supported.
window.scrollTo(0,0);

$( document ).ready(function() {

	// Sticky Header / Input

	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 0;

	window.addEventListener("scroll", () => {
	  
		const currentScroll = window.pageYOffset;

		if (currentScroll == 0) {
			body.classList.remove(scrollUp);
			return;
		}

		if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
			// down
			body.classList.remove(scrollUp);
			body.classList.add(scrollDown);
		} else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
			// up
			body.classList.remove(scrollDown);
			body.classList.add(scrollUp);
		}
		lastScroll = currentScroll;	
	});
	
	// const r = new snoowrap({
	//   userAgent: 'script',
	//   clientId: '',
	//   clientSecret: '',
	//   username: '',
	//   password: ''
	// });

	// r.config({ proxies: false });

	var subreddit = "";

	var oldSubReddit = "";

	loader = document.getElementById("loading");

	$("#subreddit").keyup(function(event) {
	    if (event.keyCode === 13) {

	    	loader.style.display = "block";
	        subreddit = document.getElementById("subreddit").value;

	        var div = document.createElement('div');
	        div.setAttribute('id', subreddit);
	        document.body.appendChild(div);

	        if (document.getElementById(oldSubReddit)) {
	        	document.getElementById(oldSubReddit).remove();	
	        } 
	        if (document.getElementById('pageTop')) {
	        	document.getElementById('pageTop').remove();	
	        }

	        $.get("https://www.reddit.com/r/" + subreddit + "/hot.json?limit=100", function( reddit ) {
				if (reddit) {
					loader.style.display = 'none';
					i = 0;
					for (i = 0; i < reddit['data']['children'].length; i++) {
						var div2 = document.createElement('div');
			        	div2.setAttribute('id', "subredditInnerDiv");
				        var img = document.createElement('img');
						img.setAttribute('class', 'reddit-img');
						img.setAttribute('onerror', 'this.style.display="none"');
						img.setAttribute('alt', reddit['data']['children'][i]['data']['title']);
						img.src = reddit['data']['children'][i]['data']['url'];
						div2.appendChild(img);
						div.appendChild(div2);
					}
					var pageTop = document.createElement('a');
					pageTop.setAttribute('id', 'pageTop');
				    pageTop.setAttribute('class', 'pageTop');
				    pageTop.setAttribute('href', '#top');
				    pageTop.innerText = "TOP";
				    document.body.appendChild(pageTop);

					oldSubReddit = subreddit;
				}
		    });

	        // Get Images
	  //       r.getSubreddit(subreddit).getTop({time: 'all'}).then(myListing => {
			//     myListing.fetchMore({amount: 10}).then(extendedListing => {
			//     	if (extendedListing) {
			//     		loader = document.getElementById("loading");
			//     		loader.style.display = "none";

			//     		allPics = extendedListing.map(submission => submission.url); 
			// 	    	allTitles = extendedListing.map(submission => submission.title);
			// 	    	allPics.forEach(function(url, index) {
			// 		    	var div2 = document.createElement('div');
			// 	        	div2.setAttribute('id', "subredditInnerDiv");
			// 		        var img = document.createElement('img');
			// 				img.setAttribute('class', 'reddit-img');
			// 				img.setAttribute('onerror', 'this.style.display="none"');
			// 				img.setAttribute('alt', allTitles[index]);
			// 				img.setAttribute('title', allTitles[index]);
			// 				img.src = url;
			// 				div2.appendChild(img);
			// 				div.appendChild(div2);
			// 		    });

			// 		    var pageTop = document.createElement('a');
			// 		    pageTop.setAttribute('class', 'pageTop');
			// 		    pageTop.setAttribute('href', '#top');
			// 		    pageTop.innerText = "TOP";
			// 		    document.body.appendChild(pageTop);
			//     	}
	  // 			})
			// });
	        
		  	// oldSubReddit = subreddit;
	    }
	});
});