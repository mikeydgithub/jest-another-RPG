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

// Establish who will take their turn first based on their agility values.

// Display the Player object's stats.

// Display the description of the current Enemy.

Game.prototype.startNewBattle = function(){
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
};

Game.prototype.battle = function(){
    // If Player turn:
    if (this.isPlayerTurn) {
        inquirer
        // Prompt user to attack or use a Potion
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use Potion']
            })
            // If using a Potion:
            .then(({ action }) => {
                if (action === 'Use potion') {
                    //follow-up prompt will go here
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }

                    // Display list of Potion objects to user
                    inquirer
                        .prompt({
                            type:'list',
                            message: 'Which poition would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // Apply selected Potion effect to Player
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`)
                            this.checkEndOfBattle();
                        })

                // If attacking:  
                } else {
                    // Subtract health from the Enemy based on Player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            });
    // If Enemy Turn:        
    } else {
        // Subtract health from the Player based on Enemy attack value
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

module.exports = Game;