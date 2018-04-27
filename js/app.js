// Create a list that holds all of your cards
 
 const cards = [
     'img/bass-guitar.svg',
     'img/clarinet.svg',
     'img/drum.svg',
     'img/piano.svg',
     'img/piccolo.svg',
     'img/electric-guitar.svg',
     'img/violin.svg',
     'img/saxophone.svg',
     'img/drum.svg',
     'img/saxophone.svg',
     'img/bass-guitar.svg',
     'img/electric-guitar.svg',
     'img/violin.svg',
     'img/piccolo.svg',
     'img/piano.svg',
     'img/clarinet.svg'
     ];
	 
// create variables	 

let minutes = 0;
let seconds = 0;
let minutesString = '';
let secondsString = '';
let stopCounter = false;
let myTimer;
let pairs = 0;
let moves = 0;
let imagesSources = [];
let imagesIds = [];
let timer = document.getElementById("gameTimer");
let movesId = document.getElementById("moves");
let stars = document.getElementById("stars");

// initialize game on pageload
document.onload=init();

function init(){
	
	document.getElementById("overlay").style.display = "none";
	document.getElementById("summary").style.display = "none";
	 
	// shuffle the list of cards using the provided "shuffle" method below
    let myCards = shuffle(cards);
	let ul = document.getElementById("myDeck");
	ul.innerHTML = '';
	
	// create html of the ul, li and images
	for(let i = 0; i < myCards.length; i++){
		let builtLi = document.createElement("li");
		builtLi.classList.add("card");
		let content = document.createElement("img");
		content.src = myCards[i];
		content.id = "img_" + i;
		content.classList.add("imageDeck");
		builtLi.appendChild(content);
		ul.appendChild(builtLi);
		
		if(builtLi){
			builtLi.addEventListener("click", function(){
				
				let img = document.getElementById(content.id);
				// check if no card has been flipped
				if(imagesSources.length === 0){
					// insert into the array src and id of the image
					imagesSources.push(content.src);
					imagesIds.push(content.id);
					// make image visible to the user
					img.style.visibility = "visible";
					img.classList.add("open");
					img.style.cursor = "default";
					// check for the second image 
					// and avoid comparison between the same card in case of wrong double click on the same card  
				} else if(imagesSources.length < 2 && (imagesIds[0] != content.id)){
					// increment moves counter
					moves++;
					// remove one star every 20 moves
					if(moves >= 20){
						document.getElementById("star-3").classList.remove("fa-star");
						stars.innerHTML = 2;
					}
					if(moves >= 40){
						document.getElementById("star-2").classList.remove("fa-star");
						stars.innerHTML = 1;
					}
					imagesSources.push(content.src);
					imagesIds.push(content.id);
					img.style.visibility = "visible";
					img.style.cursor = "disabled";
					// check if images are equal
					if(imagesSources[0] === imagesSources[1]){
						// increment pairs counter
						pairs++;
						document.getElementById(imagesIds[0]).classList.add("effect");
						document.getElementById(imagesIds[1]).classList.add("effect");
						document.getElementById(imagesIds[0]).style.transition = "transform 1s";
						document.getElementById(imagesIds[1]).style.transition = "transform 1s";
						// reset arrays
						imagesSources = [];
						imagesIds = [];
						// check if all cards have been flipped
						if((pairs * 2) === myCards.length){
							clearTimeout(myTimer);
							endGame();
						}
					// flip back the image with a delay of one second
					} else {
						setTimeout(function(){
							document.getElementById(imagesIds[0]).style.visibility = "hidden";
							document.getElementById(imagesIds[0]).style.cursor = "pointer";
							document.getElementById(imagesIds[1]).style.visibility = "hidden";
							document.getElementById(imagesIds[1]).style.cursor = "pointer";
							imagesSources = [];
							imagesIds = [];
						}, 1000);
					} 
					// update moves counter in the UI
					movesId.innerHTML = moves + " Moves";
				}
			}, false);
		}
	}
	// start the counter
	myTimer = setInterval(startCounter, 1000);
}

function startCounter(){
	if(minutes < 10){
		minutesString = "0" + minutes;
	} else {
		minutesString = minutes;
	}
	
	if(seconds < 10){
		secondsString = "0" + seconds;
	} else {
		secondsString = seconds;
	}
	
	timer.innerHTML = minutesString + ":" + secondsString;
	seconds++;
	if(seconds > 59){
		seconds = 0;
		minutes++;
	}		
}

function endGame(){
	document.getElementById("totalMoves").innerHTML = moves;
	document.getElementById("totalTime").innerHTML = minutesString + ":" + secondsString;
	document.getElementById("overlay").style.display = "block";
	document.getElementById("summary").style.display = "block";
}

function restartGame(){
	document.getElementById("gameTimer").innerHTML = "00:00";
	document.getElementById("moves").innerHTML = "0 Moves";
	document.getElementById("star-1").classList.add("fa-star");
	document.getElementById("star-2").classList.add("fa-star");
	document.getElementById("star-3").classList.add("fa-star");
	minutes = 0;
	minutesString = '00';
	secondsString = '00';
	seconds = 0;
	moves = 0;
	pairs = 0;
	clearTimeout(myTimer);
	init();
}
let restart = document.getElementById("restartGame");
restart.addEventListener("click", restartGame);
//myTimer = setInterval(startCounter, 1000);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}