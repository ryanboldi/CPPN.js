let width = 512;
let height = 512;

let img;
let g;

function setup() {
    createCanvas(width, height);

    img = createImage(width, height);

    img.loadPixels();
    g = new Genome(2, 3);

    //for (let i = 0; i< 100; i++){
     //   g.mu_add_node();
    //}

    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let outputs = g.feedforward([i, j]);
            img.set(i, j, color(outputs[0], outputs[1], outputs[2]))
        }
    }

    img.updatePixels();
    image(img, 0, 0);


}

function draw() {

}

function save(){
    img.save('photo','png');
}