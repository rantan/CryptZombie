const ZombieFactory = artifacts.require('./ZombieFactory.sol');

contract('ZombieFactory', () => {
  let instance;

beforeEach(async() => {
  instance = await ZombieFactory.new();
});

it('createRandomZombie', async () => {
  const response = await instance.createRandomZombie('MyZombie').valueOf();

  assert.equal(response.logs[0]['event'], 'NewZombie');
  assert.equal(response.logs[0]['args']['name'], 'MyZombie');
  });
});
