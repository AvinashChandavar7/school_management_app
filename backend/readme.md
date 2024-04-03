# School Management Application (Backend Documentation)

## Introduction

The School Management Application is a web-based platform developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Tailwind CSS for managing classes, teachers, and students in a school.

It provides various features including CRUD operations for managing data, analytics pages for insights, and other functionalities to enhance the management process.

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [Usage](#usage)
3. [Folder Structure](#folder-structure)
4. [Backend](#backend)
   - [Routes](#routes)
   - [Controllers](#controllers)
   - [Models](#models)
   - [Middleware](#middleware)
   - [Validation](#validation)

## Setup and Installation

To set up the School Management Application on your local machine, follow these steps:

1. Clone the repository from [GitHub Repository URL].
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up your MongoDB database.
5. Create a `.env` file based on the provided `.env.example` file and configure your database connection.
6. Start the development server using `npm start`.

## Usage

Once the application is set up, you can access it through your web browser. The application provides the following functionalities:

- **Data Management:** Allows CRUD operations for managing classes, teachers, and students.
- **Analytics Pages:** Provides insights into class analytics and financial analytics.
- **User Interface:** Designed with a user-friendly interface for easy navigation and interaction.

## Folder Structure

```
school-management-app/
│
|── backend/
│   |── src/
│       │─ constants/
│       │─ controllers/
│       │─ db/
│       │─ json/
│       │─ middleware/
│       │─ models/
│       │─ routes/
│       │─ utils/
│       │─ validation/
│       │─ app.ts
│       │─ index.ts
```

## Backend

### Routes

- **Class Routes:** Handles CRUD operations and analytics for classes.
- **Teacher Routes:** Handles CRUD operations for teachers.
- **Student Routes:** Handles CRUD operations for students.

### Controllers

- **Class Controllers:** Implement logic for CRUD operations and analytics related to classes.
- **Teacher Controllers:** Implement logic for CRUD operations related to teachers.
- **Student Controllers:** Implement logic for CRUD operations related to students.

### Models

- **Class Model:** Defines the schema and methods for interacting with class data in the database.
- **Teacher Model:** Defines the schema and methods for interacting with teacher data in the database.
- **Student Model:** Defines the schema and methods for interacting with student data in the database.

### Middleware

- **Check Class Capacity:** Middleware to check if a class has reached its maximum capacity before adding a new student.

### Validation

- **Joi Validation:** Provides schema validation for class, teacher, and student data before performing CRUD operations.
