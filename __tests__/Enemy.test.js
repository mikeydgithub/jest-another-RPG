const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('..//lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

test('gets enemies health value', () => {
    const enemy = new Enemy ('goblin', 'sword');
    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
    // The expect.stringContaining() method is an expect method that we can use to make sure our string includes our enemy's health.
});

test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');
    expect(enemy.isAlive()).toBeTruthy();
    
    enemy.health = 0;
    expect(enemy.isAlive()).toBeFalsy();
    // If there is a new enemy expected them to be alive and equal truthy or if enemy.health = 0 expected playerisAlive to be falsey, or dead.
})

test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;
  
    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test('subtracts from enemies health', () => {
    const enemy = new Enemy ('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);
    expect(enemy.health).toBe(oldHealth - 5);
    //oldHealth takes on the current health. with reduce health by 5 the oldhealth is subtracted by 5.
    
    enemy.reduceHealth(99999);
    expect(enemy.health).toBe(0);
    // here the reducedHealth comes out from 99999 so that we never go negative
});

test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});
