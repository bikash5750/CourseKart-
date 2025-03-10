# EduMarket - Course Selling Platform

EduMarket is a backend project built using **Node.js**, **Express.js**, and **MongoDB**. It provides APIs for an admin to manage courses and for users to sign up, purchase courses, and view their enrolled courses.

## Features

### Admin APIs:
- **Sign Up** - Register a new admin account
- **Sign In** - Login to the admin account
- **Create Course** - Add new courses
- **View All Courses** - Get a list of all available courses

### User APIs:
- **Sign Up** - Register a new user account
- **Sign In** - Login to the user account
- **Purchase Course** - Buy a course
- **View Purchased Courses** - Get a list of courses the user has purchased
- **View All Courses** - Get a list of all available courses

## Technologies Used
- **Node.js** - Server-side runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ORM
- **JWT (JSON Web Tokens)** - Authentication
- **Zod** - Input validation
- **Dotenv** - Environment variable management

## API Endpoints

### Admin Routes:
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/admin/signup` | Register a new admin |
| POST   | `/admin/signin` | Login as admin |
| POST   | `/admin/courses` | Create a new course |
| GET    | `/admin/courseslist` | View all courses |

### User Routes:
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/user/signup` | Register a new user |
| POST   | `/user/signin` | Login as user |
| POST   | `/user/purchase` | Purchase a course |
| GET    | `/user/courses` | View purchased courses |
| GET    | `/user/allcourses` | View all courses |

## Folder Structure
```
├── backend/
│   ├── db/
│   │   ├── schema.model.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── user.routes.js
│   ├── index.js
│   ├── .env
│   ├── package.json
```

