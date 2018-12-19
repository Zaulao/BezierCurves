var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var degree = document.getElementById('degree');
var eval = document.getElementById('evaluations');
var newDegree = document.getElementById('degree').value;
var newEval = document.getElementById('evaluations').value;

var ctx = canvas.getContext('2d');
var points = [];
var curves = [];
var count = +newDegree+1;
canvas.width = window.innerWidth;

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

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
    count--;
    var p = new Point(e.offsetX, e.offsetY);
    points.push(p);
    console.log(p);
    if(count == 0){
        curves.push(points);
        points = [];
        count = +newDegree+1;
        console.log(curves);
        drawPolygonal(curves.length-1); 
        drawCurve(ctx, curves[curves.length-1], newEval);
        
    }
    console.log(curves.length);
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
canvas.addEventListener("click", draw, false);

function draw(e) {
    var rect = canvas.getBoundingClientRect();
    posx = e.pageX-rect.left;
    posy = e.pageY-rect.top;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(posx, posy, 4 , 0, 2*Math.PI);
    ctx.fill();
}


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath()


function deCasteljau (points, t) {
    if (points.length == 1) {
        return points[0];
        /*var a = points[0].x;
        var b = points[0].y;
         ctx.lineTo(a, b);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "blue";
        ctx.stroke();*/
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
        console.log("pimba: "+deCasteljau(curves, t));
        curvePoints.push(deCasteljau(curves, t));
        
        t += 1/evaluation;
        console.log("t: "+t);
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

//ctx.moveTo(50, 50)

// const ctrlPoints1 = [
//     {
//         x: 50,
//         y: 50
//     },
//     {
//         x:100,
//         y:100
//     },
//     {
//         x:200,
//         y:0
//     },
//     {
//         x:300,
//         y:100
//     }

//     // {
//     //     x:350,
//     //     y:200
//     // }
    
// ]

// const ctrlPoints2 = [
//     {
//         x: 200,
//         y: 100
//     },
//     {
//         x: 200,
//         y: 300
//     },
//     {
//         x:100,
//         y:300
//     },
//     {
//         x:300,
//         y:400
//     }

//     // {
//     //     x:350,
//     //     y:200
//     // }
    
// ]

// const ctrlPoints3 = [
//     {
//         x: 200,
//         y: 400
//     },
//     {
//         x: 350,
//         y: 450
//     },
//     {
//         x:400,
//         y:200
//     },
//     {
//         x:500,
//         y:300
//     }

//     // {
//     //     x:350,
//     //     y:200
//     // }
    
// ]
// let bf = {
//     x: 0,
//     y: 0
// }

// const get_Interpolation = (t) => {
//     let resultantPoint = {
//         x: 0,
//         y: 0
//     }
//     for(var i = 0; i < ctrlPoints.length; i++) {
//         var ber = getBernstein(t, ctrlPoints.length - 1, i)
//         resultantPoint.x += ber * ctrlPoints[i].x
//         resultantPoint.y += ber * ctrlPoints[i].y
//     }
//     return resultantPoint
// }

// const getBernstein = (t, n, i) => {
//     let c = comb(n, i)
//     pot1 = Math.pow(1 - t, n - i)
//     pot2 = Math.pow(t, i)
//     return pot1 * pot2 * c
// }

// const comb = (n, i) => {
//     console.log(fat(n, 1))
//     console.log(fat(i, 1))
//     console.log(fat(n-i, 1))
//     return fat(n, 1) / fat(i, 1) * fat(n - i, 1)
// }

// const fat = (n, sum) => {
//     if (n == 0) {
//         return sum
//     }
//     return fat(n-1, n * sum)
// }


// // ctx.moveTo(200, 100)
// // for(var t = 0; t <= 1; t+=0.01) {
// //     drawCurve(ctrlPoints2, t)
// // }

// ctx.moveTo(200, 400)
// let ctrlPoints = [ctrlPoints1, ctrlPoints2, ctrlPoints3]
// // let aux = []
// // for(var c = 0; c < ctrlPoints.length; c++) {
// //     for(var i = 0; i < ctrlPoints1.length; i++) {
// //         aux.push({
// //             x: ctrlPoints[c][i].x,
// //             y: ctrlPoints[c][i].y
// //         })
// //     }
// // }

// for(var i = 0; i < ctrlPoints.length; i++){
//     for(var c = 0; c < ctrlPoints1.length; c++){
//         ctx.beginPath();
//         ctx.arc(ctrlPoints[i][c].x, ctrlPoints[i][c].y, 20, 0, 2 * Math.PI);
//         ctx.stroke();
//     }
// }
// ctx.beginPath()
// ctx.moveTo(50,50)

// for(var t = 0; t <= 1; t+=0.01) {
//     console.log('a')
//     for( var c = 0; c < ctrlPoints.length; c++){
//         drawCurve(ctrlPoints[c], t)
//     }
// }