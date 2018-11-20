# React, Node, MongoDB application which:
1) Authenticates Users
2) Creates & Gets (Questions & Answers) Unit

# Install
1) Install MongoDB
2) cd backend => npm i
3) cd frontend => npm i

# Run & Usage
1) cd backend => node src
2) curl -X POST -H 'Content-Type: application/json' -d '{
     "title": "How does react work?",
     "description": "I am kinda @fullstuck developer but still dont know react..."
   }' localhost:7777/api/questions
3) curl -X POST -H 'Content-Type: application/json' -d '{
        "answer": "Just like that!"
      }' localhost:7777/api/questions/answer/1
      
# Links
1) https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/
2) https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/
