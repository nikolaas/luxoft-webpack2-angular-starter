import 'angular';
import 'angular-mocks/angular-mocks';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);

const context = require.context('.', true, /\.spec\.js$/);
context.keys().forEach(context);