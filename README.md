# Express CRUD App

This is a TypeScript-based Express server that uses PostgreSQL as its database.  It features a basic middleware setup, routing, error handling, integration with a PostgreSQL database using Drizzle ORM, and auth. 

## Overview

This app is designed to be scalable and flexible, offering full CRUD capabilities for user data. It includes middleware for handling cookies, CORS, logging, and error management. Its PostgreSQL database is integrated using Drizzle ORM, which enables seamless database migrations and schema management. In any event, it will provided a solid foundation for building RESTful APIs with user authentication/authorization.

## Features

- TypeScript for type safety and an improved development experience
- Secure session-based authentication with HTTP-only cookies
- Refresh tokens for maintaining user sessions and access tokens for authorization
- Full CRUD (Create, Read, Update, Delete) operations for managing user data
- Support for both guest and authenticated user sessions
- Middleware setup for cookie parsing, CORS, and request logging
- Environment variable management with `dotenv`
- Robust error handling
- Development and production-ready scripts

## Project Structure

```
express-crud-app/
├── dist/                        # Compiled TypeScript files
├── node_modules/                # Project dependencies
├── src/                         # Source code directory
│   ├── auth/                    # Contains functions that handle authentication logic
│   ├── bin/
│   │   └── www.ts               # Entry point for starting the server
│   ├── controllers/             # Controllers to handle business logic for routes
│   ├── database/                # Database configuration and migration files
│   │   ├── migrations/          # Database migration scripts (generated by Drizzle)
│   │   ├── schemas/             # Database table schemas
│   │   ├── db.ts                # Database connection setup
│   │   └── migrate.ts           # Database migration execution script
│   ├── routes/                  # API route definitions
│   ├── types/                   # Custom TypeScript types and interfaces
│   └── app.ts                   # Main Express app setup
├── .env                         # Environment variables (not committed to Git)
├── .gitignore                   # Specifies files and directories to ignore in Git
├── drizzle.config.ts            # Configuration for Drizzle ORM
├── example.env                  # Example environment variable file for reference
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked versions of dependencies
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration file
```

## Getting Started

### Prerequisites

- Node.js (v20.18.0 or higher)
- npm (10.9 or higher)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/express-crud-app.git
    cd express-crud-app
    ```

2. **Rename `example.env` to `.env` and add your desired environment variables:**

   ```bash
   mv example.env .env
   ```

3. **Install the required dependencies:**

   ```bash
   npm install
   ```

## Scripts

- **`npm run build`**: Cleans the `dist` directory and compiles the TypeScript files into JavaScript.
- **`npm prestart`**: Automatically runs `npm run build` before starting the server to ensure the project is freshly built.
- **`npm start`**: Runs database migrations and then starts the server using the compiled files from the `dist` directory.
- **`npm run dev`**: Starts the development environment. It uses `concurrently` to run TypeScript in watch mode and `nodemon` to restart the server automatically when changes are made.
- **`npm run db:generate`**: Generates database migration files using Drizzle ORM.
- **`npm run db:migrate`**: Runs the database migration scripts to update the database.
- **`npm run db:push`**: Pushes the current state of the database schema to PostgreSQL using Drizzle ORM.
- **`npm run db:studio`**: Opens Drizzle Studio, a UI for managing and inspecting the database schema.


## Dependencies

- **@neondatabase/serverless**: Neon database serverless support for PostgreSQL.
- **bcrypt**: Library for hashing passwords.
- **concurrently**: Run multiple commands concurrently.
- **cookie-parser**: Middleware to parse cookies.
- **cors**: Middleware to enable CORS.
- **debug**: A tiny debugging utility.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **drizzle-orm**: TypeScript ORM for interacting with PostgreSQL.
- **express**: Web framework for Node.js.
- **http-errors**: Create HTTP errors for Express.
- **jose**: A library for handling JWTs and other cryptographic operations.
- **morgan**: HTTP request logger middleware.
- **nodemon**: Tool to automatically restart the server on file changes.
- **pg**: PostgreSQL client for Node.js.
- **rimraf**: A deep deletion module for node (like `rm -rf`).
- **ws**: WebSocket library for real-time functionality.

## Dev Dependencies

- **@types/bcrypt**: TypeScript definitions for bcrypt.
- **@types/cookie-parser**: TypeScript definitions for cookie-parser.
- **@types/cors**: TypeScript definitions for cors.
- **@types/debug**: TypeScript definitions for debug.
- **@types/express**: TypeScript definitions for Express.
- **@types/morgan**: TypeScript definitions for morgan.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/pg**: TypeScript definitions for pg (PostgreSQL client).
- **@types/ws**: TypeScript definitions for WebSocket (ws) library.
- **drizzle-kit**: CLI tool for managing migrations with Drizzle ORM.
- **typescript**: TypeScript language.

## License

This project is open for personal and educational use. No specific license applies.
