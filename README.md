# Godziny - React/TS, Express, Mongoose

"Godziny" is full-stack commercial project designed for the presidium of a trade union's workers council to plan the so-called union hours. In Poland, the presidium of the trade union's council is entitled to use hours for union activities. Once the number of hours for the month is determined, the members of the presidium provide the employer with data on the number of hours taken on specific days of the month. Subsequently, the employer can either accept or reject the request for union hours.
## Frontend <a href = "https://github.com/Krzysztofe/godziny-server"> here --></a>

## Backend Features 
* Auth
* Password hashing
* Input validations (yup, custom validations)
* Database integration: MongoDB Atlas / Mongoose ODM
* RESTful API - GET, POST, PUT, DELETE endpoints
* Environment configuration
* MVC architecture

## Backend Technologies

* Express
* JWT
* bcryptjs
* CORS configuration
* HTTP headers helmet security
  
* Libraries: <br/>
bcryptjs, body-parser, compression, helmet, jsonwebtoken, mongoose, nodemon, yup

* Database: <br/>
 MongoDB Atlas / Mongoose ODM


##  The structure of the month data stored in MongoDB Atlas is as follows:

 <div>
<img src="https://github.com/user-attachments/assets/5846c847-6fd8-4253-a0ab-a8d9508b5614" width=450" height="400" alt="Screenshot">
</div>


## Prerequisites
* Before getting started, make sure you have the Node.js and npm or yarn
* Node version: **Node.js v18.16.1**
* Clone this repository to your local machine
* Navigate to the project directory: **cd .\godziny-server**
* Install the project dependencies by running **npm install** or **yarn install**
* Start the development server: **cd .\godziny-server npm start** or **yarn start**
* Open your browser and visit your localhost:8000.
* URLs not hidden in the .env file.

