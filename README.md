# Infinity Project Manager - Backend

This project is the backend server for the Infinity Project Manager system. It provides APIs for user management, project management, and role-based access control (RBAC). The backend uses **Express.js** as the web framework, **MongoDB** as the database, and **JWT** for authentication.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Project Overview

The backend offers APIs for user authentication, role-based access control, project management, and more. It supports different user roles (**Admin**, **Developer**, and **Client**), ensuring that each role has access to appropriate resources. Admins have access to all users and projects, while Developers and Clients can only see and manage the projects they are associated with.

## Technologies

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for creating APIs.
- **MongoDB**: NoSQL database to store users, projects, and other application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: Used for secure authentication and token management.
- **bcryptjs**: For password hashing.
- **dotenv**: Loads environment variables from a `.env` file.
- **Cors**: Middleware for enabling CORS.

## Setup

### 1. Clone the repository:
```bash
git clone https://github.com/your-repo/infinity-project-manager-be.git
cd infinity-project-manager-be
