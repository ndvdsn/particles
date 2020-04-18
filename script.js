const particles = [];

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  // NEW
  const particlesLength = Math.floor(window.innerWidth / 10);
  // console.log(particlesLength);  //resize window to show number changing
  for(let i = 0; i < particlesLength; i++){
    particles.push(new Particle());
  }
}

function draw(){
  // add background to stop it making a line
  background(05, 05, 05);
  particles.forEach((p, index) => {
    p.update()
    p.draw()
    p.checkParticles(particles.slice(index))
  })
}

class Particle{
  constructor() {
    // Position
    this.pos = createVector(random(width), random(height));
    // Velocity
    this.vel = createVector(random(-2, 2), random(-2, 2));
    // size
    this.size = 10;
  }
// update movement by adding velocity
  update(){
    this.pos.add(this.vel);
    // call edges within update
    this.edges();
  }
// draw single particle
  draw() {
    noStroke();
    fill('rgba(255, 255, 255, 0.5)');
    circle(this.pos.x, this.pos.y, this.size);
  }

  // detect edges
  edges(){
    if(this.pos.x < 0 || this.pos.x > width){
      this.vel.x *= -1;
    }
    if(this.pos.y < 0 || this.pos.y > height){
      this.vel.y *= -1;
    }
  }

  // connect particles
  checkParticles(paticles){
    particles.forEach(particle =>{
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y); // built in distance function from p5.js
      if(d < 120){
        stroke('rgba(255, 255, 255, 0.1)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    })
  }
}
