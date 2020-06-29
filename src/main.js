

let img;
let photoAmt = 9 //SQUARE NUMBER
let photoWidth = 200;
let photoHeight = 200;


let width = Math.sqrt(photoAmt) * photoWidth;
let height = Math.sqrt(photoAmt) * photoHeight;

let photos = [];

let selected = new Array(photoAmt).fill(0);

function setup() {
    createCanvas(width, height);
    for (let i = 0; i < photoAmt; i++) {
        photos.push(new Genome(3, 3));
    }
    drawPhoto();
}

function draw() {
    

    //g.Mutate();


    // drawPhoto(f);
    // f.Mutate();


    //m = crossover(f, g);
    //drawPhoto(m);
    //m.Mutate();
}

function save() {
    img.save('photo', 'png');
}

function drawPhoto() {

    //for (let i = 0; i< 100; i++){
    //   g.mu_add_node();
    //}
    let x = 0;
    let y = 0;
    colorMode(RGB, 1);
    for (let k = 0; k < photos.length; k++) {
        img = createImage(photoWidth, photoHeight);
        img.loadPixels();

        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                let outputs = photos[k].feedforward([i / photoWidth, j / photoHeight, distFromCenter(i / photoWidth, j / photoHeight)]); //, Math.sqrt((i/width)**2 + (j/height)**2)
                //img.set(i, j, color(Math.abs(outputs[0]), Math.abs(outputs[1]), Math.abs(outputs[2])));
                img.set(i, j, color(Math.abs(outputs[0]), Math.abs(outputs[1]), Math.abs(outputs[2])));
            }
        }
        img.updatePixels();
        image(img, x, y);

        if (selected[k] == 1) {
            stroke(0, 1, 0);
            strokeWeight(3);
            noFill();
            rect(x, y, photoWidth, photoHeight);
        }

        x += photoWidth;
        if (x == width) {
            x = 0;
            y += photoWidth;
        }


    }

}

function cross(parent1, parent2) {
    let p1 = photos[parent1];
    let p2 = photos[parent2];
    for (let i = 0; i < photos.length; i++) {
        photos[i] = crossover(p1, p2);
        photos[i].Mutate();
    }
}

//X AND Y BOTH OUT OF 1
function distFromCenter(x, y) {
    return (Math.sqrt(Math.abs(x - 1 / 2) ** 2 + Math.abs(y - 1 / 2) ** 2));
}

function mousePressed() {
    //console.log(`clicked at ${Math.floor(mouseX / photoWidth)}, ${Math.floor(mouseY / photoHeight)}`);

    let index = ((Math.floor(mouseY / photoHeight)) * Math.sqrt(photoAmt)) + Math.floor(mouseX / photoWidth);
    //console.log(index);

    if (index >= 0 && index <= photoAmt) {
        if (selected[index] == 1) selected[index] = 0;
        else if (selected[index] == 0) selected[index] = 1;
    }

    drawPhoto();

    //console.log(selected);
}

function keyPressed() {
    if (keyCode == 32) {
        let parents = []
        for (let i = 0; i < photos.length; i++){
            if (selected[i] == 1){
                parents.push(photos[i].clone())
            }
        }
        crossMult(parents);
        selected = new Array(photoAmt).fill(0);
        drawPhoto();
    }
}

function crossMult(parents) {
    for (let k = 0; k < photos.length; k++) {
        dance:
        for (let i = 0; i < parents.length; i++) {
            for (let j = 0; j < parents.length; j++) {
                if (Math.random() < 1 / (parents.length)) {
                    photos[k] = crossover(parents[i], parents[j]);
                    photos[k].Mutate();
                    break dance; //har har
                }
            }
        }
    }
}