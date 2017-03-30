import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiSubset from 'chai-subset';

global.expect = chai.expect;
global.sinon = sinon;

chai.use(sinonChai);
chai.use(chaiSubset);
