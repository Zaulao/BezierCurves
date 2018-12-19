var container = document.getElementById('container');
var canvas = document.getElementById('canvas');
var degree = document.getElementById('degree');
var newDegree = document.getElementById('degree').value;
var ctx = canvas.getContext('2d');
var points = [];
var curves = [];
var count = +newDegree+1;

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
    
});


//aqui
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
    } 
});

document.getElementById("clear").onclick = function(){
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

function draw(e) {
    var rect = canvas.getBoundingClientRect();
    posx = e.pageX-rect.left;
    posy = e.pageY-rect.top;
    ctx.beginPath();
    ctx.fillStyle = "#BE9063";
    ctx.arc(posx, posy, 4 , 0, 2*Math.PI);
    ctx.fill();
}

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
        x:200,
        y:0
    },
    {
        x:300,
        y:100
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]

const ctrlPoints2 = [
    {
        x: 200,
        y: 100
    },
    {
        x: 200,
        y: 300
    },
    {
        x:100,
        y:300
    },
    {
        x:300,
        y:400
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]

const ctrlPoints3 = [
    {
        x: 200,
        y: 400
    },
    {
        x: 350,
        y: 450
    },
    {
        x:400,
        y:200
    },
    {
        x:500,
        y:300
    }

    // {
    //     x:350,
    //     y:200
    // }
    
]
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

const drawCurve = (points, t) => {
    if (points.length == 1) {
        var a = points[0].x
        var b = points[0].y
        ctx.lineTo(a, b)
        ctx.stroke()
    }
    else {
        var newpoints = []
        for(i=0; i < points.length - 1; i++) {
            var x = (1-t) * points[i].x + t * points[i+1].x
            var y = (1-t) * points[i].y + t * points[i+1].y
            newpoints.push({x, y})
        }
        drawCurve(newpoints, t)
    }
}

// for(var t = 0; t <= 1; t+=0.01) {
//     drawCurve(ctrlPoints1, t)
// }
// ctx.moveTo(200, 100)
// for(var t = 0; t <= 1; t+=0.01) {
//     drawCurve(ctrlPoints2, t)
// }

ctx.moveTo(200, 400)
let ctrlPoints = [ctrlPoints1, ctrlPoints2, ctrlPoints3]
// let aux = []
// for(var c = 0; c < ctrlPoints.length; c++) {
//     for(var i = 0; i < ctrlPoints1.length; i++) {
//         aux.push({
//             x: ctrlPoints[c][i].x,
//             y: ctrlPoints[c][i].y
//         })
//     }
// }

for(var i = 0; i < ctrlPoints.length; i++){
    for(var c = 0; c < ctrlPoints1.length; c++){
        ctx.beginPath();
        ctx.arc(ctrlPoints[i][c].x, ctrlPoints[i][c].y, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
ctx.beginPath()
ctx.moveTo(50,50)

for(var t = 0; t <= 1; t+=0.01) {
    console.log('a')
    for( var c = 0; c < ctrlPoints.length; c++){
        drawCurve(ctrlPoints[c], t)
    }
}