const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion')

console.log(new Potion());

//New Player('Dave') created a new player object that had four properties. 
//The object had a name property equal to 'Dave' and three additional Number properties.
test('creates a player object', () => {
    const player = new Player ('Dave');
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test('gets players stats as an object', () => {
    const player = new Player ('Dave');
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player ('Dave');
    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
});

test('gets players health value', () => {
    const player = new Player ('Dave');
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
    // The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health.
});

test('checks if player is alive or not', () => {
    const player = new Player('Dave');
    expect(player.isAlive()).toBeTruthy();
    
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
    // If there is a new player expected them to be alive and equal truthy or if player.health = 0 expected playerisAlive to be falsey, or dead.
})

test('subracts from players health', () => {
    const player = new Player ('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    //oldHealth takes on the current health. with reduce health by 5 the oldhealth is subtracted by 5.
    
    player.reduceHealth(99999);
    expect(player.health).toBe(0);
    // here the reducedHealth comes out from 99999
});