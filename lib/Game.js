//Game Logic
//the game will need access to the player and enemy objects. not the potions.

const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

//create a Game function. this refers to the game.
function Game(){
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    // We also need to keep track of which Enemy object is currently fighting the Player. When the game starts, this would be the first object in the array.

    // Add the following line of code to initializeGame() to capture that:

    this.currentEnemy;
    this.player;
}
//Next, add the initializeGame() method using the prototype syntax, as shown in the following code:
Game.prototype.initiliazeGame = function(){
    this.enemies.push(new Enemy('goblin', 'sword')),
    this.enemies.push(new Enemy('orc', 'baseball bat')),
    this.enemies.push(new Enemy('skelaton', 'axe'))

    this.currentEnemy = this.enemies[0];
    // The last thing initializeGame() needs to do is prompt the user for their name, which will become the Player name.

    // After initializing the Enemy data, add the inquirer prompt, as shown in the following code:
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player (name);

            //test the object creation
            // The startNewBattle() method will be called to kick off the first battle and then called again anytime a new round starts. 
            // We want this method to do the following things:
            this.startNewBattle()
            console.log('Your stats are as follows:');
            console.table(this.player.getStats());
            console.log(this.currentEnemy.getDescription());
            // The battle() method will be responsible for each individual turn in the round. 
            // The battle() method doesn't exist yet, of course, but we'll implement it soon enough in the next section!
            this.battle()
        });
};

//Next, add the startNewBattle() method using the prototype syntax, as shown in the following code:
// Establish who will take their turn first based on their agility values.
Game.prototype.startNewBattle = function(){
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    this.battle();
};

//Next, add the battle method using the prototype syntax, as shown in the following code:
Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }
    
                    inquirer
                        .prompt({
                        type: 'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({ action }) => {
                        const potionDetails = action.split(': ');
            
                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                        this.checkEndOfBattle();
                    });
            } else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);
        
                console.log(`You attacked the ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
        
                this.checkEndOfBattle();
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
    
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    
        this.checkEndOfBattle();
    }
};



Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name}`)

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();            
        } else {
            console.log('You win!');
        }
    } else {
        console.log("You've been defeated!");
    }
};


module.exports = Game;