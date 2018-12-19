var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var degree = document.getElementById('degree');
var eval = document.getElementById('evaluations');
var newDegree = document.getElementById('degree').value;
var newEval = document.getElementById('evaluations').value;
var controlPointsElem = document.getElementById('controlPoints');
var controlPoligonalElem = document.getElementById('controlPoligonal');
var bezierCurveElem = document.getElementById('BezierCurve');

var ctx = canvas.getContext('2d');
var points = [];
var curves = [];
var count = +newDegree+1;
canvas.width = window.innerWidth;

controlPointsElem.addEventListener(("change"), (e) => {
    drawEverything();
});
controlPoligonalElem.addEventListener(("change"), (e) => {
    drawEverything();
});
bezierCurveElem.addEventListener(("change"), (e) => {
    drawEverything();
});
console.log(controlPointsElem.checked)

function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(controlPointsElem.checked){
        for (var i=0;i<curves.length;i++){
            for(var j=0;j<curves[i].length; j++){
                drawPoints(curves[i][j]);
            }
        }
    }

    if(controlPoligonalElem.checked){
        for(var i=0;i<curves.length;i++){
            drawPolygonal(i)
        }
    }

    if(bezierCurveElem.checked){
        for(var i=0;i<curves.length;i++){
            drawCurve(ctx, curves[i], newEval)
        }
    }

}


class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function isInCircle(circle, click) {
    var v = {
        x: circle.x - click.x,
        y: circle.y - click.y
    };
    return (Math.sqrt(v.x * v.x + v.y * v.y) <= circle.radius);
}

var moveIndexI = 0;
var moveIndexJ = 0;

function clickedAnyPoint(click){
    var touchedAny = false;

    for (let i = 0; i < curves.length; i++) {
        for(let j=0;j < curves[i].length;j++){

            const element = curves[i][j];
            if (isInCircle(element, click)){
                moveIndexI = i;
                moveIndexJ = j;
                touchedAny = true;
            }
        }
    }
    return touchedAny;
}

canvas.addEventListener('mousemove', function(e) {
    if (move) {
        curves[moveIndexI][moveIndexJ].x = e.offsetX;
        curves[moveIndexI][moveIndexJ].y = e.offsetY;
        drawEverything();
    }
});

canvas.addEventListener('mouseup', function(e) {
    move = false;
});

degree.addEventListener("change", (e) => {
    newDegree = document.getElementById('degree').value;
    count = +newDegree+1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    curves = [];
    
});

eval.addEventListener("change", (e) => {
    newEval = document.getElementById('evaluations').value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    curves = [];
    
});

function drawPolygonal(i){
    for(let j=0;j<curves[i].length-1; j++){
        const p1 = curves[i][j];
        const p2 = curves[i][j+1];
        drawLine(ctx, p1,p2, "#223f47");      
    }
}

canvas.addEventListener('click', (e) => {
    move = clickedAnyPoint({
        x: e.offsetX,
        y: e.offsetY
    }) 
    count--;
    var p = new Point(e.offsetX, e.offsetY);
    points.push(p);
    if(controlPointsElem.checked){
        draw(e);
    }
    if(count == 0){
        curves.push(points);
        points = [];
        count = +newDegree+1;
        if(controlPoligonalElem.checked){
            drawPolygonal(curves.length-1); 
        }
    
        if(bezierCurveElem.checked){
            drawCurve(ctx, curves[curves.length-1], newEval);
        }
        
    }
    // drawEverything();
});

document.getElementById("clear").onclick = function(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   points = [];
   curves = [];
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
//canvas.addEventListener("click", draw, false);

//draw points from the clicks
function draw(e) {
    var rect = canvas.getBoundingClientRect();
    posx = e.pageX-rect.left;
    posy = e.pageY-rect.top;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(posx, posy, 8 , 0, 2*Math.PI);
    ctx.fill();
}

//draw points from the curves array
function drawPoints(point){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(point.x, point.y, 8 , 0, 2*Math.PI);
    ctx.fill();
}


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath()


function deCasteljau (points, t) {
    if (points.length == 1) {
        return points[0];
    }
    else {
        var newpoints = []
        for(var i=0; i < points.length - 1; i++) {
            var x = (1-t) * points[i].x + t * points[i+1].x;
            var y = (1-t) * points[i].y + t * points[i+1].y;
            newpoints.push(new Point(x, y));
        }
        return deCasteljau(newpoints, t);
    }
}

function drawCurve(context, curves, evaluation){
    var t = 0;
    var curvePoints = [];
    for(var i = 0; i < +evaluation+1; i++){
        curvePoints.push(deCasteljau(curves, t));
        t += 1/evaluation;
    }

    for(var i = 0; i < curvePoints.length-1; i++){
        drawLine(context, curvePoints[i], curvePoints[i+1], "white");
    }
}

function drawLine(contex, p1, p2, color){
    contex.beginPath();
    contex.moveTo(p1.x, p1.y);
    contex.lineTo(p2.x, p2.y);
    contex.strokeStyle = color;
    contex.lineWidth = 1;
    contex.stroke();
}