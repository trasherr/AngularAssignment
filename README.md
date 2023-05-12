# AngularAssignment

<h1>Backend</h1>

step 1: Install all node modules
    npm i

step 2: create .env file inside node folder with following parameters (change values based on you environment)
    APP_PORT=5555
    ACCESS_TOKEN=yYeeNFhgktsFmtRCtKS3 
    DB_USER=root
    DB_PASS=pass
    DB_DIALECT=mysql
    DB_HOST=localhost
    DB_PORT=3307
    DB_NAME=angular

step 3: Inside Node Folder Run
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all

<h2>Backend is Ready !!! </h2>