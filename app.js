const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const xss = require('xss-clean');
dotenv.config();
const app = express();
const Drug = require('./models/Drugs');
const User = require('./models/User');
const mongoose = require('mongoose');

app.use(cors())
// app.use(xss())
app.use(express.json())

const databaseURI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to the database')
    } catch (error) {
        console.log('Error in connecting to the database:', error.message)
        process.exit(1)
    }
}

connectDB();

//Route to get post or register Drugs
app.post('/api/v1/addDrugs', async (req, res) => {
    const { name, type, price, uses, quantity } = req.body;

    try {
        const newDrug = await new Drug({
            name,
            type,
            price,
            uses,
            quantity
        });
        const drug = await newDrug.save()
        res.status(201).json(drug);
    } catch (error) {
        res.status(400).message({ message: 'Drug not created'});
    }
});

//Route to get all drugs
app.get('/api/v1/allDrugs', async (req, res) => {
    try {
        const allDrugs = await Drug.find({})
        res.json(allDrugs);
    } catch (error) {
        console.error('Error in fetching available drugs', error)
        res.status(500).json({ error: 'Internal Server error'});
    }
})

//Route for user registration
app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await new User({
            username,
            password,
        });
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).message({ message: 'User not created'})
    }
})

app.get('/api/v1/user', async (req, res) => {
    try {
     const allUsers = await User({})
    res.json(allUsers);   
    } catch (error) {
    console.error('Error in fetching Users', error)
    res.status(500).json({ error: 'Internal Server error'})
    }
    
})

port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})

module.exports = app;