var colors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;
var gamePattern = [];
var userPattern = [];

$(document).keypress(function (e) { 
    if(!started)
    {
        started = true;
        setTimeout(function()
            {
                proceed();
            },250);
    }
});

$(".btn").click(function (e) { 
    if(started)
    {
        if($(this).hasClass("green"))
        {
            var clickedColor = "green";
        }
        else if($(this).hasClass("red"))
        {
            var clickedColor = "red";
        }
        else if($(this).hasClass("yellow"))
        {
            var clickedColor = "yellow";
        }
        else if($(this).hasClass("blue"))
        {
            var clickedColor = "blue";
        }
        userPattern.push(clickedColor);
        playSound(clickedColor);
        animate(clickedColor);
        check();
    }
});
function playSound(fileName)
{
    var audio = new Audio("sounds/"+fileName+".mp3");
    audio.play();
}
function animate(color)
{
    $("."+color).fadeOut(150).fadeIn(150);
}

function proceed()
{
    level += 1;
    $("h1").html("Level<br><br>" + level);
    userPattern = [];
    randomIndex = Math.floor(Math.random()*4);
    randomColor = colors[randomIndex];
    gamePattern.push(randomColor);
    playSound(randomColor);
    animate(randomColor);
}

function check()
{
    if(userPattern[userPattern.length-1] === gamePattern[userPattern.length-1])
    {
        if(gamePattern.length === userPattern.length)
        {
            setTimeout(function()
            {
                proceed();
            },750);
        }
    }
    else
    {
        started = false;
        gameOver();
    }
}

function gameOver()
{
    playSound("wrong");
    $("body").fadeOut(100).fadeIn(100);
    $("body").css("backgroundColor", "#f05945");
    $("h1").css("color", "black");
    setTimeout(function(){
        $("body").fadeOut(100).fadeIn(500);
        $("body").css("backgroundColor", "#2b2e4a");
        $("h1").css("color", "#E7A12D");
    },100)

    userPattern = [];
    gamePattern = [];
    level = 0;
    $("h1").html("Game Over<br><br>Press any key to restart");
}