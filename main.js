$( document ).ready(function() {

	var subreddit = "";

	var oldSubReddit = "";

	$("#subreddit").keyup(function(event) {
	    if (event.keyCode === 13) {

	        subreddit = document.getElementById("subreddit").value;

	        var div = document.createElement('div');
	        div.setAttribute('id', subreddit);
	        document.body.appendChild(div);

	        if (document.getElementById(oldSubReddit)) {
	        	document.getElementById(oldSubReddit).remove();	
	        }

	        $.get( "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=1000", function( reddit ) {

			i = 0;
			for (i = 0; i < reddit['data']['children'].length; i++) {
		        var img = document.createElement('img');
				img.setAttribute('class', 'reddit-img');
				img.setAttribute('onerror', 'this.style.display="none"');
				img.src = reddit['data']['children'][i]['data']['url'];
				div.appendChild(img);
			}
			oldSubReddit = subreddit;
	    });
	    }
	});

    








});