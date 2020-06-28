let width = 256;
let height = 256;

let img;
let g;
let f;
let m;


function setup() {
    createCanvas(width, height);
    g = new Genome(2, 3);
    f = new Genome(2, 3);
}

function draw() {
    img = createImage(width, height);
    
    drawPhoto(g);
    g.Mutate();

    
    drawPhoto(f);
    f.Mutate();


    m = crossover(f, g);
    drawPhoto(m);
    //m.Mutate();
}

function save() {
    img.save('photo', 'png');
}

function drawPhoto(genome) {
    img.loadPixels();


    //for (let i = 0; i< 100; i++){
    //   g.mu_add_node();
    //}
    colorMode(RGB, 0.1);
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let outputs = genome.feedforward([i / width, j / height]); //, Math.sqrt((i/width)**2 + (j/height)**2)
            //img.set(i, j, color(Math.abs(outputs[0]), Math.abs(outputs[1]), Math.abs(outputs[2])));
            img.set(i, j, color(outputs[0], outputs[1], outputs[2]));
        }
    }
    img.updatePixels();
    image(img, 0, 0);
}