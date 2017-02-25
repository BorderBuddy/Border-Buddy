# ENVIRONMENT VARIABLES
PG_PATH=/Applications/Postgres.app/Contents/Versions/9.6/bin
PSQL=$(PG_PATH)/psql
PG_DUMP=$(PG_PATH)/pg_dump

TABLES= admins.sql \
				scholars.sql

# MAKE COMMANDS
new:
	make node_modules
	make create-database

rebuild:
	make node_modules
	make rebuild-database

node_modules: package.json
	npm install

create-database:
	$(PSQL) -f database/init.sql
	for t in $(TABLES); do \
		$(PSQL) -f database/$$t ; \
	done

# rebuilds tables and will preserve old data if compatible
rebuild-database:
	$(PG_DUMP) scholarship > scholarship.dump --data-only
	make create-database
	$(PSQL) scholarship < scholarship.dump
	rm scholarship.dump
