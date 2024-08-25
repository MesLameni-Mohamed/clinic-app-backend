const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const patientsRouter = require('./routes/patients');
const appointmentsRouter = require('./routes/appointments');
const medicalRecordsRouter = require('./routes/medicalRecords');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.use('/api/patients', patientsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/medical-records', medicalRecordsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
