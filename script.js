const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath()
ctx.moveTo(0, 0)
const ctrlPoints = [
    {
        x: 0,
        y: 0
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