let width = 256;
let height = 256;

let img;
let g;

let t = 0; //VARY TIME TO MAKE COOL 4D ART

function setup() {
    createCanvas(width, height);

    img = createImage(width, height);
    
}

function draw() {
    img.loadPixels();
    g = new Genome(2, 3);

    //for (let i = 0; i< 100; i++){
     //   g.mu_add_node();
    //}
    colorMode(RGB, 1);
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let outputs = g.feedforward([i/width, j/height]);
            img.set(i, j, color(Math.abs(outputs[0]), Math.abs(outputs[1]), Math.abs(outputs[2])));
        }
    }

    img.updatePixels();
    image(img, 0, 0);

}

function save(){
    img.save('photo','png');
}