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
const ctrlPoints = [
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
    },
    // {
    //     x:350,
    //     y:200
    // }
    
]
let bf = {
    x: 0,
    y: 0
}

const get_Interpolation = (t) => {
    let resultantPoint = {
        x: 0,
        y: 0
    }
    for(var i = 0; i < ctrlPoints.length; i++) {
        var ber = getBernstein(t, ctrlPoints.length - 1, i)
        resultantPoint.x += ber * ctrlPoints[i].x
        resultantPoint.y += ber * ctrlPoints[i].y
    }
    return resultantPoint
}

const getBernstein = (t, n, i) => {
    let c = comb(n, i)
    pot1 = Math.pow(1 - t, n - i)
    pot2 = Math.pow(t, i)
    return pot1 * pot2 * c
}

const comb = (n, i) => {
    console.log(fat(n, 1))
    console.log(fat(i, 1))
    console.log(fat(n-i, 1))
    return fat(n, 1) / fat(i, 1) * fat(n - i, 1)
}

const fat = (n, sum) => {
    if (n == 0) {
        return sum
    }
    return fat(n-1, n * sum)
}

for(var t = 0; t <= 1; t+=0.01) {
    bf = get_Interpolation(t)
    console.log(bf)
    ctx.lineTo(bf.x, bf.y)
    ctx.stroke()
}