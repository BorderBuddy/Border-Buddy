#!/usr/bin/env bash
dropdb BorderBuddy_test
createdb BorderBuddy_test
npm run migrate
npm run seed