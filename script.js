var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var points = [];


document.getElementById("clear").onclick = function(){
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}
function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}
resizeToFit();

canvas.addEventListener("click", draw, false);

canvas.addEventListener("click", (e) => {
    //console.log(e);
    var p = {
        x: e.offsetX,
        y: e.offsetY
    }
    points.push(p);
})

function draw(e) {
    var rect = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');
    posx = e.pageX-rect.left;
    posy = e.pageY-rect.top;
    ctx.beginPath();
    ctx.fillStyle = "#BE9063";
    ctx.arc(posx, posy, 8 , 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#BE9063";
    ctx.arc(posx, posy, 16 , 0, 2*Math.PI);
    ctx.stroke();
}