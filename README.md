Nc Games

To set up the repo we need to create 2 .env files to set the database whenever we run the project. This is based on whether we need to run tests or continue development.

Paste these 2 commands into your terminal to create the files.

```
echo PGDATABASE=nc_games > .env.development

echo PGDATABASE=nc_games_test > .env.test
```

Following this, run the command in your terminal to set up the databases.

```
npm run setup-dbs
```

All required packages will be already in your package.json so we can install all necessary packages with the command

```
npm install
```
