// Counter

var myText = document.querySelector('textarea');

var counter = document.querySelector('.counter span');

var detected = document.querySelector('.detected');

myText.addEventListener("input", function() {
    var num = (myText.value).length;
    counter.innerHTML = num;
})

// Jauges

// Toutes les jauges
var allGauges = document.querySelectorAll('.inner');

// Joie
var innerJoy = document.querySelector('.joy .inner');

// Tristesse
var innerSad = document.querySelector('.sadness .inner');

// Surprise
var innerSurprise = document.querySelector('.surprise .inner');

// Peur
var innerFear = document.querySelector('.fear .inner');

// Colère
var innerAnger = document.querySelector('.anger .inner');

// Dégoût
var innerDisgust = document.querySelector('.disgust .inner');

// API key
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f205411b29msh079b17d68106e33p1e9cfajsn88567ede1b77',
		'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
	}
};

// button
var button = document.querySelector('button');

// add click listener on button
button.addEventListener("click", function() {
    var text = myText.value.replaceAll(" ", "%20");
    fetch(`https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=${text}`, options)
	.then(response => response.json())
	.then(response => displayEmotions(response))
	.catch(err => console.error(err));
});

// I am sad because i fear too much for my future.

function displayEmotions(response) {
    detected.innerHTML = `
        <h3>Emotions detected: ${response.emotions_detected.length}</h3>    
    `;
    const emotions = Object.keys(response.emotion_scores);
    emotions.forEach((emotion) => {
        const score = Math.round(response.emotion_scores[emotion]*100) + "%";
        allGauges.forEach(function(gauge) {
            if (gauge.dataset.emotion == emotion && parseInt(score) >= 10) {
                gauge.style.width = score;
            }
        })
        if (score != "0%") {
            detected.innerHTML += `
                <p>${emotion}: ${score}</p>
            `;
        }
    });
}

// failure

// var joyScore = Math.round(response.emotion_scores.joy * 100) + "%";
//     console.log(joyScore);
//     var sadScore = Math.round(response.emotion_scores.sadness * 100) + "%";
//     console.log(sadScore);
//     var surScore = Math.round(response.emotion_scores.surprise * 100) + "%";
//     console.log(surScore);
//     var fearScore = Math.round(response.emotion_scores.fear * 100) + "%";
//     console.log(fearScore);
//     var angScore = Math.round(response.emotion_scores.anger * 100) + "%";
//     console.log(angScore);
//     var disScore = Math.round(response.emotion_scores.disgust * 100) + "%";
//     console.log(disScore);
//     // change the width of the gauges
//     innerJoy.style.width = joyScore;
//     innerSad.style.width = sadScore;
//     innerSurprise.style.width = surScore;
//     innerFear.style.width = fearScore;
//     innerAnger.style.width = angScore;
//     innerDisgust.style.width = disScore;