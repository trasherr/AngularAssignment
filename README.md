# AngularAssignment
 <br /> <br />
<h1>Backend</h1>
 <br /> 
step 1: Install all node modules <br />
    ```npm i```
 <br />
step 2: create .env file inside node folder with following parameters (change values based on you environment) <br />
    ```APP_PORT=5555 <br />
    ACCESS_TOKEN=yYeeNFhgktsFmtRCtKS3  <br />
    DB_USER=root <br />
    DB_PASS=pass <br />
    DB_DIALECT=mysql <br />
    DB_HOST=localhost <br />
    DB_PORT=3307 <br />
    DB_NAME=angular```
 <br />
step 3: Inside Node Folder Run <br />
    ```npx sequelize-cli db:migrate <br />
    npx sequelize-cli db:seed:all```
 <br />
<h2>Backend is Ready !!! </h2>