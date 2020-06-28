let width = 520;
let height = 520;


function setup() {
    createCanvas(width, height);

    let img = createImage(width, height);
    img.loadPixels();
    let g = new Genome(2, 3);

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
