# Contact Manager Backend

This is the backend API for the Contact Manager application.  
It is built with Node.js, TypeScript, and Express, and uses JWT for authentication. The backend provides RESTful endpoints to manage contacts with full CRUD operations, as well as user authentication.

---

## Features

- User authentication with JWT (login endpoint)
- CRUD operations for contacts
- Pagination and filtering on contact list endpoint
- Swagger API documentation available
- Structured with TypeScript for maintainability and scalability

---

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- A running MongoDB or your preferred database configured in `.env`

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd contact_manager_backend
```
### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables
Create a .env file in the root directory and add the following variables:
```
PORT=3050
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_database_connection_string
```

### 4. Run the development server
```
npm run dev
```
This will start the backend on http://localhost:3050.

## Building the project
To compile the TypeScript code and generate the production-ready JavaScript files in the dist folder:

```
npm run build
```
After building, you can start the app using:

```
npm start
```

## API Documentation (Swagger)
You can access the interactive API docs at:

```
http://localhost:3050/api/docs
```

## Authentication
- Use the /api/auth/login endpoint to obtain a JWT token.
- Include the token as a Bearer token in the Authorization header for all other endpoints.
- The Swagger docs support token input via the "Authorize" button.

## Scripts
- npm run dev — start the app in development mode with hot reload
- npm run build — compile TypeScript to JavaScript into dist folder
- npm start — run the compiled app from dist folder