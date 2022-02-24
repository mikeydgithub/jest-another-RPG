const Potion = require('../lib/Potion');

//Name parameter sets a default empty string if no name is provided.
function Player(name = '') {
    this.name = name;

    //stats
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    //inventory
    this.inventory = [new Potion('health'), new Potion()];
}

//returns an object with various player properties
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

//returns the inventory array for false if empty
Player.prototype.getInventory = function() {
    if(this.inventory.length) {
        return this.inventory;
    }
    return false;
};

//returns players health as it is now
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`; 
};

//returns if player is dead or alive. if === 0, returns false which indicates dead, otherwise return true if alive and this.health is ! === 0.
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
    
};

// players health gets reduced  
Player.prototype.reduceHealth = function(health) {
    this.health -= health;
    if (this.health < 0) {
        this.health = 0;
    }
};

Player.prototype.getAttackValue = function () {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);

    // We've created variables for min and max to make this function a little easier to maintain. 
    // What if you decide to increase the range of attacks later on? 
    // This code will be easier to understand upon revisit than if we wrote all of the expressions in one single return statement.
};

Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
    //pushing is the function adding a potion to this inventory.
};

Player.prototype.usePotion = function(index) {
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
    //the switch The switch statement evaluates an expression, 
    //matching the expression's value to a case clause, and executes statements associated with that case, 
    //as well as statements in cases that follow the matching case.
 };

module.exports = Player;