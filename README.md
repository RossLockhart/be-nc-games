There are two databases in this project. The first is for dev data and the second is for test data.

To work on this repository, two .env files will need to be created: .env.test and .env.development. Within each of these files, you should, add PGDATABASE=<database_name_here>, citing the correct database name for the respective environment (the names of the databases can be found in /db/setup.sql). Once you have created these files, be sure to check that .env files are .gitignored by adding .env.\* to the gitignore file.
