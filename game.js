var btcrs = ["red", "blue", "green", "yellow"];
var gp = [];
var ucpa = [];
var level = 0;
var started = false;

$("#start-btn").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $("#start-btn").hide(); // Hide the start button once the game begins
    }
});

$(".btn").click(function() {
    var ucclr = $(this).attr("id");
    ucpa.push(ucclr);
    playSound(ucclr);
    animatePress(ucclr);
    checkAnswer(ucpa.length - 1);
});

function checkAnswer(currentLevel) {
    if (gp[currentLevel] === ucpa[currentLevel]) {
        if (ucpa.length === gp.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Start to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    ucpa = [];
    level++;
    $("#level-title").text("Level " + level);
    var rn = Math.floor(Math.random() * 4);
    var rccr = btcrs[rn];
    gp.push(rccr);
    $("#" + rccr).fadeOut(100).fadeIn(100);
    playSound(rccr);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gp = [];
    started = false;
    $("#start-btn").show(); // Show the start button again for a restart
}

// Toggle instructions on button click
$("#instructions-btn").click(function() {
    $("#instructions").toggle();
});