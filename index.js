/**
 * Sequelize Demo Application
 *
 * This file demonstrates how to use Sequelize ORM to interact with a MySQL database.
 * It includes examples of creating models, performing CRUD operations, and querying data.
 */

// Import required dependencies
import {DataTypes, Sequelize} from 'sequelize'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

/**
 * Initialize Sequelize connection to the database
 * Using environment variables for database credentials
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    // logging: console.log, // Uncomment to see SQL queries in console
})

/**
 * Test database connection
 * This block attempts to authenticate with the database and logs the result
 */
try {
    await sequelize.authenticate();
    console.log('Connection established!!!')
} catch (error) {
    console.error('Unable to connect with database: ' + error)
}

/**
 * Define User model
 * This creates a table schema with the following fields:
 * - name: String (required)
 * - age: Integer (optional)
 * - phone: BigInt (required, unique)
 *
 * Sequelize will also automatically add id, createdAt, and updatedAt fields
 */
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

/**
 * Synchronize the model with the database
 * The force:true option drops the table if it already exists and creates a new one
 * WARNING: This will delete all existing data in the table
 */
await UserModel.sync({force: true})

/**
 * CREATE Operations
 * Creating multiple user records in the database
 */

// Create first user
const rushikesh = await UserModel.create({
    name: "Rushikesh",
    age: 21,
    phone: 7458965896
})
// console.log("The newly created User is: ", rushikesh)

// Create second user
const ram = await UserModel.create({
    name: "Ram",
    age: 22,
    phone: 7458965897
})
// console.log("The another newly created User is: ", ram)

// Create third user
const raju = await UserModel.create({
    name: "Raju",
    age: 18,
    phone: 7458965898
})

/**
 * READ Operations
 * Demonstrating different ways to query data from the database
 */

// Get all users with all their attributes
const allUser = await UserModel.findAll()
console.log("All Users: ", allUser)

// Get only the names of all users (select specific columns)
const onlyNames = await UserModel.findAll({attributes: ['name']})
console.log("Names: ", onlyNames)

// Get users with a condition (where age > 20)
// Using Sequelize operators (Op.gt = greater than)
const whereCondition = await UserModel.findAll({
    where: {
        age: {
            [Sequelize.Op.gt]: 20  // Find users with age greater than 20
        }
    }
})

console.log("Where Condition Result: " + whereCondition.map(user => user.name))

/**
 * UPDATE Operation
 * Updating a user's phone number where name is "Raju"
 */
const updateUser = await UserModel.update(
    {phone: 1234567890},  // New values to set
    {
        where: {
            name: "Raju"    // Condition to find records to update
        },
    },
)

console.log("Updated User: ", updateUser)  // Returns number of affected rows

/**
 * DELETE Operation
 * Removing a user from the database where name is "Raju"
 */
const deleteUser = await UserModel.destroy({
    where: {
        name: "Raju",   // Condition to find records to delete
    },
});

console.log("Deleted User: ", deleteUser)  // Returns number of deleted rows

/**
 * Close the database connection
 * Always close connections when done to free up resources
 */
await sequelize.close()
