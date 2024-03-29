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