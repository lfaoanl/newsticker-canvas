var TILE_SIZE = 10;
var w = 32 * 10;
var h = 32 * 10;
var c = "<canvas id=\"lightticker\" width=\"" + w + "\" height=\"" + h + "\"></canvas>";

document.getElementsByTagName("body")[0].innerHTML += c;

var canvas = document.getElementById("lightticker");
var context = canvas.getContext("2d");


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw() {

    context.beginPath();
    for (var y = 0; y < 32; y++) {
        for (var x = 0; x < 32; x++) {
            context.fillStyle = getRandomColor();
            context.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    context.stroke();
    context.closePath();
}

var timer = 0;
var maxTimer = 50;
function animate() {
    timer++;
    if (timer == maxTimer) {
        timer = 0;
        draw();
    }

    setTimeout(function () {
        window.requestAnimationFrame(function () {
            animate();
        });
    }, 12);
}



animate();
