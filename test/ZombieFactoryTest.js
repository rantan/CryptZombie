import { injectInTruffle } from 'sol-trace';
injectInTruffle(web3, artifacts);

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

const VMError = 'VM Exception while processing transaction: revert';

const ZombieFactory = artifacts.require('./ZombieFactory.sol');

contract('ZombieFactory', () => {
  let instance;

  beforeEach(async() => {
    instance = await ZombieFactory.new();
  });

  describe('createRandomZombie', () => {
    it('should creat Zombie', async () => {
      const response = await instance.createRandomZombie('MyZombie').valueOf();

      assert.equal(response.logs[0]['event'], 'NewZombie');
      assert.equal(response.logs[0]['args']['name'], 'MyZombie');
    });

    it('should fail when name is blank', async () => {
      const promise = instance.createRandomZombie('').valueOf();
      await assert.isRejected(promise, VMError);
    });
  });
});
