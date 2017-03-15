#! /bin/sh
npm run build
npm run start&
sleep 10
./node_modules/mocha/bin/mocha
