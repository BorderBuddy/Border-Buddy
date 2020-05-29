import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

global.chai = chai;
global.expect = chai.expect;
