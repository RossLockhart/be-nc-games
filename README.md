There are two databases in this project. The first is for dev data and the second is for test data.

To work on this repository, two .env files will need to be created: .env.test and .env.development.
It is advised that these files be stored in the root e.g be-nc-games, and they MUST be included in the gitigore file by adding .env.\* to the file.

Within each env files, you should make reference to the database they relate to by including PGDATABASE=<database_name_here>, citing the correct database name for the respective environment (the names of the databases can be found in /db/setup.sql).

Specifically, for this repository, include: " PGDATABASE=nc_games; " in the .env.development file, and " PGDATABASE=nc_games_test; " in the .env.test file.

To reiterate, be sure to check that the .env files are .gitignored by adding .env.\* to the gitignore file.
