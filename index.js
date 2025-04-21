const express = require('express');

const { MongoClient } = require('mongodb');


const uri = process.env.MONGO_URI || "mongodb://mongouser:mongopass@mongo-service:27017";
const client = new MongoClient(uri);

let db;

// connect database
async function connectDB() {
    try {
        await client.connect();
        db = client.db("calculatorDB");
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
    }
}
connectDB();


const app = express();

app.use(express.json());

// Verify input parameter
function validateNumbers(req, res, next) {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({
            error: "The input parameters num1 and num2 must be numeric types"
        });
    }
    next();
}

// addition
app.post('/add', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 + num2;

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'add',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});


// subtraction
app.post('/subtract', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 - num2;

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'subtract',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});


// multiplication
app.post('/multiply', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 * num2;

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'multiply',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});


// Division method
app.post('/divide', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
        return res.status(400).json({ error: "The divisor cannot be 0" });
    }
    const result = num1 / num2;

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'divide',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});

//power
app.post('/power', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    const result = Math.pow(num1, num2);

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'power',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});


//Modulo
app.post('/modulo', validateNumbers, async (req, res) => {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
        return res.status(400).json({ error: "Divisor of modulo operation cannot be 0" });
    }
    const result = num1 % num2;

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'modulo',
            num1,
            num2,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});


// Square Root
app.post('/sqrt', async (req, res) => {
    const { num } = req.body;

    if (typeof num !== 'number') {
        return res.status(400).json({ error: "The input parameter num must be a number" });
    }
    if (num < 0) {
        return res.status(400).json({ error: "The input to the square root operation cannot be negative." });
    }

    const result = Math.sqrt(num);

    if (db) {
        await db.collection('operations').insertOne({
            operation: 'sqrt',
            num,
            result,
            timestamp: new Date()
        });
    }

    res.json({ result });
});



// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
