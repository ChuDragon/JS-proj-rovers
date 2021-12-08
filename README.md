# Course: Intermediate JavaScript
### Section: Functional Programming
### Project: Mars Dashboard

## Student Developer: Roman Chuyan
The focus of this project was practicing functional JavaScript programming: use pure functions, icluding higher-order functions.
Another objective was becoming comfortable working with, reshaping, and accessing information from complex API responses. 
I attempt to follow the ES6 syntax, and to adhere to best practices on variable declaration and comments. 
This is a learning project (not meant for production), focusing on mastering the concepts rather than perfecting the app.
See Concepts Practiced below. Finally, I plan to leave the code as-is at this stage of my progress as a developer.

## Functionality
I created an online dashboard that consumes the NASA API and presents general information about Mars rovers and the latest photos taken by each rover. 
The dashboard is interactive - it allows the user to select which rover's details they want to view. After clicking on a rover's name, the user is presented with the most recent images taken by that rover and more details about its mission. 

## Starter Code
Udacity supplied us with starter code containing the basic API syntax in /server/index.js, and basic logic structure in client.js. 
My work was mostly in JavaScript, as well as some css to create an interactive, appealing page with mobile-first styling.

## Setup/Dependencies
Dependencies are setup in the `/node_modules.zip` folder. Before runnung the app, you need to unzip the folder to the project root.
Yarn is used as a package manager. In the terminal, run `yarn start` (npm or yarn must be installed) at the root of the project.
'Example app listening on port 3000!' should be logged on the console. You can then access the app in a browser via `http://localhost:3000`.
Finally, the required NASA API key is saved in the `.env` file.

## Concepts Practiced

### Functional Programming
I used pure functions to reduce code side effects, including higher-order functions and IIFE.

### Array Methods
I use .map and .findindex array methods to process data returned by APIs.

### Asyncronous Code
I use either try/catch or cascading .then/.catch syntax. in all async API call functions.
