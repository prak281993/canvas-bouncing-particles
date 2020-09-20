const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const number = 300;

let particlesArray = [];

// measure title element
let titleElement = document.getElementById("title1");
titleMeasurement = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurement.left,
  y: titleMeasurement.top,
  width: titleMeasurement.width,
  height: 10,
};

class Particle {
  constructor(x, y, fill) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = Math.random() * -2 + 1;
    this.fill = fill;
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.3;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.directionX;

    // check for collision between each particle and title element
    if (
      this.x < title.x + title.width &&
      title.x < this.x + this.size &&
      this.y < title.y + title.height &&
      title.y < this.y + this.size
    ) {
      this.y -= 5;
      this.weight *= -0.8;
    }
  }
  draw() {
    var grd = ctx.createLinearGradient(0, 1000, 100, 0);
    grd.addColorStop(0.2, "red");
    grd.addColorStop(0.4, "purple");
    grd.addColorStop(0.6, "green");
    grd.addColorStop(0.8, "yellow");
    grd.addColorStop(1, "red");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < number; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
}

function animate() {
  ctx.fillStyle = "rgba(255,255,255,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurement = titleElement.getBoundingClientRect();
  title = {
    x: titleMeasurement.left,
    y: titleMeasurement.top,
    width: titleMeasurement.width,
    height: 10,
  };
  init();
});
