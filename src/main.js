let width = 512;
let height = 512;

let img;
let g;


function setup() {
    createCanvas(width, height);

    img = createImage(width, height);
    g = new Genome(2, 3);
}

function draw() {
    img.loadPixels();
    

    //for (let i = 0; i< 100; i++){
     //   g.mu_add_node();
    //}
    colorMode(RGB, 1);
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let outputs = g.feedforward([i/width, j/height]); //, Math.sqrt((i/width)**2 + (j/height)**2)
            //img.set(i, j, color(Math.abs(outputs[0]), Math.abs(outputs[1]), Math.abs(outputs[2])));
            img.set(i,j, color(outputs[0],outputs[1], outputs[2]));
        }
    }
    img.updatePixels();
    image(img, 0, 0);

    g.Mutate();
}

function save(){
    img.save('photo','png');
}