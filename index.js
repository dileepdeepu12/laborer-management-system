const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const laborerSchema = new mongoose.Schema({
    name: String,
    contact: String,
    workType: String,
    dailyWage: Number,
    availability: Boolean,
});

const Laborer = mongoose.model('Laborer', laborerSchema);

// Routes
app.post('/laborers', async (req, res) => {
    const laborer = new Laborer(req.body);
    await laborer.save();
    res.status(201).send(laborer);
});

app.get('/laborers', async (req, res) => {
    const laborers = await Laborer.find();
    res.status(200).send(laborers);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
