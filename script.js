function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}
function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

function isInCircle(click) {
    var v = {
        x: circle.x - click.x,
        y: circle.y - click.y
    };
    return (Math.sqrt(v.x * v.x + v.y * v.y) <= circle.radius);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
    // ctx.lineWidth = '5';
    // ctx.fillStyle = '#BE9063';
    // ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#BE9063";
    ctx.arc(circle.x, circle.y, circle.radius/2 , 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#BE9063";
    ctx.arc(circle.x, circle.y, circle.radius , 0, 2*Math.PI);
    ctx.stroke();
}

var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circle = {
    x: 100,
    y: 100,
    radius: 16
};
var move = false;

resizeToFit();
draw();

canvas.addEventListener('mousedown', function(e) {
    move = isInCircle({
        x: e.offsetX,
        y: e.offsetY
    });
});

canvas.addEventListener('mousemove', function(e) {
    if (move) {
        circle.x = e.offsetX;
        circle.y = e.offsetY;
        draw();
    }
});

canvas.addEventListener('mouseup', function(e) {
    move = false;
});