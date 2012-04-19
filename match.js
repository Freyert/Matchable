

var images = ["bunny.jpg", "cat.jpg", "chameleon.jpg", "chicks.jpg", "duckling.jpg", "piglets.jpg", "pony.jpg", "puppy.jpg"];
var sounds = ["./sounds/boing_boing.wav", "./sounds/snaps.wav", "./sounds/chameleon.wav", "./sounds/chicklets.wav", "./sounds/ducklings.wav", "./sounds/pig.m4a", "./sounds/snaps.wav", "./sounds/dog.m4a" ];
var count = images.length * 2;
var rowLength = 4;



function randColor(){
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function MatchCard(imgSrc, count){
	this.image = new Image();
	this.image.src = imgSrc;
	this.image.dataset.card = count; //use this to match
	this.selected = false;
	this.order = Math.random();
}


/**
* Function to shuffle cards.
*
*/
function shuffle(a,b)
{
	if(a.order < b.order)
	{
		return -1;
	}
	if(a.order > b.order)
	{
		return 1;
	}
	else return 0;
}

/*

*/
function buildDeck(imgSrc)
{
	var deck = [];
	var deckLength = imgSrc.length;
	for(var x = 0; x < deckLength; x++)
	{
		deck.push(new MatchCard(imgSrc[x], x));
		deck.push(new MatchCard(imgSrc[x], x));
	}
	
	deck.sort(shuffle);	
	return deck;

}

/*
Adds images to the board in their hidden state.
*/
var matches = []
var kidCheer;
var cardAudio;
function addImages(deck)
{
	

	$("div").each(function(index)
	{
		$(this).append(deck[index].image);
	});
	
	$("img").addClass("hidden"); /*Make all images transparent*/
	
	/*When you click on an image if it is hidden it becomes shown and vice versa*/
	$("img").click( function() {
		if($(this).hasClass("hidden") && !$(this).hasClass("matched"))
		{
			$(this).removeClass("hidden");
			var cardAudSrc = sounds[$(this).data("card")];
			console.log(cardAudSrc);
			cardAudio.attr("src", cardAudSrc); //Plays the card's audio.
			matches.push($(this));

			/*When two cards are up and they don't match, flip all cards over.
			If the cards do match it plays a congratulation tone.
			*/
			if(matches.length === 2)
			{
				if(matches[0].data("card") === matches[1].data("card"))
				{
					kidCheer.play();
					for(x in matches)
					{
						$(matches[x]).addClass("matched");
					}
					matches.length = 0;
				}
				else
				{
					window.setTimeout(function()
					{
						for(x in matches)
						{
							$(matches[x]).addClass("hidden");
						}
						matches.length = 0;
					}, 500);
				}			
			}
		}
		else
		{
			/*Flip card over and remove from set of matches*/
 			$(this).addClass("hidden");
			var thisIndex = matches.indexOf($(this));
			matches.splice(thisIndex, 1);
		}
	});
}

$(document).ready(function() {
	kidCheer = $("audio")[0];
	cardAudio = $("#cardAudio");
	
	var deck = buildDeck(images);
	
	for(var outer = 0; outer < count; ++outer)
	{
		for(var inner = 0; inner < rowLength; ++inner)
		{
		
			$("body").append("<div class='card' style='background-color:"+randColor()+";'>");
			++outer;
		}
	}
	addImages(deck);
});
