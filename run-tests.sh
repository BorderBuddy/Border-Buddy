#! /bin/sh
npm run build
dropdb BorderBuddy_test
createdb BorderBuddy_test
npm run migrate
npm run seed
npm run start&
sleep 10
./node_modules/mocha/bin/mocha
