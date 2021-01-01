
// This prevents the page from scrolling down to where it was previously.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded.Cross-browser supported.
window.scrollTo(0,0);

function scroll(speed) {
    $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }, speed, function() {
        $(this).animate({ scrollTop: 0 }, speed);
    });
}

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

	let subreddit = "";

	let oldSubReddit = "";

	let pageScroll = false;

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

	        $.get("https://www.reddit.com/r/" + subreddit + "/hot.json?limit=10000", function( reddit ) {
				if (reddit) {
					loader.style.display = 'none';
					i = 0;
					for (i = 0; i < reddit['data']['children'].length; i++) {
						var div2 = document.createElement('div');
			        	div2.setAttribute('id', "subredditInnerDiv");
						
						var div3 = document.createElement('div');
						div3.setAttribute('class', 'text-overlay');
						
						var h1 = document.createElement('h1');
						h1.setAttribute('class', 'image-text-overlay');
						h1.innerText = reddit['data']['children'][i]['data']['title'];

						var img = document.createElement('img');
						img.setAttribute('class', 'reddit-img');
						img.setAttribute('onerror', 'this.style.display="none"');
						img.setAttribute('alt', reddit['data']['children'][i]['data']['title']);
						img.src = reddit['data']['children'][i]['data']['url'];
						
						div.appendChild(div2);
						div2.appendChild(img);
						div2.appendChild(div3);
						div3.appendChild(h1);
					}

					var pageTop = document.createElement('a');
					pageTop.setAttribute('id', 'pageTop');
				    pageTop.setAttribute('class', 'pageTop');
				    pageTop.setAttribute('href', '#top');
				    pageTop.innerText = "TOP";
				    document.body.appendChild(pageTop);

					oldSubReddit = subreddit;

					pageScroll = true;
					
				}
			});
		}
	});
});

