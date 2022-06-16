How to run the application:
-> To run start the backend go to the digitalwallet directory and execute mvn 'spring-boot:run'. This will init the server which is listening on port 8080.
-> To run the frontend go to the frontend directory and execute 'npm install' to install all dependencies. Then start the application by running 'npm start'. The application is listening on
 port 3000.


TODO:
- sucessfully authorize programmatically with the natwest api to be able to fetch the account data
- render the data. At the moment only the accountIDs are rendered
- extract fetch natwest data functionallity and put it into the backend.
- structure the frontend application. extract components and utilities. At the moment there is only one big javascript file App.js...