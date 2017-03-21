#! /bin/sh
npm run build
createdb BorderBuddy_test
npm run migrate
npm run seed
npm run start&
sleep 10
./node_modules/mocha/bin/mocha
