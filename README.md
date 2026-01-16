# OTP-based-authentication-Challenge

A Full-stack web application that implements OTP-based authentication using React.js and Node.js. The system allows users to request an OTP using an email or phone number, verify the OTP with validation rules, and access the application upon successful authentication through API-based frontend–backend communication.

#Technologies Used

  Frontend

    • React.js
    • JavaScript, HTML, CSS
    • Runs on port 3000

  Backend
    
    • Node.js
    • Express.js
    • JavaScript
    • Runs on port 5001

#The application follows a client–server architecture:
    1. The frontend handles user interface and user actions.
    2. The backend handles OTP generation, validation, and session management.
    3. The frontend and backend communicate using HTTP APIs

#Application Flow

    1. User opens the application.
    2. User enters email or phone number.
    3. Frontend sends a request to backend to generate OTP.
    4. Backend generates OTP and logs it in the console (mock delivery).
    5. User enters the OTP.
    6. Frontend sends OTP to backend for verification.
    7. Backend validates the OTP.
    8. On success, backend returns a session token.
    9. User is redirected to the Welcome page.

#OTP Rules:

    1. OTP length: 6 digits
    2. OTP expiry: 5 minutes
    3. Maximum attempts: 3
    4. Block duration after failures: 10 minutes

#Assumptions:

    1. Users are created automatically.
    2. OTP delivery is mocked using console output.
    3. No database is used.
    4. Tokens are simple mock tokens.
    5. Rate limiting is not implemented.

#This project provides a simple and clear implementation of an OTP-based login system.It demonstrates basic authentication flow and frontend–backend communication using APIs
