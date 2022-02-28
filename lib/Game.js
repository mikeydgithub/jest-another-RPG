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
            //then start a new battle
            this.startNewBattle();
        });
};


module.exports = Game;