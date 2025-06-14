# Sequelize Demo Application

A demonstration project showcasing how to use Sequelize ORM to interact with a MySQL database in a Node.js application.

## Overview

This project provides a practical example of using Sequelize, a promise-based Node.js ORM for MySQL, PostgreSQL, SQLite, and more. It demonstrates how to:

- Set up a database connection using environment variables
- Define data models
- Perform CRUD operations (Create, Read, Update, Delete)
- Use Sequelize operators for complex queries

## Features

- **Database Connection**: Secure connection to MySQL using environment variables
- **Model Definition**: Example of defining a User model with various field types and constraints
- **CRUD Operations**:
  - Create: Adding new users to the database
  - Read: Querying users with different conditions
  - Update: Modifying existing user records
  - Delete: Removing users from the database
- **Environment Configuration**: Using dotenv for managing environment variables

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/sequelize-demo.git
   cd sequelize-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a MySQL database named `sequelize-demo`

4. Configure environment variables:
   - Copy the `.env.example` file to `.env`
   - Update the database credentials in the `.env` file:
     ```
     DB_NAME=sequelize-demo
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     ```

## Usage

Run the application:
```
node index.js
```

The application will:
1. Connect to the MySQL database
2. Create a User table (dropping it first if it exists)
3. Insert sample user records
4. Perform various query operations
5. Update and delete records
6. Close the database connection

## Code Examples

### Defining a Model

```javascript
const UserModel = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
    }
)
```

### Creating Records

```javascript
const user = await UserModel.create({
    name: "John",
    age: 25,
    phone: 1234567890
})
```

### Querying with Conditions

```javascript
const users = await UserModel.findAll({
    where: {
        age: {
            [Sequelize.Op.gt]: 20  // Find users with age greater than 20
        }
    }
})
```

## Dependencies

- [Sequelize](https://sequelize.org/) (v6.37.7): Promise-based ORM for Node.js
- [MySQL2](https://github.com/sidorares/node-mysql2) (v3.14.1): MySQL client for Node.js
- [dotenv](https://github.com/motdotla/dotenv) (v16.5.0): Module to load environment variables from .env file

## Project Structure

- `index.js`: Main application file with all the Sequelize operations
- `.env`: Environment variables configuration
- `package.json`: Project metadata and dependencies

## Warning

The example uses `force: true` when syncing the model, which drops the table if it exists. This is for demonstration purposes only and should not be used in production as it will delete all existing data.

## License

ISC

## Author

RushikeshGhodke