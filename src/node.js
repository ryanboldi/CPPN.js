class Node {
    /**
     * 
     * @param {String} type type of node this is i=input, o=output, h=hidden, b = bias.
     * @param {Function} activation function used to normalise the nodes value to between -1 and 1;
     */
    constructor(num, type = 'h', activation) {
        this.num = num;
        this.type = type;
        if (this.type == 'i' || this.type == 'b') this.activation = identity; //DONT ACTIVATE INPUTS
        else if (activation) this.activation = activation;
        else this.activation = random(funcs); //assign a random actiavte frunction
        this.value = (Math.random() * 16) - 8;  //all values initilised at random between (-8 and 8)

        this.incomingSignal = 0; //sum before activation

        if (this.type == 'b') {
            this.value = 1;
        }
    }

    //adds up incoming signal, and sets value to the activated value
    engage() {

        this.value = this.incomingSignal;
        this.incomingSignal = 0;

        //bias is always 1.
        if (this.type == 'b') {
            this.value = 1;
        }
    }

    clone() {
        //let clone = new Node(this.num, this.type);
        let clone = _.cloneDeep(this)
        return clone;
    }
}