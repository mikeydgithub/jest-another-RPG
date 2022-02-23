// Create tests for the Potion object.
const Potion = require('../lib/Potion.js');

test('creates a health potion object', () => {
    const potion = new Potion('health');
    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});

// If no stat is provided, the stat should be randomly selected.
test ('create a random potion object', () =>{
    const potion = new Potion();
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});

