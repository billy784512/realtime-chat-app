# Mii's Realtime Chat APP

This is a side project aimed at providing users with a real-time chat experience through a web application. 

### Features

- **Realtime Chat**: Experience seamless real-time messaging within the web application.
- **Persistent Chatrooms**: The system remembers previously opened chatrooms, eliminating the need to search for users repeatedly.
- **User Signup & Login**: Users can signup their own account and login.
- **User Authentication**: Secure user authentication ensures that only authorized users can access the chat features.


### Tech Stack

- **Backend Server**: Built with ExpressJS, utilizing RESTful API design and following the MVC architecture.
- **Database**: MongoDB is used for storing user data and chat history.
- **User Authentication**: JWT (JSON Web Tokens) and server-side session storage are employed for secure user authentication.
- **Realtime Communication**: Socket.io is utilized for enabling real-time communication and chatroom functionality.
- **Testing**: Unit tests are implemented using Jest to ensure the reliability of the application.
- **Continuous Integration (CI)**: GitHub Actions is used for continuous integration, automatically running tests whenever code is pushed or a pull request is opened.

### Demo
![alt text](https://github.com/billy784512/realtime-chat-app/blob/main/demo.gif)

### How to start?

1. install backend package
   ```bash
   cd /backend; yarn install
   ```

2. install frontend package
   ```bash
   cd /forntend; yarn install
   ```

3. setup your .env file (follow .env.example format)


4. Run backend server
   ```bash
   cd /backend; yarn dev
   ```

6. Run frontend http server
   ```bash
   yarn /frontend; npx http-server
   ```

7. Use the servcie
   Open browser and go to `http://localhost:8080/login`
