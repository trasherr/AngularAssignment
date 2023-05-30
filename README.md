# AngularAssignment



## Backend

Step 1: Install all node modules
```shell
npm i
```
 
Step 2: create .env file inside 'Node' folder with following parameters (change values based on you environment) 
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

Step 3: Inside Node Folder Run
```shell
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all
```

Backend is Ready !!! 

### Default Credentials
```shell
email: teacher@gmail.com
password: 12345678
```