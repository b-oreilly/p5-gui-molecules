class Molecule {
  constructor(_i) {
    this.position = createVector(200, 400);
    this.speed = createVector(random(config.minMolSpeed, config.maxMolSpeed), random(config.minMolSpeed, config.maxMolSpeed));
    this.radius = random(config.minMolSize, config.maxMolSize);
    this.color = config.molColor;
    this.index = _i;
  }

  render() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0);
    (config.showText) ? (
      textSize(16),
      textAlign(CENTER),
      text(this.index, this.position.x, this.position.y + 5)) :
    null;
  }

  isIntersecting(_molecule) {
    let distance = dist(this.position.x, this.position.y, _molecule.position.x, _molecule.position.y)
    let gap = distance - this.radius - _molecule.radius;
    let check = (gap <= 0) ? true : false;
    return check;
  }

  changeColor() {
    this.color = config.intersectColor;
  }

  step() {
    (this.position.x > width - this.radius || this.position.x < 0 + this.radius) ?
    this.speed.x *= -1: this.speed.x;

    this.position.x += this.speed.x;

    (this.position.y > height - this.radius || this.position.y < 0 + this.radius) ?
    this.speed.y *= -1: this.speed.y;

    this.position.y += this.speed.y;
  }

  //resets the colour of each molecule after they intersect
  reset() {
    this.color = config.molColor;
  }
}