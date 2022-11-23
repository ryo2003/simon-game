var level = 1;
var inGame = false;
var pressedButtons = [];
var patterns = [];


$("body").on("keydown", function(event) {
    if (event.key == "a" && inGame == false) {
        //start game
        startGame(1);
    }
});

$(".btn").on("click", function(){

    if (inGame) {

        var pressedButton = $(this);
        pressedButtons.push(this.classList[1]);
        pressedButton.addClass("pressed");
        setTimeout(function(){
        pressedButton.removeClass("pressed");
        }, 100);
        makeSound(this.classList[1]);

        console.log(pressedButtons);
        console.log(patterns);

        if(patterns[pressedButtons.length - 1] != pressedButtons[pressedButtons.length - 1]){
            console.log("gameover");
            inGame = false;
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("#level-title").text("GAME OVER");

        }else if(arraysEqual(pressedButtons, patterns)){
            level += 1;
                console.log(level);
                setTimeout(function(){
                    startGame(level);
                }, 1000);
        }

    }
    });

function startGame(level){

    pressedButtons = [];

    
    $("#level-title").text("level " + level.toString());
    patterns = generatePattern(level);
    flashPattern(patterns);
    
    
}

function generatePattern(level) {
    
    var colors = ["blue","yellow","green","red"];
    var pattern = [];

    for (let index = 0; index < level; index++) {
        // Returns a random integer from 0 to 3:
        var randomNum = Math.floor(Math.random() * 4);
        pattern.push(colors[randomNum]);
    }

    return pattern;
  }

function flashPattern(colors){
    inGame = false;
    for (let i = 0; i < colors.length; i++) {

        setTimeout(function(){
            $("."+colors[i]).addClass("pressed");
            btnClassList = $("."+colors[i]).attr('class').split(/\s+/);
            makeSound(btnClassList[1]);
            setTimeout(function(){
                $("."+colors[i]).removeClass("pressed");
            }, 300);
            if (i == colors.length-1) {
                inGame = true;
            }
        }, 1000*i);
    }   
}

function makeSound(colorOfButton){

    switch(colorOfButton){
        case("yellow"):
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case("green"):
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case("blue"):
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;  
        case("red"):
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;  
        default:console.log(colorOfButton);            
    }
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }