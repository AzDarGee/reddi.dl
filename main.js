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

	        $.get( "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=100", function( reddit ) {
	        	console.log(reddit);
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
				oldSubReddit = subreddit;
		    });
	    }
	});

    








});