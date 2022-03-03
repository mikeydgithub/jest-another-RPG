// The Potion object will be used to give the player stat boosts.
class Potion {
    constructor(name) {
        //create an array string. using this <potion> and assigning types
        this.types = ['stength', 'agility', 'health'];
        // creating an or statement. this name = name is true or multiplies this random value to potion types and length
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}

module.exports = Potion;