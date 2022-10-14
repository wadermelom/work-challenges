console.log("Starting. . . ");

let canvas = document.querySelector("canvas");
let view = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

view.fillStyle = "white";
view.strokeStyle = "white";



class Ball {
    y = 200;
    x = 200;
    height = 5;
    width = 5;
    dx = 2;
    dy = 2;
    dmax = 4;

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = Math.random() * this.dmax - 2;
        this.dy = Math.random() * this.dmax - 2;
    }

    draw() {
        // size of the square ball
        view.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        // enable this for circle balls but they run slower
        // view.beginPath();
        // view.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        // view.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > canvas.width || this.x < 0) {
            this.dx = -this.dx;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

// an array to make many instances of balls

let balls = [];
for (let i = 0; i < 100; ++i) {
    balls.push(new Ball());
}

// animation loop cleanly with the clearRect

function animate(timestamp) {
    requestAnimationFrame(animate);
    view.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }
    connect();
}

// generating lines between the balls with opacity based on the distance between them

function connect() {
    for (let i = 0; i < balls.length; i++) {
        for (let a = i; a < balls.length; a++) {
            const x = (balls[i].x - balls[a].x) ** 2;
            const y = (balls[i].y - balls[a].y) ** 2;
            let distance = 150 - Math.sqrt(x + y);

            if (distance < 150) {
                const strokeStyle = `rgba(255, 255, 255, ${distance / 80})`;

                view.strokeStyle = strokeStyle;
                view.lineWidth = 1;
                view.beginPath();
                view.moveTo(balls[i].x, balls[i].y);
                view.lineTo(balls[a].x, balls[a].y);
                view.stroke();
            }
        }
    }
}

requestAnimationFrame(animate);

// resizes the canvas with the window and makes sure the balls/lines retain their colour

function resize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    view.fillStyle = "white";
    view.strokeStyle = "white";
}

addEventListener("resize", resize);