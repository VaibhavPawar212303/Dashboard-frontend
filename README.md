# React-Blog-Application
This is the project for creating the simple react blog application.

# Prerequisite for this project
1.vscode(creating and debugging a code)

2.nodejs(used for the pakage manager)

3.git bash(for push and clone a code)

# start the project
creating the project with the command which is called as

## npx create-react-app --your project name--
Above is the simple command to create the react application. By putting the name of your project at the end of the command. After creating the project we can easily run it by the command.
   ## npm start

But remember we have to navigate the folder of your project.

## created new folder called as the components

Within this components folder we will include all of our components which is requireed within this project.
we can consider components as the building block/simple one piece of the puzzle  by connecting all this pieces we have to complete the puzzle.

#plugins used

1.react-responsive-carousel 

For adding the plugin in your react application we need the basic command

## npm install react-responsive-carousel --save  

# React Router

The above is the main pakage for the routing the path in the react,While working with the different path in the react.It is as similar to the directing the user from one page to the another.In this application we have created the first route which is hide from the visiter and only preferred user can access or edit the content. To add this pakage in the react we use the below command.

## npm install -D react-router-dom

# state in the React 

Working with the react state is hard and it is the main core part of the react.To switch between the login and the signup we have used the useState and change the account after click. For diffrentiate the client and the server side we have created the new folder called server and defining the schema and the API in this folder.
In this project we have also used the ES6 version for that we have to put or the type module in the pakage.json file. we always used two type of the dependencies or the pakages one which is run on the project env where as other one is on the dev enviornment.

--dev-save is for the development only. 

## Package needed for creating the server 

1. express command for it 
2. nodemon command for restart the server after changes save.
## npm install experss
## npm install --save-dev nodemon

# connect with the mongodb 
   
   Within this application we have tried to connect with the mongodb by mongoose.
   need to install the mongoose pakage by.
    
     npm install mongoose.
    
  We are easily created and connected with the database.We have also used the ## dotenv for hide the credentials.
    
  Creating the api 
   API url is always same just the end point will change.
   
