const Potion = require('./Potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random () * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
}

module.exports = Enemy;

//returns players health as it is now
Enemy.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`; 
};

//returns if enemy is dead or alive. if === 0, returns false which indicates dead, otherwise return true if alive and this.health is ! === 0.
Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
    
};

Enemy.prototype.getAttackValue = function () {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);

    // We've created variables for min and max to make this function a little easier to maintain. 
    // What if you decide to increase the range of attacks later on? 
    // This code will be easier to understand upon revisit than if we wrote all of the expressions in one single return statement.
};

// players health gets reduced  
Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;
    if (this.health < 0) {
        this.health = 0;
    }
};

Enemy.prototype.getDescription = function () {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};