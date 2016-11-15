var TILE_SIZE = 10;
var w = 32 * 10;
var h = 32 * 10;
var c = "<canvas id=\"lightticker\" width=\"" + w + "\" height=\"" + h + "\"></canvas>";

document.getElementsByTagName("body")[0].innerHTML += c;

var canvas = document.getElementById("lightticker");
var context = canvas.getContext("2d");

var screen = null;
var getMapData = new XMLHttpRequest();
getMapData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        screen = this;
    }
};
getMapData.open("GET", "/src/map.json", true);
getMapData.send();


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function i2xy(index, mapWidth) {
    var x = index % mapWidth;
    var y = Math.floor(index / mapWidth);
    return [x, y];
}

function draw() {

    context.beginPath();
    for (var i = 0; i < screen.length; i++) {
        var xy = i2xy(i, canvas.width / TILE_SIZE);
        context.fillStyle = rgbToHex(screen[i][0], screen[i][1], screen[i][2]);
        context.fillRect(xy[0] * TILE_SIZE, xy[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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


var checkData = setInterval(function () {
    if (screen != null) {
        clearInterval(checkData);
        screen = JSON.parse(screen.responseText);
        animate();
    }
}, 12);
