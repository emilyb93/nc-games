Nc Games

To set up the repo we need to create 2 .env files to set the database whenever we run the project. This is based on whether we need to run tests or continue development.

Paste these 2 commands into your terminal to create the files.

echo PGDATABASE=nc_games > .env.development

echo PGDATABASE=nc_games_test > .env.test
