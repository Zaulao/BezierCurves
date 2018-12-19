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

const ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath()
ctx.moveTo(50, 50)
const ctrlPoints1 = [
    {
        x: 50,
        y: 50
    },
    {
        x:100,
        y:100
    },
    {
        x:50,
        y:150
    },
    {
        x:100,
        y:200
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]

const ctrlPoints2 = [
    {
        x: 200,
        y: 50
    },
    {
        x: 250,
        y: 100
    },
    {
        x:200,
        y:150
    },
    {
        x:250,
        y:200
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]

const ctrlPoints3 = [
    {
        x: 400,
        y: 50
    },
    {
        x: 450,
        y: 100
    },
    {
        x:400,
        y:150
    },
    {
        x:450,
        y:200
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]

const drawCurve = (points, t) => {  // Casteljau
    if (points.length == 1) {
        var a = points[0].x
        var b = points[0].y
        ctx.lineTo(a, b)
        ctx.stroke()
        // ctx.beginPath()
        // ctx.moveTo(a, b)
        var r = {x: a, y: b}
        return (r)
    }
    else {
        var newpoints = []
        for(i=0; i < points.length - 1; i++) {
            var x = (1-t) * points[i].x + t * points[i+1].x
            var y = (1-t) * points[i].y + t * points[i+1].y
            newpoints.push({x, y})
        }
        return drawCurve(newpoints, t)
    }
}

let ctrlPoints = [ctrlPoints1, ctrlPoints2, ctrlPoints3]
let u = []
for(var i = 0; i < ctrlPoints.length; i++){ //Control Points Circles
    for(var c = 0; c < ctrlPoints1.length; c++){
        ctx.beginPath();
        ctx.arc(ctrlPoints[i][c].x, ctrlPoints[i][c].y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

for(var t = 0; t <= 1; t+=1/100) { //superficie de Bezier
    u = []
    ctx.beginPath();
    for( var c = 0; c < ctrlPoints.length; c++){
        // ctx.moveTo(ctrlPoints[c][0].x, ctrlPoints[c][0].y)
        u.push(drawCurve(ctrlPoints[c], t))
    }
    ctx.moveTo(u[0].x, u[0].y)
    for(var i = 0; i <= 1; i+=1/100) {
        drawCurve(u, i)
    }
}