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

test('subtracts from players health', () => {
    const player = new Player ('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    //oldHealth takes on the current health. with reduce health by 5 the oldhealth is subtracted by 5.
    
    player.reduceHealth(99999);
    expect(player.health).toBe(0);
    // here the reducedHealth comes out from 99999 so that we never go negative
});

test('get players attack value', () => {
    const player = new Player ('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
    //settinng players default strength to 10 and expecting attackvalue to always be greater then 5 but less than 15.
});

test('add a potion to inventory', () => {
    const player = new Player ('Dave');
    const oldCount = player.inventory.length;
    //old count is the current amount of items you have in inventory
    
    player.addPotion(new Potion());
    //player adds a potion which becomes new

    expect(player.inventory.length).toBeGreaterThan(oldCount);
    //after add potion, the current items in your inventory is expected to be greater than your old inventory.
    // current 0 potions, adding a new 1. Total = 0 + 1 = 1.
});

test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion (), new Potion (), new Potion ()];
    const oldCount = player.inventory.length;
    // player.inventory is the array contain length of inventory (0,1,2)

    player.usePotion(1);
    // player.usePotion is 1

    expect(player.inventory.length).toBeLessThan(oldCount);
    //expect the players inventory length or items carrieed in inventory to be less.
});