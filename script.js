var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var degree = document.getElementById('degree');
var eval = document.getElementById('evaluations');
var newDegree = document.getElementById('degree').value;
var newEval = document.getElementById('evaluations').value;
var controlPointsElem = document.getElementById('controlPoints');
var controlPoligonalElem = document.getElementById('controlPoligonal');
var bezierCurveElem = document.getElementById('BezierCurve');
var surfaceOp = document.getElementById('surface');
var drawSurfaceop = false;

var ctx = canvas.getContext('2d');
var curves = [];
curves[0] = [];
var count = +newDegree+1;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var globalI = 0;
var globalJ = 0;
var move = false;
var globalRadius = 8;

controlPointsElem.addEventListener(("change"), (e) => {
    drawEverything();
});
controlPoligonalElem.addEventListener(("change"), (e) => {
    drawEverything();
});
bezierCurveElem.addEventListener(("change"), (e) => {
    drawEverything();
});

surfaceOp.addEventListener(("change"), (e) => {
    drawEverything();
})

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
    if(surfaceOp.checked){
        drawfinal();
    }

}

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = globalRadius;
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
        console.log(moveIndexI + " " +  moveIndexJ);
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
    curves = [];
    curves[0] = [];
    globalI = 0;
    globalJ = 0;
});

eval.addEventListener("change", (e) => {
    newEval = document.getElementById('evaluations').value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves = [];
    curves[0] = [];
    globalI = 0;
    globalJ = 0;
    
});

function drawPolygonal(i){
    for(let j=0;j<curves[i].length-1; j++){
        const p1 = curves[i][j];
        const p2 = curves[i][j+1];
        drawLine(ctx, p1,p2, "#223f47");      
    }
}

canvas.addEventListener("mousedown", (e) => {
    move = clickedAnyPoint({
        x: e.offsetX,
        y: e.offsetY
    }) 
    if(!move){
        var p = new Point(e.offsetX, e.offsetY);
        addPoint(p);
    }
    drawEverything();
});

function addPoint(p){
    if(globalJ == +newDegree+1){
        globalI+=1;
        globalJ=0;
        curves[globalI] = [];
    }
    curves[globalI][globalJ] = p;
    globalJ+=1;
}

document.getElementById("clear").onclick = function(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   curves = [];
   curves[0] = [];
   globalI = 0;
   globalJ = 0;
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

//draw points from the clicks
function draw(e) {
    var rect = canvas.getBoundingClientRect();
    posx = e.pageX-rect.left;
    posy = e.pageY-rect.top;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(posx, posy, globalRadius , 0, 2*Math.PI);
    ctx.fill();
}

//draw points from the curves array
function drawPoints(point){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(point.x, point.y, globalRadius , 0, 2*Math.PI);
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

function drawfinal(){
    let control = lastCurves(curves);
    drawSurface(ctx, curves)
    drawSurface(ctx, control);
    drawSurfaceop = true;
}

document.getElementById("surface").onclick = function(){
    // let control = lastCurves(curves);
    // drawSurface(ctx, curves)
    // drawSurface(ctx, control);
    // drawSurfaceop = true;
    drawfinal();
};

var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grd.addColorStop(0, "#9400d3");
grd.addColorStop(1/6, "#4b0082");
grd.addColorStop(2/6, "#0000ff");
grd.addColorStop(3/6, "#00ff00");
grd.addColorStop(4/6, "#ffff00");
grd.addColorStop(5/6, "#ff7f00");
grd.addColorStop(1, "ff0000");

function drawSurface(context, curves) {
    context.beginPath()
    let k = [];
    let aux = undefined
    for (let i = 0; i < curves.length; i++) {
        k.push(curves[i][0])
    }
    for (let t = 0; t < 1; t+=1/newEval) {
        for (let c = 0; c < curves.length; c++) {
            context.moveTo(k[c].x, k[c].y)
            k[c] = deCasteljau(curves[c], t)
            context.lineTo(k[c.x], k[c].y)
        }
        ctx.moveTo(k[0].x, k[0].y)
        for (let i = 0; i < 1; i+=1/newEval) {
            aux = deCasteljau(k, i)
            context.lineTo(aux.x, aux.y)
            context.strokeStyle = grd;
            context.lineWidth = 0.5;
            context.stroke()
        }
        aux = deCasteljau(k, 1)
        context.lineTo(aux.x, aux.y)
        context.strokeStyle = grd;
        context.lineWidth = 0.5;
        context.stroke()
    }
    for (let c = 0; c < curves.length; c++) {
        context.moveTo(k[c].x, k[c].y)
        k[c] = deCasteljau(curves[c], 1)
        context.lineTo(k[c.x], k[c].y)
    }
    ctx.moveTo(k[0].x, k[0].y)
    for (let i = 0; i < 1; i+=1/newEval) {
        aux = deCasteljau(k, i)
        context.lineTo(aux.x, aux.y)
        context.strokeStyle = grd;
        context.lineWidth = 0.5;
        context.stroke()
    }
    aux = deCasteljau(k, 1)
    context.lineTo(aux.x, aux.y)
    context.strokeStyle = grd;
    context.lineWidth = 0.5;
    context.stroke()
    
}

function lastCurves(curves) {
    let control = [];
    for (let i = 0; i < curves[0].length; i++) {
        control.push([]);
        for (let j = 0; j < curves.length; j++)
            control[i].push(curves[j][i]);
    }
    return control;
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