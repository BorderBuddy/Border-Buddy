import path from 'path';
import _ from 'lodash';

export var config = {
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../../..`),
  port: _.get(process.env, 'PORT', 3000),
  secrets: {
    session: _.get(process.env, 'SESSION_SECRET', 'border buddy bl@h bl@h')
  },
  database: {
	username: 'postgres',
	password: 'root'
  }
};