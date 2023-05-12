# AngularAssignment
 <br /> <br />
<h1>Backend</h1>
 <br /> 
Step 1: Install all node modules <br />
```shell
    npm i
```
 <br />
Step 2: create .env file inside node folder with following parameters (change values based on you environment) <br />
```shell
    APP_PORT=5555 
    ACCESS_TOKEN=yYeeNFhgktsFmtRCtKS3 
    DB_USER=root 
    DB_PASS=pass
    DB_DIALECT=mysql
    DB_HOST=localhost
    DB_PORT=3307
    DB_NAME=angular
```
 <br />
Step 3: Inside Node Folder Run <br />
```shell
    npx sequelize-cli db:migrate 
    npx sequelize-cli db:seed:all
```
 <br />
<h2>Backend is Ready !!! </h2>