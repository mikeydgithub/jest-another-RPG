const Potion = require('../lib/Potion');
const Character = require('./Character');

//Name parameter sets a default empty string if no name is provided.
class Player {
    constructor(name = ''){
        this.name = name;

        //stats
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);

        //inventory
        this.inventory = [new Potion('health'), new Potion()];
    }



    //returns an object with various player properties
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }


    //returns the inventory array for false if empty
    getInventory() {
        if(this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
        //pushing is the function adding a potion to this inventory.
    }

    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];
        // The .splice() method removes items from an array and returns the removed item(s) as a new array.    

        switch(potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.stength += potion.value;
                break;
        }
    }
    //the switch The switch statement evaluates an expression, 
    //matching the expression's value to a case clause, and executes statements associated with that case, 
    //as well as statements in cases that follow the matching case.
}

module.exports = Player;