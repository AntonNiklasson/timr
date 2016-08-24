window.onload = function() {

	// Grab the input and the button.
	var input = document.querySelector('input');
	var button = document.querySelector('button');

	// Setup a change listener on the input.
	input.addEventListener('input', function(e) {
		checkInput(input.value);
	});

	// Initially call the conversion function
	checkInput(input.value);

	// Listen for clicks on the button.
	button.addEventListener('click', function(e) {
		startCountdown(stringToSeconds(input.value));
		input.value = "";
	});
}

function checkInput(input) {
	var result = stringToSeconds(input);
	var startBtn = document.querySelector('button');

	if(result) {
		startBtn.style.display = 'block';	
	} else {
		startBtn.style.display = 'none';
	}
}

/***
* Possible inputs to this function:
* 
* 60s
* 10M30S
* 1H20m30s
* 1h
***/
function stringToSeconds(input) {

	var secondsPattern = /[0-9]+s/i;
	var minutesPattern = /[0-9]+m/i;
	var hoursPattern   = /[0-9]+h/i;

	var timestamp = 0;

	// Grab the amount of seconds.
	var match = input.match(secondsPattern);

	if(match) {
		
		// Grab the seconds, without the "s".
		var secondsString = match[0];
		var seconds = secondsString.substring(0, secondsString.length - 1);

		// Add milliseconds to the timestamp.
		timestamp += seconds;

		// Trim the input string.
		input = input.substring(match.index, secondsString.length);
	} else {
		console.warn('No match, input = ', input);
	}

	return timestamp;
}

/***
 * Start a countdown with `amount` number of milliseconds.
 ***/
function startCountdown(amount) {
	var secondsLeft = amount;
	var countdownElement = document.querySelector('.countdown');

	var countdown = setInterval(function() {
		if(secondsLeft === 0) {
			clearInterval(countdown);
			console.log('Done! 😍');
		} else {
			secondsLeft -= 1;
			countdownElement.innerHTML = secondsLeft;
		}
	}, 1000);
};
